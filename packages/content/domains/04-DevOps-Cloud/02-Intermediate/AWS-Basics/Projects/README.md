# 🛠️ AWS Cloud - Practice Projects

Build real infrastructure on the cloud.

## 🟢 Project 1: Static Portfolio on S3
**Goal:** Host a professional website with zero server maintenance.
- **Requirements:**
  - Create an S3 Bucket.
  - Enable "Static Website Hosting".
  - Configure the Bucket Policy to allow public `GetObject` access.
  - Upload your frontend files (`index.html`, `main.css`).
  - Access it via the S3 endpoint URL.

## 🟢 Project 2: The "Linux Server" Lab (EC2)
**Goal:** Manage a virtual machine in the cloud.
- **Requirements:**
  - Launch a `t2.micro` (Free Tier) instance with Ubuntu.
  - Create a Security Group that allows SSH (Port 22) and HTTP (Port 80).
  - SSH into the server and install Nginx.
  - Verify you can see the Nginx welcome page from your browser.

## 🟢 Project 3: Lambda Image Optimizer
**Goal:** Use serverless to automate expensive tasks.
- **Requirements:**
  - Create a "Source" S3 Bucket and a "Dest" S3 Bucket.
  - Write a Python/Node.js Lambda function that triggers when an image is uploaded to "Source".
  - Resize the image (or just log its metadata).
  - Save the result to the "Dest" bucket.
