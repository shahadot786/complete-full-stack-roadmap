# 🛠️ Tools & Setup - Complete Development Environment Guide

> **Goal:** Set up a professional development environment with industry-standard tools

**Estimated Time:** 1-2 weeks  
**Difficulty:** Beginner-friendly  
**Prerequisites:** Basic computer skills

---

## 📋 Table of Contents

1. [IDEs & Code Editors](#ides--code-editors)
2. [Git & Version Control](#git--version-control)
3. [Terminal & Shell](#terminal--shell)
4. [Development Environment](#development-environment)
5. [Essential Tools](#essential-tools)

---

## 💻 IDEs & Code Editors

### Visual Studio Code (Recommended for Beginners)

**Why VS Code?**
- Free and open-source
- Massive extension ecosystem
- Excellent for web development
- Built-in Git integration
- IntelliSense (smart code completion)

**Installation:**
- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Available for Windows, macOS, Linux

**Essential Extensions:**

```
Frontend Development:
├── ES7+ React/Redux/React-Native snippets
├── Prettier - Code formatter
├── ESLint
├── Live Server
├── Auto Rename Tag
└── Path Intellisense

Backend Development:
├── Python (Microsoft)
├── Pylance
├── Java Extension Pack
├── Go
└── REST Client

General Productivity:
├── GitLens
├── GitHub Copilot (AI assistant)
├── Error Lens
├── Better Comments
├── Material Icon Theme
└── One Dark Pro (theme)
```

**VS Code Settings (settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "editor.suggestSelection": "first",
  "files.autoSave": "afterDelay",
  "terminal.integrated.fontSize": 14,
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme"
}
```

**Keyboard Shortcuts (Must Know):**
- `Cmd/Ctrl + P` - Quick file open
- `Cmd/Ctrl + Shift + P` - Command palette
- `Cmd/Ctrl + /` - Toggle comment
- `Cmd/Ctrl + D` - Select next occurrence
- `Alt + Up/Down` - Move line up/down
- `Cmd/Ctrl + Shift + K` - Delete line
- `Cmd/Ctrl + `` ` `` - Toggle terminal

**Resources:**
- [VS Code Documentation](https://code.visualstudio.com/docs)
- [VS Code Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)

---

### JetBrains IDEs (Professional Development)

**PyCharm** (Python Development)
- Professional Python IDE
- Excellent debugging tools
- Database tools included
- Scientific tools for data science
- [Download PyCharm](https://www.jetbrains.com/pycharm/)

**IntelliJ IDEA** (Java/Kotlin Development)
- Industry standard for Java
- Spring Boot integration
- Maven/Gradle support
- [Download IntelliJ IDEA](https://www.jetbrains.com/idea/)

**WebStorm** (JavaScript/TypeScript)
- Advanced JavaScript IDE
- React/Vue/Angular support
- Built-in debugger
- [Download WebStorm](https://www.jetbrains.com/webstorm/)

**Student License:** Free for students with .edu email

---

### Other Popular Editors

**Sublime Text**
- Fast and lightweight
- Great for quick edits
- [sublimetext.com](https://www.sublimetext.com/)

**Vim/Neovim**
- Terminal-based editor
- Extremely powerful for advanced users
- Steep learning curve
- [neovim.io](https://neovim.io/)

**Atom** (Discontinued but still used)
- GitHub's editor
- Similar to VS Code

---

## 🌿 Git & Version Control

### What is Git?
Git is a distributed version control system that tracks changes in your code, enabling collaboration and version history.

### Installation

**macOS:**
```bash
# Using Homebrew
brew install git

# Verify installation
git --version
```

**Windows:**
- Download from [git-scm.com](https://git-scm.com/)
- Use Git Bash for terminal commands

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install git

# Fedora
sudo dnf install git
```

### Initial Configuration

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Set default editor
git config --global core.editor "code --wait"

# Enable color output
git config --global color.ui auto

# View all settings
git config --list
```

### Essential Git Commands

**Basic Workflow:**
```bash
# Initialize a repository
git init

# Clone a repository
git clone https://github.com/username/repo.git

# Check status
git status

# Add files to staging
git add .                    # Add all files
git add filename.txt         # Add specific file

# Commit changes
git commit -m "Your message"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main
```

**Branching:**
```bash
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch (shortcut)
git checkout -b feature-name

# List all branches
git branch -a

# Merge branch
git checkout main
git merge feature-name

# Delete branch
git branch -d feature-name
```

**Advanced Commands:**
```bash
# View commit history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Stash changes
git stash
git stash pop

# Cherry-pick a commit
git cherry-pick commit-hash

# Rebase
git rebase main
```

### GitHub Setup

1. **Create Account:** [github.com](https://github.com/)
2. **SSH Key Setup:**

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Paste this in GitHub Settings > SSH Keys
```

3. **Test Connection:**
```bash
ssh -T git@github.com
```

### Git Workflows

**Feature Branch Workflow:**
```
main (production)
  ↓
develop (integration)
  ↓
feature/user-auth (your work)
```

**Git Flow:**
```
main → hotfix
  ↓
develop → release
  ↓
feature branches
```

### Resources
- [Pro Git Book](https://git-scm.com/book/en/v2) (Free)
- [GitHub Learning Lab](https://lab.github.com/)
- [Oh My Git!](https://ohmygit.org/) (Interactive game)
- [Learn Git Branching](https://learngitbranching.js.org/)

---

## 🖥️ Terminal & Shell

### Why Learn Terminal?
- Faster than GUI for many tasks
- Essential for servers and DevOps
- Automation through scripts
- Professional development requirement

### Terminal Basics

**macOS/Linux:**
- Built-in Terminal app
- iTerm2 (macOS - recommended)
- Alacritty (cross-platform, fast)

**Windows:**
- Windows Terminal (recommended)
- Git Bash
- WSL (Windows Subsystem for Linux)

### Essential Commands

**Navigation:**
```bash
pwd                 # Print working directory
ls                  # List files
ls -la              # List all files (including hidden)
cd folder-name      # Change directory
cd ..               # Go up one level
cd ~                # Go to home directory
```

**File Operations:**
```bash
mkdir folder-name   # Create directory
touch file.txt      # Create file
cp source dest      # Copy file
mv source dest      # Move/rename file
rm file.txt         # Remove file
rm -rf folder/      # Remove directory (careful!)
cat file.txt        # Display file contents
less file.txt       # View file (paginated)
```

**File Searching:**
```bash
find . -name "*.js"           # Find files
grep "search term" file.txt   # Search in file
grep -r "term" .              # Recursive search
```

**System Info:**
```bash
whoami              # Current user
hostname            # Computer name
top                 # Running processes
df -h               # Disk space
du -sh folder/      # Folder size
```

### Shell Customization

**Oh My Zsh (macOS/Linux):**
```bash
# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Popular themes
# Edit ~/.zshrc
ZSH_THEME="agnoster"  # or "powerlevel10k/powerlevel10k"

# Useful plugins
plugins=(git node npm python docker kubectl)
```

**Useful Aliases (~/.zshrc or ~/.bashrc):**
```bash
# Navigation
alias ..="cd .."
alias ...="cd ../.."
alias ~="cd ~"

# Git shortcuts
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph"

# Development
alias python="python3"
alias pip="pip3"
alias serve="python -m http.server 8000"

# List
alias ll="ls -lah"
alias la="ls -A"
```

### Terminal Productivity Tools

**Essential Tools:**
```bash
# Homebrew (macOS package manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node Version Manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Useful CLI tools
brew install htop          # Better top
brew install tree          # Directory tree
brew install bat           # Better cat
brew install fzf           # Fuzzy finder
brew install ripgrep       # Better grep
brew install tldr          # Simplified man pages
```

---

## 🔧 Development Environment

### Node.js & npm

**Installation:**
```bash
# Using nvm (recommended)
nvm install --lts
nvm use --lts

# Verify
node --version
npm --version
```

**Essential npm Commands:**
```bash
npm init -y                    # Initialize project
npm install package-name       # Install package
npm install -g package-name    # Install globally
npm install --save-dev pkg     # Dev dependency
npm update                     # Update packages
npm outdated                   # Check outdated packages
```

### Python Environment

**Installation:**
```bash
# macOS (using Homebrew)
brew install python3

# Verify
python3 --version
pip3 --version
```

**Virtual Environments:**
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

### Docker

**Why Docker?**
- Consistent environments
- Easy deployment
- Isolation
- Microservices

**Installation:**
- Download [Docker Desktop](https://www.docker.com/products/docker-desktop)

**Basic Commands:**
```bash
docker --version
docker pull image-name
docker run image-name
docker ps                  # Running containers
docker ps -a               # All containers
docker stop container-id
docker rm container-id
docker images
docker rmi image-id
```

**Docker Compose:**
```yaml
# docker-compose.yml example
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```

```bash
docker-compose up
docker-compose down
```

---

## 🎯 Essential Tools Checklist

### Must-Have Tools

- [ ] **Code Editor:** VS Code or JetBrains IDE
- [ ] **Version Control:** Git + GitHub account
- [ ] **Terminal:** iTerm2 (macOS) or Windows Terminal
- [ ] **Shell:** Zsh with Oh My Zsh
- [ ] **Package Managers:** Homebrew (macOS), Chocolatey (Windows)
- [ ] **Node.js:** via nvm
- [ ] **Python:** Python 3.x with pip
- [ ] **Docker:** Docker Desktop
- [ ] **Browser:** Chrome/Firefox with DevTools
- [ ] **API Testing:** Postman or Insomnia
- [ ] **Database Client:** DBeaver or TablePlus

### Productivity Tools

- [ ] **Note Taking:** Notion, Obsidian, or Markdown files
- [ ] **Task Management:** Todoist, Trello, or GitHub Projects
- [ ] **Time Tracking:** Toggle or RescueTime
- [ ] **Screen Recording:** OBS Studio or Loom
- [ ] **Screenshot:** Flameshot (Linux), Snagit, or built-in tools

---

## 📚 Learning Resources

### Free Courses
- [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) (MIT)
- [Command Line Crash Course](https://www.freecodecamp.org/news/command-line-for-beginners/)
- [Git and GitHub for Beginners](https://www.youtube.com/watch?v=RGOj5yH7evk) (freeCodeCamp)

### Interactive Learning
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Vim Adventures](https://vim-adventures.com/)
- [Terminus](http://www.mprat.org/Terminus/) (Terminal game)

### Documentation
- [VS Code Docs](https://code.visualstudio.com/docs)
- [Git Documentation](https://git-scm.com/doc)
- [Docker Documentation](https://docs.docker.com/)

---

## 🎓 Next Steps

After setting up your environment:

1. **Practice Git:** Create a repository, make commits, create branches
2. **Customize Your Setup:** Add aliases, themes, and extensions
3. **Build a Project:** Use your new tools to build something
4. **Learn Shortcuts:** Master keyboard shortcuts for speed
5. **Explore Advanced Tools:** CI/CD, containerization, cloud platforms

---

## 💡 Pro Tips

1. **Keep Learning:** Tools evolve, stay updated
2. **Automate:** Use scripts for repetitive tasks
3. **Backup:** Use cloud storage for dotfiles
4. **Document:** Keep notes on your setup
5. **Share:** Contribute to open source to practice

---

**Ready to code? Your development environment is set! 🚀**
