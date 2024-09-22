// src/components/NoPage.js

import React from "react";

const NoPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404</h1>
            <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
    },
    heading: {
        fontSize: "100px",
        color: "#ff4040",
    },
    message: {
        fontSize: "24px",
        color: "#333",
    },
};

export default NoPage;
