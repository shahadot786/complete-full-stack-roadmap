# 🔧 Development Environment - Complete Setup Guide

> **Set up professional development environments for all major technologies**

---

## 📚 Table of Contents

1. [Node.js & JavaScript](#nodejs--javascript)
2. [Python](#python)
3. [Java](#java)
4. [Docker](#docker)
5. [Database Tools](#database-tools)

---

## 🟢 Node.js & JavaScript

### Installation with NVM (Recommended)

**Why NVM?**
- Manage multiple Node versions
- Easy switching between projects
- No sudo required for global packages

**Install NVM:**
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Add to ~/.zshrc or ~/.bashrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Reload shell
source ~/.zshrc
```

**Usage:**
```bash
# Install latest LTS
nvm install --lts

# Install specific version
nvm install 18.17.0

# List installed versions
nvm list

# Use specific version
nvm use 18

# Set default version
nvm alias default 18

# Check versions
node --version
npm --version
```

### npm Configuration

```bash
# Set npm defaults
npm config set init-author-name "Your Name"
npm config set init-author-email "your.email@example.com"
npm config set init-license "MIT"

# View config
npm config list

# Global packages location
npm config get prefix

# Useful global packages
npm install -g yarn
npm install -g pnpm
npm install -g nodemon
npm install -g pm2
npm install -g typescript
npm install -g ts-node
npm install -g eslint
npm install -g prettier
npm install -g create-react-app
npm install -g @vue/cli
npm install -g @angular/cli
npm install -g next
npm install -g vercel
npm install -g netlify-cli
```

### Package Managers Comparison

**npm (Default)**
```bash
npm install package-name
npm install --save-dev package-name
npm install -g package-name
npm update
npm run script-name
```

**Yarn (Faster)**
```bash
yarn add package-name
yarn add --dev package-name
yarn global add package-name
yarn upgrade
yarn script-name
```

**pnpm (Disk Efficient)**
```bash
pnpm add package-name
pnpm add -D package-name
pnpm add -g package-name
pnpm update
pnpm script-name
```

### Project Setup

**package.json Template:**
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Project description",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "keywords": [],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "nodemon": "^3.0.0"
  }
}
```

---

## 🐍 Python

### Installation

**macOS (Homebrew):**
```bash
brew install python3

# Verify
python3 --version
pip3 --version
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip
```

### Virtual Environments

**venv (Built-in):**
```bash
# Create virtual environment
python3 -m venv venv

# Activate
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Deactivate
deactivate

# Install packages
pip install package-name

# Save dependencies
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt
```

**virtualenv:**
```bash
# Install
pip install virtualenv

# Create environment
virtualenv venv

# With specific Python version
virtualenv -p python3.9 venv
```

**pyenv (Multiple Python Versions):**
```bash
# Install pyenv
brew install pyenv

# Add to ~/.zshrc
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# Install Python version
pyenv install 3.11.0

# Set global version
pyenv global 3.11.0

# Set local version (per project)
pyenv local 3.9.0

# List versions
pyenv versions
```

### Poetry (Modern Dependency Management)

```bash
# Install
curl -sSL https://install.python-poetry.org | python3 -

# Create new project
poetry new my-project

# Initialize in existing project
poetry init

# Add dependency
poetry add requests

# Add dev dependency
poetry add --dev pytest

# Install dependencies
poetry install

# Run script
poetry run python script.py

# Activate virtual environment
poetry shell
```

### Project Structure

```
my-python-project/
├── src/
│   └── __init__.py
├── tests/
│   └── test_main.py
├── .gitignore
├── README.md
├── requirements.txt
├── setup.py
└── pyproject.toml
```

---

## ☕ Java

### Installation

**macOS:**
```bash
# Install OpenJDK
brew install openjdk@17

# Add to PATH
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc

# Verify
java --version
javac --version
```

**SDKMAN (Multiple Java Versions):**
```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash

# Install Java
sdk install java 17.0.5-tem

# List available versions
sdk list java

# Switch versions
sdk use java 11.0.12-open

# Set default
sdk default java 17.0.5-tem
```

### Build Tools

**Maven:**
```bash
# Install
brew install maven

# Verify
mvn --version

# Create project
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=my-app \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false

# Build
mvn clean install

# Run tests
mvn test

# Package
mvn package
```

**Gradle:**
```bash
# Install
brew install gradle

# Verify
gradle --version

# Initialize project
gradle init

# Build
gradle build

# Run tests
gradle test

# Run application
gradle run
```

---

## 🐳 Docker

### Installation

**Download Docker Desktop:**
- [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

**Verify Installation:**
```bash
docker --version
docker-compose --version
```

### Essential Commands

```bash
# Images
docker pull image-name
docker images
docker rmi image-id

# Containers
docker run image-name
docker run -d -p 8080:80 nginx
docker ps                    # Running containers
docker ps -a                 # All containers
docker stop container-id
docker start container-id
docker restart container-id
docker rm container-id
docker logs container-id
docker exec -it container-id bash

# Build
docker build -t my-image .
docker build -t my-image:v1.0 .

# Clean up
docker system prune          # Remove unused data
docker system prune -a       # Remove all unused images
```

### Dockerfile Example

```dockerfile
# Node.js Application
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:
```

**Commands:**
```bash
docker-compose up
docker-compose up -d         # Detached mode
docker-compose down
docker-compose logs -f
docker-compose exec web sh
```

---

## 🗄️ Database Tools

### PostgreSQL

**Installation:**
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb mydb

# Connect
psql mydb
```

**GUI Tools:**
- **DBeaver** (Free, cross-platform)
- **TablePlus** (macOS, paid)
- **pgAdmin** (Free, official)
- **Postico** (macOS)

### MongoDB

**Installation:**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start service
brew services start mongodb-community

# Connect
mongosh
```

**GUI Tools:**
- **MongoDB Compass** (Official, free)
- **Studio 3T** (Paid)
- **Robo 3T** (Free)

### Redis

**Installation:**
```bash
# macOS
brew install redis

# Start service
brew services start redis

# Connect
redis-cli

# Test
redis-cli ping
```

**GUI Tools:**
- **RedisInsight** (Official, free)
- **Medis** (macOS)

---

## 🔧 Environment Variables

### .env File

```bash
# .env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=your-api-key
JWT_SECRET=your-secret-key
```

**Load in Node.js:**
```bash
npm install dotenv
```

```javascript
// index.js
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
```

**Load in Python:**
```bash
pip install python-dotenv
```

```python
# main.py
from dotenv import load_dotenv
import os

load_dotenv()

port = os.getenv('PORT', 3000)
db_url = os.getenv('DATABASE_URL')
```

---

## 📚 Resources

**Node.js:**
- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)

**Python:**
- [Python Documentation](https://docs.python.org/3/)
- [Real Python](https://realpython.com/)

**Java:**
- [Java Documentation](https://docs.oracle.com/en/java/)
- [Spring Boot](https://spring.io/projects/spring-boot)

**Docker:**
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

**Your development environment is production-ready! 🚀**
