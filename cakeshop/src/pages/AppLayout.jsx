import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flext-none">
        <Navbar />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
