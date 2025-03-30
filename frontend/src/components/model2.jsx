import React from "react";

const Model2 = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            padding: ""
        }}>
            <h2>Sales & Waste Forecasting</h2>
            <iframe
                src="http://127.0.0.1:7861"
                title="Model 2"
                style={{
                    width: "90%",
                    height: "80vh",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
                }}
            ></iframe>
        </div>
    );
};

export default Model2;
