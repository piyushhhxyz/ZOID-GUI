import os
import shutil
import random
import cv2
import numpy as np
import time

# Define the base directory for storing generated images
base_output_directory = "public"

# Define the names of the five output folders
output_folders = ["Assets1", "Assets2", "Assets3", "Assets4", "Assets5"]

# Ensure the output directories exist or create them
for folder_name in output_folders:
    output_directory = os.path.join(base_output_directory, folder_name)
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

# Generate and copy images to all five folders simultaneously
image_counter = 1
while image_counter <= 200:  # Change the number of images as needed
    for folder_index, folder_name in enumerate(output_folders, start=1):
        # Generate a timestamp in milliseconds
        timestamp_ms = int(time.time() * 1000)

        # Generate a random image file name with the specified format
        image_filename = f"{folder_name}_{image_counter}_{timestamp_ms}.png"

        # Create a random image (e.g., a 100x100 pixel image with random colors)
        image = np.random.randint(0, 256, size=(100, 100, 3), dtype=np.uint8)

        # Save the image to the current output directory
        output_directory = os.path.join(base_output_directory, folder_name)
        cv2.imwrite(os.path.join(output_directory, image_filename), image)

        print(f"Image {image_counter} added to {folder_name} as {image_filename}")

    # Increment the image counter
    image_counter += 1

    # Simulate adding an image every 0.5 seconds (adjust as needed)
    time.sleep(1/2)

print("Random images generated and copied to all five folders with custom names.")
