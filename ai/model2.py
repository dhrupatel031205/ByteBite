import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import gradio as gr
import tempfile
import os

# Placeholder ML functions
def arima_forecast(sales):
    return [s + np.random.randint(-10, 10) for s in sales[-7:]]

def prophet_forecast(sales):
    return [s + np.random.randint(-5, 5) for s in sales[-7:]]

def lstm_forecast(sales):
    return [s + np.random.randint(-8, 8) for s in sales[-7:]]

def waste_forecast(waste):
    return [w + np.random.randint(-3, 3) for w in waste[-7:]]

def inventory_optimization(sales_pred, waste_pred):
    return [s - w for s, w in zip(sales_pred, waste_pred)]

# Function to process CSV and generate graph
def process_csv(file):
    df = pd.read_csv(file.name)

    # Check if required columns exist
    if 'sales' not in df.columns or 'waste' not in df.columns:
        return "CSV must contain 'sales' and 'waste' columns.", None

    sales = df['sales'].dropna().tolist()
    waste = df['waste'].dropna().tolist()

    # Ensure data is sufficient
    if len(sales) < 7 or len(waste) < 7:
        return "Insufficient data! At least 7 days of sales and waste data required.", None

    # Get predictions
    arima_pred = arima_forecast(sales)
    prophet_pred = prophet_forecast(sales)
    lstm_pred = lstm_forecast(sales)
    waste_pred = waste_forecast(waste)
    optimized_stock = inventory_optimization(arima_pred, waste_pred)

    # Create result DataFrame
    result_df = pd.DataFrame({
        'Day': range(1, 8),
        'ARIMA Sales': arima_pred,
        'Prophet Sales': prophet_pred,
        'LSTM Sales': lstm_pred,
        'Waste Prediction': waste_pred,
        'Optimized Stock': optimized_stock
    })

    # Plot the forecasts
    plt.figure(figsize=(12, 6))
    plt.plot(result_df['Day'], result_df['ARIMA Sales'], marker='o', label='ARIMA')
    plt.plot(result_df['Day'], result_df['Prophet Sales'], marker='s', label='Prophet')
    plt.plot(result_df['Day'], result_df['LSTM Sales'], marker='^', label='LSTM')
    plt.plot(result_df['Day'], result_df['Waste Prediction'], marker='x', linestyle='dashed', label='Waste')
    plt.plot(result_df['Day'], result_df['Optimized Stock'], marker='d', linestyle='dotted', label='Optimized Stock')

    plt.xlabel("Day")
    plt.ylabel("Sales & Waste Prediction")
    plt.title("Sales & Waste Forecasting")
    plt.legend()
    plt.grid()

    # Save the plot to a temporary file
    temp_dir = tempfile.gettempdir()
    temp_file_path = os.path.join(temp_dir, "forecast_plot.png")
    plt.savefig(temp_file_path, format='png')
    plt.close()

    return result_df, temp_file_path  # Return the DataFrame and image file path

# Gradio Interface
iface = gr.Interface(
    fn=process_csv, 
    inputs=gr.File(label="Upload CSV"), 
    outputs=[gr.Dataframe(), gr.Image(label="Forecast Graph")]
)

iface.launch(server_name="0.0.0.0",server_port=7861)  # Change port for API
