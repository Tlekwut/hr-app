import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Index";
import BiometricPage from "./components/PinLogin/Index";
import Dashboard from "./components/Home/Index";
import NotFound from "./components/NotFound";
import ChangePassword from "./components/Auth/ChangePassword";
import ChangePin from "./components/Auth/ChangePin";
import Register from "./components/Auth/Register";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login/pin" element={<BiometricPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/change-pin" element={<ChangePin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-user" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
