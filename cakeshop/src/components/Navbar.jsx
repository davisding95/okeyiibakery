import { useContext, useEffect, useRef, useState } from "react";
import { GiStairsCake } from "react-icons/gi";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import ResponsiveMenu from "./ResponsiveMenu";
import ResponsiveNav from "./ResponsiveNav";
import { AuthContext } from "../contexts/AuthProvider";
import AccountMenu from "./AccountMenu";
import AnimatedMenuIcon from "./AnimatedMenuIcon";
import CartDrawer from "./CartDrawer";
import CartContext from "../contexts/CartContext";
import { Badge } from "@mui/material";
import CartIconContext from "../contexts/CartIconContext";
import OrderContext from "../contexts/OrderProvider";
import CakeContext from "../contexts/CakeContext";
import * as signalR from "@microsoft/signalr";
import MessagePopup from "./MessagePopup";

const BASE_URL = "https://okeyi.azurewebsites.net";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newOrderNotification, setNewOrderNotification] = useState("");
  const { jwt, isAuthenticated, user, users } = useContext(AuthContext);
  const { cakes } = useContext(CakeContext);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const { orders, setOrders } = useContext(OrderContext);
  const {
    carts,
    isLoading: cartsIsLoading,
    setCarts,
  } = useContext(CartContext);
  const [openMessagePopup, setOpenMessagePopup] = useState(false);

  const navigate = useNavigate();

  const { cartIconRef } = useContext(CartIconContext);

  const menuRef = useRef(null);
  const underlineRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const navLinksRef = useRef([]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleAccountMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleAccountMenuClose = () => setAnchorEl(null);

  // Update the position and width of the underline when hovering over the links
  const updateUnderline = (element) => {
    if (element) {
      setUnderlineStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  };

  // Update the underline when the page loads
  useEffect(() => {
    const activeLink = navLinksRef.current.find((link) =>
      link.classList.contains("active"),
    );
    if (activeLink) {
      updateUnderline(activeLink);
    }
  }, []);

  // SignalR connection
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/orderHub`, {
        accessTokenFactory: () => jwt,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("SignalR Connected");
      })
      .catch((err) => console.log(err));

    connection.on("NewOrder", (newOrder) => {
      // Check if the new order is from admin or user
      const user = users.find((u) => u.id === newOrder.userId);
      if (user.role === "admin") return;

      const audio = new Audio("/sounds/newOrderSoundTrack.mp3");
      audio.play().catch((err) => console.log(err));
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      setNewOrderNotification("New Order Comes In!");
      setOpenMessagePopup(true);
    });

    return () => connection.stop();
  }, [isAuthenticated, user, jwt, setOrders, users]);

  const toggleDrawer = (newOpen) => () => setOpenCartDrawer(newOpen);

  if (cartsIsLoading) {
    return <div>Loading...</div>;
  }

  const totalCartItems = carts.reduce((acc, cart) => acc + cart.quantity, 0);

  const isAdmin = user?.role === "admin";

  const adminOrders = orders.filter((o) => o.userId === user.id);

  return (
    <nav className="relative mx-auto max-w-7xl px-4 py-1 shadow-md sm:rounded-sm sm:px-4 sm:py-3 md:rounded-lg">
      <div className="flex h-14 items-center justify-between transition-all duration-300 sm:grid sm:grid-cols-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="col-span-1 flex items-center gap-2 text-2xl font-bold uppercase transition-all duration-200 hover:scale-103 hover:cursor-pointer"
        >
          <GiStairsCake />
          <p>Okey Cake</p>
        </div>

        {/* Menu */}
        <div className="relative col-span-2 hidden items-center justify-center gap-6 sm:flex">
          {["/", "/cakes", "/about"].map((path, index) => (
            <NavLink
              key={path}
              to={path}
              ref={(el) => (navLinksRef.current[index] = el)}
              className={({ isActive }) =>
                `text-primary relative px-4 py-2 text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-110 hover:text-amber-500 active:text-amber-800 ${
                  isActive ? "active text-amber-500" : ""
                }`
              }
              onMouseEnter={(e) => updateUnderline(e.currentTarget)}
              onMouseLeave={() => {
                const activeLink = navLinksRef.current.find((link) =>
                  link.classList.contains("active"),
                );
                if (activeLink) updateUnderline(activeLink);
              }}
            >
              {path === "/"
                ? "Home"
                : path === "/cakes"
                  ? "Products"
                  : "About Us"}
            </NavLink>
          ))}
          <div
            ref={underlineRef}
            className="absolute bottom-0 h-1 bg-amber-500 transition-all duration-400"
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-1 hidden items-center justify-end gap-4 sm:flex">
          <Badge badgeContent={totalCartItems} color="error" overlap="circular">
            <Button onClick={toggleDrawer(true)} ref={cartIconRef}>
              <RiShoppingCartLine onClick={toggleDrawer(true)} />
            </Button>
          </Badge>
          <Badge
            badgeContent={orders.length}
            color="primary"
            variant="dot"
            overlap="circular"
          >
            <Button
              onClick={handleAccountMenuClick}
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(251, 191, 36, 1)",
                  color: "white",
                  transition: "all 0.3s",
                },
              }}
              aria-controls={anchorEl ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
            >
              {isAuthenticated ? (
                <MdAccountCircle />
              ) : (
                <MdOutlineAccountCircle />
              )}
            </Button>
          </Badge>
          <AccountMenu
            anchorEl={anchorEl}
            handleAccountMenuClose={handleAccountMenuClose}
            accountMenuOpen={Boolean(anchorEl)}
            isAuthenticated={isAuthenticated}
            orders={orders}
            adminOrders={adminOrders}
            isAdmin={isAdmin}
          />
        </div>
        <div className="flex justify-end transition-all duration-200 hover:scale-90 hover:cursor-pointer sm:hidden">
          <AnimatedMenuIcon open={open} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <div ref={menuRef}>
        <ResponsiveMenu open={open} onClick={() => setOpen(false)} />
      </div>
      <ResponsiveNav
        totalCartItems={totalCartItems}
        toggleDrawer={toggleDrawer}
        onClick={handleAccountMenuClick}
        orders={orders}
      />
      <CartDrawer
        open={openCartDrawer}
        toggleDrawer={toggleDrawer}
        carts={carts}
        setCarts={setCarts}
        jwt={jwt}
        user={user}
        cakes={cakes}
      />
      <MessagePopup
        color="success"
        icon={<CheckRoundedIcon />}
        open={openMessagePopup}
        setOpen={setOpenMessagePopup}
        message={newOrderNotification}
        vertical="center"
        horizontal="right"
        buttonLabel="Dismiss"
        buttonAction={() => setOpenMessagePopup(false)}
      />
    </nav>
  );
};

export default Navbar;
