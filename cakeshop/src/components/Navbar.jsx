import { useContext, useEffect, useRef, useState } from "react";
import { GiStairsCake } from "react-icons/gi";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import ResponsiveMenu from "./ResponsiveMenu";
import ResponsiveNav from "./ResponsiveNav";
import Button from "./Button";
import { AuthContext } from "../contexts/AuthProvider";
import AnimatedMenuIcon from "./AnimatedMenuIcon";
import AccountMenu from "./AccountMenu";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const useAuth = useContext(AuthContext);
  const { isAuthenticated } = useAuth;

  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const accountMenuOpen = Boolean(anchorEl);
  const handleAccountMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="mx-auto max-w-7xl px-2 py-1 shadow-md sm:rounded-sm sm:px-4 sm:py-3 md:rounded-lg">
      <div className="flex justify-between transition-all duration-300 sm:grid sm:grid-cols-4 sm:items-center">
        {/* logo */}
        <div className="col-span-1 flex items-center gap-2 text-2xl font-bold uppercase">
          <GiStairsCake />
          <p>Cake</p>
        </div>
        {/* Menu */}
        <div className="col-span-2 hidden items-center justify-center gap-6 sm:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` ${isActive ? "text-amber-500" : ""} text-primary rounded-sm px-4 py-2 text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-amber-500 hover:text-white`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              ` ${isActive ? "text-amber-500" : ""} text-primary rounded-sm px-4 py-2 text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-amber-500 hover:text-white`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              ` ${isActive ? "text-amber-500" : ""} text-primary rounded-sm px-4 py-2 text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-amber-500 hover:text-white`
            }
          >
            About Us
          </NavLink>
        </div>
        {/* button */}
        <div className="col-span-1 hidden items-center justify-end gap-4 sm:flex">
          <Button>
            <CiSearch />
          </Button>
          <Button>
            <RiShoppingCartLine />
          </Button>

          <IconButton
            onClick={handleAccountMenuClick}
            color="inherit"
            size="24px"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(251, 191, 36, 1)",
                color: "white",
                transition: "all 0.3s",
              },
            }}
            aria-controls={accountMenuOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={accountMenuOpen ? "true" : undefined}
          >
            {isAuthenticated ? <MdAccountCircle /> : <MdOutlineAccountCircle />}
          </IconButton>
          <AccountMenu
            anchorEl={anchorEl}
            handleAccountMenuClose={handleAccountMenuClose}
            accountMenuOpen={accountMenuOpen}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <AnimatedMenuIcon open={open} setOpen={setOpen} />
      </div>
      <div ref={menuRef}>
        <ResponsiveMenu open={open} setOpen={setOpen} />
      </div>
      <ResponsiveNav />
    </nav>
  );
};

export default Navbar;
