import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Header from "./header.jsx";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/error" />;
    }

    return (<>
        <Header />
        {children}
    </>
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
