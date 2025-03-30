import React from "react";
import Navbar from "./Navbar";

const Model1 = () => {
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
            <h2>Gradio Model 1 Interface</h2>
            <iframe
                src="http://127.0.0.1:7860"  // Replace this with the Gradio URL for your model
                title="Model 3"
                style={{
                    width: "90%",
                    height: "80vh",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // Add box-shadow for UI enhancement
                }}
            ></iframe>
        </div>
        
        </>
    );
};

export default Model1;
