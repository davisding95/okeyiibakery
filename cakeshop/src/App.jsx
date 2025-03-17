import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import AppLayout from "./pages/AppLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./contexts/AuthProvider";
import Unauthorized from "./pages/Unauthorized";
import { CakeProvider } from "./contexts/CakeContext";


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CakeProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>
          </Routes>
        </CakeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
