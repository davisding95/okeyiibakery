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
import EditCake from "./pages/EditCake";

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
                  <PrivateRoute requiredRole={"admin"}>
                    <AddCake />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-cake"
                element={
                  <PrivateRoute requiredRole={"admin"}>
                    <ManageCake />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-cake/:id"
                element={
                  <PrivateRoute requiredRole={"admin"}>
                    <EditCake />
                  </PrivateRoute>
                }
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </CakeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
