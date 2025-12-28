# 🌿 Git & GitHub - Complete Mastery Guide

> **From beginner to Git expert - everything you need to know**

---

## 📚 Table of Contents

1. [Git Basics](#git-basics)
2. [Advanced Git](#advanced-git)
3. [GitHub Workflows](#github-workflows)
4. [Best Practices](#best-practices)
5. [Troubleshooting](#troubleshooting)

---

## 🎯 Git Basics

### What is Git?

Git is a **distributed version control system** that:
- Tracks changes in your code
- Enables collaboration
- Maintains complete history
- Allows branching and merging
- Works offline

### Installation

**macOS:**
```bash
# Using Homebrew
brew install git

# Verify
git --version
```

**Windows:**
- Download from [git-scm.com](https://git-scm.com/)
- Use Git Bash for Unix-like commands

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# Fedora
sudo dnf install git
```

---

## ⚙️ Initial Configuration

### Set Your Identity

```bash
# Required for commits
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify
git config --list
```

### Configure Editor

```bash
# VS Code
git config --global core.editor "code --wait"

# Vim
git config --global core.editor "vim"

# Nano
git config --global core.editor "nano"
```

### Set Default Branch

```bash
# Use 'main' instead of 'master'
git config --global init.defaultBranch main
```

### Enable Colors

```bash
git config --global color.ui auto
```

### Configure Line Endings

```bash
# macOS/Linux
git config --global core.autocrlf input

# Windows
git config --global core.autocrlf true
```

---

## 🚀 Essential Git Commands

### Repository Initialization

```bash
# Create new repository
git init

# Clone existing repository
git clone https://github.com/username/repo.git

# Clone to specific folder
git clone https://github.com/username/repo.git my-folder
```

### Basic Workflow

```bash
# Check status
git status

# Add files to staging
git add filename.txt        # Specific file
git add .                   # All files
git add *.js                # All JS files
git add folder/             # Entire folder

# Commit changes
git commit -m "Your descriptive message"

# Add and commit in one step
git commit -am "Message"    # Only for tracked files

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Fetch without merging
git fetch origin
```

### Viewing History

```bash
# View commit history
git log

# Compact view
git log --oneline

# Graph view
git log --oneline --graph --all

# Show specific number of commits
git log -n 5

# Show commits by author
git log --author="John"

# Show commits in date range
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"

# Show file changes
git log --stat

# Show detailed changes
git log -p
```

### Viewing Changes

```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Compare branches
git diff branch1..branch2

# Show changes in specific file
git diff filename.txt
```

---

## 🌳 Branching & Merging

### Branch Management

```bash
# List branches
git branch              # Local branches
git branch -a           # All branches (local + remote)
git branch -r           # Remote branches

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch (shortcut)
git checkout -b feature-name

# Modern way (Git 2.23+)
git switch feature-name
git switch -c feature-name

# Rename branch
git branch -m old-name new-name

# Delete branch
git branch -d feature-name      # Safe delete
git branch -D feature-name      # Force delete

# Delete remote branch
git push origin --delete feature-name
```

### Merging

```bash
# Merge branch into current branch
git merge feature-name

# Merge with no fast-forward (creates merge commit)
git merge --no-ff feature-name

# Abort merge if conflicts
git merge --abort
```

### Rebasing

```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Continue after resolving conflicts
git rebase --continue

# Abort rebase
git rebase --abort
```

---

## 🔄 Advanced Git Operations

### Stashing

```bash
# Save current changes
git stash

# Save with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Stash including untracked files
git stash -u
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- filename.txt

# Unstage file
git reset HEAD filename.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific commit
git revert commit-hash

# Reset to specific commit
git reset --hard commit-hash
```

### Cherry-Picking

```bash
# Apply specific commit to current branch
git cherry-pick commit-hash

# Cherry-pick multiple commits
git cherry-pick commit1 commit2 commit3

# Cherry-pick without committing
git cherry-pick -n commit-hash
```

### Tagging

```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Tag specific commit
git tag v1.0.0 commit-hash

# List tags
git tag

# Push tags to remote
git push origin v1.0.0
git push origin --tags    # All tags

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

---

## 🐙 GitHub Workflows

### SSH Key Setup

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy public key (Linux)
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

### Remote Management

```bash
# Add remote
git remote add origin https://github.com/username/repo.git

# View remotes
git remote -v

# Change remote URL
git remote set-url origin git@github.com:username/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream
```

### Pull Requests Workflow

```bash
# 1. Fork repository on GitHub
# 2. Clone your fork
git clone https://github.com/your-username/repo.git

# 3. Add upstream remote
git remote add upstream https://github.com/original-owner/repo.git

# 4. Create feature branch
git checkout -b feature-name

# 5. Make changes and commit
git add .
git commit -m "Add feature"

# 6. Push to your fork
git push origin feature-name

# 7. Create Pull Request on GitHub
# 8. Keep your fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## 📋 Git Workflows

### Feature Branch Workflow

```
main (production)
  ↓
feature/user-auth
feature/payment
feature/dashboard
```

**Process:**
```bash
# Create feature branch
git checkout -b feature/user-auth

# Work on feature
git add .
git commit -m "Implement user authentication"

# Push feature
git push origin feature/user-auth

# Merge to main (after review)
git checkout main
git merge feature/user-auth
git push origin main

# Delete feature branch
git branch -d feature/user-auth
git push origin --delete feature/user-auth
```

### Git Flow

```
main (production)
  ↓
develop (integration)
  ↓
feature/* (features)
release/* (releases)
hotfix/* (urgent fixes)
```

**Process:**
```bash
# Initialize Git Flow
git flow init

# Start feature
git flow feature start user-auth

# Finish feature
git flow feature finish user-auth

# Start release
git flow release start 1.0.0

# Finish release
git flow release finish 1.0.0

# Start hotfix
git flow hotfix start critical-bug

# Finish hotfix
git flow hotfix finish critical-bug
```

---

## 💡 Best Practices

### Commit Messages

**Good Commit Messages:**
```
feat: add user authentication
fix: resolve login bug
docs: update README with setup instructions
style: format code with prettier
refactor: simplify database queries
test: add unit tests for auth service
chore: update dependencies
```

**Conventional Commits Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### .gitignore Best Practices

```bash
# Node.js
node_modules/
npm-debug.log
.env

# Python
__pycache__/
*.pyc
venv/
.env

# IDEs
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Build
dist/
build/
*.log
```

### Branch Naming

```
feature/user-authentication
bugfix/login-error
hotfix/critical-security-issue
release/v1.2.0
docs/api-documentation
```

---

## 🔧 Troubleshooting

### Common Issues

**1. Merge Conflicts**
```bash
# View conflicted files
git status

# Edit files to resolve conflicts
# Look for <<<<<<< HEAD markers

# After resolving
git add .
git commit -m "Resolve merge conflicts"
```

**2. Accidentally Committed to Wrong Branch**
```bash
# Move commit to correct branch
git checkout correct-branch
git cherry-pick commit-hash
git checkout wrong-branch
git reset --hard HEAD~1
```

**3. Undo Pushed Commit**
```bash
# Create new commit that undoes changes
git revert commit-hash
git push origin main

# Force push (dangerous!)
git reset --hard HEAD~1
git push --force origin main
```

**4. Recover Deleted Branch**
```bash
# Find commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch commit-hash
```

---

## 📚 Resources

**Official:**
- [Pro Git Book](https://git-scm.com/book/en/v2) (Free)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)

**Interactive Learning:**
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Oh My Git!](https://ohmygit.org/)
- [Git Immersion](http://gitimmersion.com/)

**Cheat Sheets:**
- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Cheat Sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

---

**You're now a Git master! 🚀**
