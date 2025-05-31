import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Autosuggest from 'react-autosuggest';

const fetchSuggestions = async (value) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=nz&q=${value}`
    );
    const data = await response.json();
    return data.map(item => ({
        label: item.display_name,
        value: item.display_name
    }));
};

export default function UpdateProfile() {
    const { id } = useParams();
    const { users, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const user = users.find((user) => user.id === id && user.role === "user");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setAddress(user.address);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            username,
            email,
            phoneNumber,
            address,
        };

        updateUser(updatedUser);
        navigate("/profile");
    };


    const onSuggestionsFetchRequested = ({ value }) => {
        fetchSuggestions(value).then(setSuggestions);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        setAddress(suggestion.value);
    };

    const onChange = (event, { newValue }) => {
        setAddress(newValue);
    };

    if (!user) {
        return (
            <Typography sx={{ textAlign: "center", mt: 4 }}>
                No user found with this ID.
            </Typography>
        );
    }

    return (
        <div className="mx-auto mt-10 max-w-2xl">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography level="h4" sx={{ mb: 2 }}>
                    Edit User Information
                </Typography>

                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                        mt: 2,
                    }}
                    onSubmit={handleSubmit}
                >
                    <FormControl required>
                        <FormLabel>Username</FormLabel>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>

                    <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={() => setSuggestions([])}
                            onSuggestionSelected={onSuggestionSelected}
                            getSuggestionValue={(suggestion) => suggestion.value}
                            renderSuggestion={(suggestion) => <div>{suggestion.label}</div>}
                            inputProps={{
                                placeholder: "Enter an address",
                                value: address,
                                onChange: onChange,
                            }}
                            renderInputComponent={({ key, ...inputProps }) => (
                                <Input
                                    key={key}
                                    {...inputProps}
                                    sx={{ width: "100%" }}
                                />
                            )}

                            theme={{
                                container: { position: "relative" },
                                suggestionsContainer: {
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    backgroundColor: "white",
                                    border: "1px solid #ccc",
                                    zIndex: 10,
                                    borderRadius: 4,
                                    maxHeight: 200,
                                    overflowY: "auto",
                                },
                                suggestion: {
                                    padding: "10px",
                                    cursor: "pointer",
                                },
                                suggestionHighlighted: {
                                    backgroundColor: "#eee",
                                },
                            }}
                        />
                    </FormControl>


                    <Button type="submit" sx={{ mt: 2 }} color="primary">
                        Update User
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
