import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdMenu } from "react-icons/md";
import PropTypes from "prop-types";

const AnimatedMenuIcon = ({ open, setOpen }) => {
  return (
    <div
      className="flex justify-end transition-all duration-200 hover:scale-90 hover:cursor-pointer sm:hidden"
      onClick={() => setOpen(!open)}
    >
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.1 }}
          >
            <MdClose className="text-4xl" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.1 }}
          >
            <MdMenu className="text-4xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

AnimatedMenuIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AnimatedMenuIcon;
