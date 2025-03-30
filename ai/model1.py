import gradio as gr
import torch
from torchvision import transforms
from PIL import Image
import torchvision.models as models
import json

# Load a pre-trained Faster R-CNN model for object detection
model = models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# COCO labels mapping (manually defined for accuracy)
COCO_LABELS = {
    1: "person", 2: "bicycle", 3: "car", 4: "motorcycle", 5: "airplane", 6: "bus", 7: "train", 
    8: "truck", 9: "boat", 10: "traffic light", 11: "fire hydrant", 13: "stop sign", 14: "parking meter", 
    15: "bench", 16: "bird", 17: "cat", 18: "dog", 19: "horse", 20: "sheep", 21: "cow", 22: "elephant", 
    23: "bear", 24: "zebra", 25: "giraffe", 27: "backpack", 28: "umbrella", 31: "handbag", 32: "tie", 
    33: "suitcase", 34: "frisbee", 35: "skis", 36: "snowboard", 37: "sports ball", 38: "kite", 39: "baseball bat", 
    40: "baseball glove", 41: "skateboard", 42: "surfboard", 43: "tennis racket", 44: "bottle", 46: "wine glass", 
    47: "cup", 48: "fork", 49: "knife", 50: "spoon", 51: "bowl", 52: "banana", 53: "apple", 54: "sandwich", 
    55: "orange", 56: "broccoli", 57: "carrot", 58: "hot dog", 59: "pizza", 60: "donut", 61: "cake", 62: "chair", 
    63: "couch", 64: "potted plant", 65: "bed", 67: "dining table", 70: "toilet", 72: "tv", 73: "laptop", 
    74: "mouse", 75: "remote", 76: "keyboard", 77: "cell phone", 78: "microwave", 79: "oven", 80: "toaster", 
    81: "sink", 82: "refrigerator", 84: "book", 85: "clock", 86: "vase", 87: "scissors", 88: "teddy bear", 
    89: "hair drier", 90: "toothbrush"
}

# Define transformation
transform = transforms.Compose([
    transforms.ToTensor()
])

def detect_ingredients(image):
    # Convert image to PIL format and apply transformation
    image = Image.fromarray(image)
    image_tensor = transform(image).unsqueeze(0)
    
    # Run inference
    with torch.no_grad():
        predictions = model(image_tensor)
    
    # Extract detected objects
    detected_items = set()
    for i, label in enumerate(predictions[0]['labels']):
        label_id = label.item()
        score = predictions[0]['scores'][i].item()
        if score > 0.5:  # Confidence threshold
            detected_items.add(COCO_LABELS.get(label_id, "Unknown"))
    
    return ", ".join(detected_items) if detected_items else "No ingredients detected."

# Gradio interface
iface = gr.Interface(
    fn=detect_ingredients,
    inputs=gr.Image(type="numpy"),
    outputs=gr.Textbox(label="Detected Ingredients"),
    title="SmartKitchen AI - Ingredient Detection",
    description="Upload an image of your kitchen shelf or refrigerator to identify ingredients."
)

iface.launch(server_name="0.0.0.0",server_port=7860)