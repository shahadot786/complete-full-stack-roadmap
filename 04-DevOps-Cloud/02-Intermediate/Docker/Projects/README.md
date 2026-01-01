# 🛠️ Docker & Containerization - Practice Projects

From single images to complex multi-container apps.

## 🟢 Project 1: App Containerization
**Goal:** Take a simple local app and package it for production.
- **Requirements:**
  - Write a `Dockerfile` for a Node.js or Python app.
  - Optimize the build using a specific base image (e.g., `node:alpine`).
  - Use `.dockerignore` to keep the image clean.
  - Run the container and map it to Port 80.

## 🟢 Project 2: Full-Stack Docker Compose
**Goal:** Orchestrate a complex application with a database.
- **Requirements:**
  - Create a `docker-compose.yml`.
  - Service 1: Frontend (React/Vue).
  - Service 2: Backend API (Node/Python).
  - Service 3: Database (Postgres/MongoDB).
  - Ensure the API can connect to the Database using the service name.
  - Persist data using Docker Volumes.

## 🟢 Project 3: Image Miniaturizer (Multi-stage)
**Goal:** Reduce image size for faster deployments.
- **Requirements:**
  - Take a Go or Java app that requires a build step.
  - Use a "build" stage with the full SDK.
  - Use a "runtime" stage with only the binary.
  - Compare the file sizes (aim for < 50MB).
