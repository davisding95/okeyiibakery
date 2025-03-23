import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import AppLayout from "./pages/AppLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./contexts/AuthProvider";
import AddCake from "./pages/AddCake";
import PrivateRoute from "./components/PrivateRoute";
import { CakeProvider } from "./contexts/CakeContext";
import ManageCake from "./pages/ManageCake";

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
              <Route
                      path="/add-cake"
                      element={
                        <PrivateRoute requiredRoles={["admin"]}>
                          <AddCake />
                        </PrivateRoute>
                      }
                    />
              <Route
                      path="/manage-cake"
                      element={
                        <PrivateRoute requiredRoles={["admin"]}>
                          <ManageCake />
                        </PrivateRoute>
                      }
                    />
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
