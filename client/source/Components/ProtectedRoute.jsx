import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export const ProtectedRoute = ({ children, roles }) => {

    const { isLoading, isAuthenticated, user } = useAuth();

    const location = useLocation();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;