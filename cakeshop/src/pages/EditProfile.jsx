import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { editProfileValidationSchema } from "../models/EditProfileSchema";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";


const fetchSuggestions = async (value) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&countrycodes=nz&q=${value}`
  );
  const data = await response.json();
  return data.map((item) => ({
    label: item.display_name,
    value: item.display_name,
  }));
};

export default function EditProfile() {
  const { user, setUser, jwt } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPhoneNumber(user.phoneNumber || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      Username: username,
      PhoneNumber: phoneNumber,
      Address: address,
      Password: password,
    };

    try {
      await editProfileValidationSchema.validate(values, { abortEarly: false });

      const payload = {
        username,
        email: user.email,
        phoneNumber,
        address,
        passwordHash: password || undefined,
      };

      const response = await fetch(`http://localhost:5056/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      navigate("/");
    } catch (err) {
      if (err.name === "ValidationError") {
        const formattedErrors = {};
        err.inner.forEach((e) => (formattedErrors[e.path] = e.message));
        setErrors(formattedErrors);
      } else {
        console.error(err);
        alert("Failed to update profile");
      }
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Edit Your Profile
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            mt: 2,
          }}
        >
          <FormControl required error={Boolean(errors.Username)}>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.Username && (
              <Typography level="body-sm" color="danger">
                {errors.Username}
              </Typography>
            )}
          </FormControl>

          <FormControl error={Boolean(errors.PhoneNumber)}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.PhoneNumber && (
              <Typography level="body-sm" color="danger">
                {errors.PhoneNumber}
              </Typography>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Autocomplete
              placeholder="Search your address"
              options={addressOptions}
              value={{ label: address, value: address }}
              onInputChange={async (_, value) => {
                setAddress(value);
                if (value.length > 2) {
                  const suggestions = await fetchSuggestions(value);
                  setAddressOptions(suggestions);
                }
              }}
              onChange={(_, newValue) => {
                if (newValue) {
                  setAddress(newValue.value);
                }
              }}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              sx={{ width: "100%" }}
            />
          </FormControl>

          <FormControl error={Boolean(errors.Password)}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
            {errors.Password && (
              <Typography level="body-sm" color="danger">
                {errors.Password}
              </Typography>
            )}
          </FormControl>

          <Button type="submit" sx={{ mt: 2 }} color="primary">
            Save Changes
          </Button>
        </Box>
      </Box>
    </div>
  );
}
