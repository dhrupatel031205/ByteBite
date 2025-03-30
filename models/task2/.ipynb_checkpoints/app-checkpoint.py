import gradio as gr
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
from statsmodels.tsa.arima.model import ARIMA
from prophet import Prophet
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

# ---------------------- Time Series Forecasting ----------------------

def arima_forecast(data, steps=7):
    model = ARIMA(data, order=(5,1,0))
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=steps)
    return forecast.tolist()

def prophet_forecast(data):
    df = pd.DataFrame({'ds': pd.date_range(start='1/1/2023', periods=len(data)), 'y': data})
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=7)
    forecast = model.predict(future)
    return forecast['yhat'].tail(7).tolist()

class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=50, output_size=1):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return out

def lstm_forecast(data):
    model = LSTMModel()
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.01)
    
    data = np.array(data).reshape(-1, 1)
    scaler = StandardScaler()
    data = scaler.fit_transform(data)
    data = torch.tensor(data, dtype=torch.float32).view(1, len(data), 1)
    
    for _ in range(100):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, data[:, -1, :])
        loss.backward()
        optimizer.step()
    
    predictions = model(data).detach().numpy().flatten()
    return scaler.inverse_transform(predictions.reshape(-1, 1)).flatten().tolist()

# ---------------------- Waste Prediction ----------------------

def waste_forecast(data):
    X = np.arange(len(data)).reshape(-1, 1)
    y = np.array(data)
    model = RandomForestRegressor()
    model.fit(X, y)
    predictions = model.predict(np.arange(len(data), len(data) + 7).reshape(-1, 1))
    return predictions.tolist()

# ---------------------- Reinforcement Learning ----------------------

def inventory_optimization(demand, waste):
    stock_levels = np.array(demand) - np.array(waste)
    stock_levels = np.clip(stock_levels, 0, None)
    return stock_levels.tolist()

# ---------------------- Gradio Interface ----------------------

def predict_sales_and_waste(csv_file):
    try:
        df = pd.read_csv(csv_file)
        if 'sales' not in df.columns or 'waste' not in df.columns:
            return "Error: CSV must contain 'sales' and 'waste' columns."

        sales = df['sales'].dropna().tolist()
        waste = df['waste'].dropna().tolist()

        if len(sales) == 0 or len(waste) == 0:
            return "Error: Sales and waste data cannot be empty."

        arima_pred = arima_forecast(sales)
        prophet_pred = prophet_forecast(sales)
        lstm_pred = lstm_forecast(sales)
        waste_pred = waste_forecast(waste)
        optimized_stock = inventory_optimization(arima_pred, waste_pred)

        # Create a dataframe for the predictions
        forecast_df = pd.DataFrame({
            'Day': range(1, 8),
            'ARIMA Sales': arima_pred,
            'Prophet Sales': prophet_pred,
            'LSTM Sales': lstm_pred,
            'Waste Prediction': waste_pred,
            'Optimized Stock': optimized_stock
        })

        # Create a plot
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.plot(range(1, 8), arima_pred, label='ARIMA Sales', marker='o')
        ax.plot(range(1, 8), prophet_pred, label='Prophet Sales', marker='o')
        ax.plot(range(1, 8), lstm_pred, label='LSTM Sales', marker='o')
        ax.plot(range(1, 8), waste_pred, label='Waste Prediction', marker='o')
        ax.plot(range(1, 8), optimized_stock, label='Optimized Stock', marker='o')
        ax.legend()
        ax.set_title("Sales & Waste Forecast")
        ax.set_xlabel("Days")
        ax.set_ylabel("Units")
        
        # Save figure to memory
        buf = BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)

        return forecast_df, buf
    
    except Exception as e:
        return f"Error processing CSV: {str(e)}"

iface = gr.Interface(
    fn=predict_sales_and_waste,
    inputs=gr.File(label="Upload Sales & Waste Data (CSV)"),
    outputs=[
        gr.Dataframe(label="Forecast Data"),
        gr.Image(label="Forecast Graph")
    ],
    title="AI-Powered Demand & Waste Prediction",
    description="Upload a CSV file with 'sales' and 'waste' columns to get AI-driven forecasts and inventory suggestions."
)

if __name__ == "__main__":
    iface.launch(share=True)
