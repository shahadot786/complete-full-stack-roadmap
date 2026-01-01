# 📝 Docker & Containerization - Exercises

Quick labs to test your container muscle memory.

## 🎮 Interactive Labs
- **[Play with Docker](https://labs.play-with-docker.com/)** - A free, browser-based playground provided by Docker.
- **[Docker Skills (GitHub)](https://github.com/skills/introduction-to-github-actions)** - (Note: Focus on the Docker-related skills).
- **[Katacoda (Now O'Reilly)](https://www.oreilly.com/interactive/search.html?q=docker)** - Excellent scenario-based training.

## ⚡ Quick Tasks
1. **Container Exec:** Run an Nginx container in the background, then use `docker exec` to change the `index.html` file inside it.
2. **Layer Explorer:** Use `docker history <image_name>` to see how many layers your image has.
3. **Ghost Runner:** Run the `ghost` blog engine using a single Docker command and access it on Port 2368.
4. **Volume Check:** Create a volume, mount it to a container, create a file, delete the container, and verify the file still exists in the volume.
