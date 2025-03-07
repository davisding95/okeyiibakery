import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import LinkButton from "./LinkButton";

const ResponsiveMenu = ({ open, setOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: -40 }}
          exit={{ opacity: 0, y: -100 }}
          className="absolute top-20 right-2 z-20 w-2/3"
        >
          <div className="text-md fount-semibold flex flex-col items-center justify-center rounded-2xl bg-amber-500 py-5 text-white uppercase">
            <LinkButton onClick={() => setOpen(false)} to="/" useBy="menu">
              Home
            </LinkButton>
            <LinkButton
              onClick={() => setOpen(false)}
              to="/products"
              useBy="menu"
            >
              Products
            </LinkButton>
            <LinkButton onClick={() => setOpen(false)} to="/about" useBy="menu">
              About Us
            </LinkButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Set the prop types for this component
ResponsiveMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ResponsiveMenu;
