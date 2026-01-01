# 🛠️ CI/CD - Practice Projects

Build pipelines that actually deploy.

## 🟢 Project 1: The Automated Tester
**Goal:** Ensure no bad code enters the `main` branch.
- **Requirements:**
  - Create a GitHub repository.
  - Setup a GitHub Action that runs every time a PR is opened.
  - Run `npm test` or `pytest`.
  - Block the merge if tests fail.

## 🟢 Project 2: Build & Push Container
**Goal:** Automate image creation and storage.
- **Requirements:**
  - Use GitHub Secrets to store your Docker Hub credentials.
  - Build a Docker image in the pipeline.
  - Tag it with the commit SHA or version number.
  - Push the image to Docker Hub or ECR.

## 🟢 Project 3: Automated Slack Notifications
**Goal:** Keep the team informed about build status.
- **Requirements:**
  - Create a Slack Webhook.
  - Add a step to your pipeline that sends a message on SUCCESS or FAILURE.
  - Include a link to the build logs.
