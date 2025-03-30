import gradio as gr
import torch
import numpy as np
from ultralytics import YOLO
from torchvision import transforms
from PIL import Image
import matplotlib.pyplot as plt
import io

# Load Pre-trained YOLO Model
yolo_model = YOLO("path/to/yolov8n.pt")  # Use correct path

# Load Pre-trained U-Net Model (Placeholder for actual model)
class UNetDummy(torch.nn.Module):
    def forward(self, x):
        return torch.sigmoid(torch.rand_like(x[:, :1, :, :]))  # Output (batch, 1, H, W)

unet_model = UNetDummy()

# Image Transformation
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor()
    ])
    return transform(image).unsqueeze(0)  # Shape: (1, C, 256, 256)

# YOLO Object Detection
def detect_waste(image):
    results = yolo_model(image)
    detected_img = results[0].plot()  # Get annotated image as NumPy array
    return Image.fromarray(detected_img)  # Convert to PIL Image

# U-Net Segmentation
def segment_waste(image):
    img_tensor = preprocess_image(image)  # (1, C, 256, 256)
    mask = unet_model(img_tensor).detach().numpy()  # (1, 1, 256, 256)

    print("Mask shape before processing:", mask.shape)  # Debugging

    mask = mask[0, 0, :, :]  # Extract (256, 256) from (1, 1, 256, 256)
    mask = (mask * 255).astype(np.uint8)  # Convert to uint8
    return Image.fromarray(mask, mode="L")  # Grayscale image

# Waste Heatmap Generation
def generate_heatmap(image):
    heatmap = np.random.random((256, 256))  # Placeholder for real heatmap logic
    plt.imshow(heatmap, cmap='hot', interpolation='nearest')
    plt.axis('off')

    # Save heatmap to a PIL image
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0)
    buf.seek(0)

    return Image.open(buf)  # Convert BytesIO to PIL Image

# Gradio Interface
def analyze_waste(image):
    detected_img = detect_waste(image)
    segmented_img = segment_waste(image)
    heatmap_img = generate_heatmap(image)
    return detected_img, segmented_img, heatmap_img

iface = gr.Interface(
    fn=analyze_waste,
    inputs=gr.Image(type="pil"),
    outputs=[gr.Image(type="pil"), gr.Image(type="pil"), gr.Image(type="pil")],
    title="AI-Powered Food Waste Analysis",
    description="Upload an image to analyze food waste with AI models."
)

if __name__ == "__main__":
    iface.launch(server_name="0.0.0.0",server_port=7863)
