import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Model2 = () => {
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/get-model-data")
            .then((res) => res.json())
            .then((data) => setHistory(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:5000/api/save-model-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: inputData, output: outputData }),
        });

        if (response.ok) {
            alert("Data saved successfully");
            setInputData("");
            setOutputData("");
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <h2>Sales & Waste Forecasting</h2>
                <textarea
                    placeholder="Enter input data"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    style={{ width: "80%", height: "50px", margin: "10px" }}
                />
                <button onClick={handleSubmit} style={{ padding: "10px", margin: "10px" }}>Save Data</button>

                <iframe
                    src="http://127.0.0.1:7861"
                    title="Model 2"
                    style={{ width: "90%", height: "60vh", border: "none", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}
                ></iframe>

                <h3>History</h3>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            <strong>Input:</strong> {JSON.stringify(item.input)} | <strong>Output:</strong> {JSON.stringify(item.output)}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Model2;
