            # print("Webcam frames generated and copied to all five folders with custom names.")
import os
import cv2
import time

# Define the base directory for storing generated images
base_output_directory = "public"

# Define the names of the five output folders
output_folders = ["folder1", "folder2", "folder3", "folder4", "folder5"]

# Ensure the output directories exist or create them
for folder_name in output_folders:
    output_directory = os.path.join(base_output_directory, folder_name)
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

# Open your camera (change the camera index as needed, e.g., 0 for the default camera)
cap = cv2.VideoCapture(0)

# Set the desired frame width and height (320x240)
frame_width = 320
frame_height = 240
cap.set(cv2.CAP_PROP_FRAME_WIDTH, frame_width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_height)

# Initialize image counter
image_counter = 1

while image_counter <= 200:  # Change the number of frames as needed
    for folder_index, folder_name in enumerate(output_folders, start=1):
        # Generate a timestamp in milliseconds
        timestamp_ms = int(time.time() * 1000)

        # Generate a random image file name with the specified format
        image_filename = f"{folder_name}_{image_counter}_{timestamp_ms}.png"

        # Capture a frame from the camera
        ret, frame = cap.read()

        if ret:
            # Resize the frame to 320x240
            frame = cv2.resize(frame, (frame_width, frame_height))

            # Save the captured frame to the current output directory
            output_directory = os.path.join(base_output_directory, folder_name)
            cv2.imwrite(os.path.join(output_directory, image_filename), frame)

            print(f"Frame {image_counter} added to {folder_name} as {image_filename}")

            # Increment the image counter
            image_counter += 1

    # Simulate capturing a frame every 0.5 seconds (adjust as needed)
    time.sleep(1 / 2)

# Release the camera and close OpenCV windows
cap.release()
cv2.destroyAllWindows()

print("Frames captured from the camera, resized, and saved to all five folders with custom names.")
