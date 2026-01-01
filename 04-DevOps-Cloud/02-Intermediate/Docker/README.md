# 🐳 Docker & Containerization

Containers change how we build, ship, and run applications. Docker is the industry leader.

## 🗺️ Learning Roadmap

### 1. Docker Fundamentals
- What are containers? (VMs vs. Containers)
- Images vs. Containers
- Basic Commands: `docker run`, `docker build`, `docker ps`, `docker images`, `docker rm`
- Interactive Shell: `docker exec`

### 2. Building Efficient Images
- `Dockerfile` Syntax (`FROM`, `RUN`, `COPY`, `CMD`, `ENTRYPOINT`)
- Multi-stage builds (reducing image size)
- Image Layering and Caching
- Docker Registries (Docker Hub, ECR, GCR)

### 3. Orchestration for Development
- **Docker Compose:** Managing multi-container apps
- `docker-compose.yml` structure
- Networking and Volumes in Compose
- Environment variables and `.env` files

## 📚 Recommended Books
- **Docker Deep Dive** by Nigel Poulton
- **Docker in Action** by Jeff Nickoloff
- **The Docker Book** by James Turnbull

## 🎥 Top Video Resources
- [Docker Tutorial for Beginners (Programming with Mosh)](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Course (FreeCodeCamp)](https://www.youtube.com/watch?v=3c-iBn73dDE)

## 🛠️ Hands-on Projects
1. **App Containerization:** Dockerize a simple Node.js/Python web app.
2. **Full-Stack Compose:** Create a `docker-compose.yml` for a React app, Node API, and MongoDB.
3. **Database Migration Image:** Build a custom image that runs database migrations on startup.

## 📝 Exercises
- [Play with Docker](https://labs.play-with-docker.com/) - Online playground
- [Docker Curriculum](https://docker-curriculum.com/)
