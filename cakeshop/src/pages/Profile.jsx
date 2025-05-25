import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
    const { users } = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "username", direction: "asc" });

    // Filtering users based on the search query
    const filteredUsers = users.filter(user => 
        (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.phoneNumber && user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.address && user.address.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    

    // Sorting function
    const sortUsers = (users) => {
        const sortedUsers = [...users];
        sortedUsers.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
        return sortedUsers;
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortUsers(filteredUsers).slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Handle column header click for sorting
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="mx-auto mt-1 mb-15 max-w-7xl">
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                {/* Search Input */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            width: "300px",
                        }}
                    />
                </Box>

                {/* Pagination Controls */}
                <Box sx={{ display: "flex", minHeight: "100dvh", flexDirection: "column" }}>
                    {/* User Table */}
                    {filteredUsers.length === 0 ? (
                        <Typography level="body-md" sx={{ textAlign: "center", mt: 4 }}>
                            No users found.
                        </Typography>
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("username")}>
                                        Username {sortConfig.key === "username" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th onClick={() => handleSort("email")}>
                                        Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th onClick={() => handleSort("phoneNumber")}>
                                        Phone Number {sortConfig.key === "phoneNumber" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th onClick={() => handleSort("address")}>
                                        Address {sortConfig.key === "address" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                onClick={() => navigate(`/UpdateProfile/${user.id}`)}
                                            >
                                                Update
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    {/* Pagination */}
                    <Box
                        className="Pagination-users"
                        sx={{
                            display: { xs: "flex", md: "flex" },
                            justifyContent: "center",
                            alignItems: "center",
                            py: 1,
                            gap: 1,
                            marginTop: 2,
                        }}
                    >
                        <IconButton
                            aria-label="previous page"
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography level="body-sm">
                            Page {currentPage} of {totalPages}
                        </Typography>
                        <IconButton
                            aria-label="next page"
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CssVarsProvider>
        </div>
    );
}
