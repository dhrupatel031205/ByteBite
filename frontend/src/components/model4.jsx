import React from "react";
import Navbar from "./Navbar";

const Model4 = () => {
    return (
        <>
        <Navbar></Navbar>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "20px",
            }}
        >
            <h2>AI-Powered Food Waste Analysis</h2>
            <iframe
                src="http://127.0.0.1:7863"  // URL where the Gradio interface for Model 4 is hosted
                title="Model 4 - Waste Analysis"
                style={{
                    width: "90%",
                    height: "80vh",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",  // Add box-shadow for UI enhancement
                }}
            ></iframe>
        </div>
        </>
    );
};

export default Model4;
