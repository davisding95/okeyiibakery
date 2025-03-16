import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { FaRegRegistered } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const authenticatedMenuItems = [
  { label: "My Profile", icon: <Avatar />, linkTo: "/profile" },
  { label: "Order", icon: <Avatar />, linkTo: "/order" },
  { label: "Shopping Cart", icon: <Avatar />, linkTo: "/cart" },
  { type: "divider" },
  { label: "Logout", icon: <Logout fontSize="small" />, linkTo: "/login" },
];

const unauthenticatedMenuItems = [
  { label: "Register", icon: <FaRegRegistered />, linkTo: "/register" },
  { label: "Login", icon: <IoLogIn />, linkTo: "/login" },
];

const adminMenuItems = [
  { label: "Add Cake", icon: <Avatar />, linkTo: "/add-cake" },
  { label: "Manage Cake", icon: <Avatar />, linkTo: "/manage-cake" },
  { label: "Online Orders", icon: <Avatar />, linkTo: "/cake-orders" },
  { label: "Manage User", icon: <Avatar />, linkTo: "/manage-user" },
];

const AccountMenu = ({
  accountMenuOpen,
  anchorEl,
  handleAccountMenuClose,
  isAuthenticated,
}) => {
  const useAuth = useContext(AuthContext);
  const { logout, user } = useAuth;

  let menuItems = isAuthenticated
    ? [...authenticatedMenuItems]
    : unauthenticatedMenuItems;

  if (isAuthenticated && user.role === "admin") {
    menuItems = [...adminMenuItems, ...menuItems];
  }

  const handleLogout = () => {
    logout();
    handleAccountMenuClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={accountMenuOpen}
      onClose={handleAccountMenuClose}
      onClick={handleAccountMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "rgba(251, 191, 36, 1)",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "rgba(251, 191, 36, 1)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menuItems.map((item, index) =>
        item.type === "divider" ? (
          <Divider key={index} />
        ) : item.label === "Logout" ? (
          <MenuItem key={index} onClick={handleLogout}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link to={item.linkTo}>{item.label}</Link>
          </MenuItem>
        ) : (
          <MenuItem key={index} onClick={handleAccountMenuClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link to={item.linkTo}>{item.label}</Link>
          </MenuItem>
        ),
      )}
    </Menu>
  );
};

AccountMenu.propTypes = {
  accountMenuOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  handleAccountMenuClick: PropTypes.func.isRequired,
  handleAccountMenuClose: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AccountMenu;
