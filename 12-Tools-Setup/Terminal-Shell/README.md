# 🖥️ Terminal & Shell - Complete Mastery Guide

> **Transform your terminal into a productivity powerhouse**

---

## 📚 Table of Contents

1. [Terminal Basics](#terminal-basics)
2. [Essential Commands](#essential-commands)
3. [Shell Customization](#shell-customization)
4. [Productivity Tools](#productivity-tools)
5. [Scripting Basics](#scripting-basics)

---

## 🎯 Terminal Basics

### What is a Terminal?

A **terminal** (or command-line interface) is a text-based interface to interact with your computer's operating system.

**Why Learn Terminal?**
- ⚡ Faster than GUI for many tasks
- 🔧 Essential for servers and DevOps
- 🤖 Automation through scripts
- 💼 Professional development requirement
- 🌐 Works on remote servers

### Terminal Applications

**macOS:**
- **Terminal** (Built-in)
- **iTerm2** (Recommended) - [iterm2.com](https://iterm2.com/)
- **Alacritty** (Fast, GPU-accelerated)
- **Warp** (Modern, AI-powered)

**Windows:**
- **Windows Terminal** (Recommended)
- **Git Bash**
- **WSL** (Windows Subsystem for Linux)
- **PowerShell**

**Linux:**
- **GNOME Terminal** (Ubuntu default)
- **Konsole** (KDE)
- **Alacritty**
- **Terminator**

---

## 📁 Essential Commands

### Navigation

```bash
# Print working directory
pwd

# List files
ls                  # Basic list
ls -l               # Long format
ls -la              # Include hidden files
ls -lh              # Human-readable sizes
ls -lt              # Sort by modification time
ls -lS              # Sort by size

# Change directory
cd /path/to/folder  # Absolute path
cd folder           # Relative path
cd ..               # Up one level
cd ../..            # Up two levels
cd ~                # Home directory
cd -                # Previous directory
```

### File Operations

```bash
# Create directory
mkdir folder-name
mkdir -p path/to/nested/folder  # Create parent directories

# Create file
touch filename.txt
touch file1.txt file2.txt file3.txt  # Multiple files

# Copy files
cp source.txt destination.txt
cp -r folder/ new-folder/        # Copy directory recursively
cp -v source.txt dest.txt        # Verbose output

# Move/Rename
mv old-name.txt new-name.txt
mv file.txt /path/to/destination/
mv *.txt documents/              # Move all .txt files

# Remove files
rm filename.txt
rm -r folder/                    # Remove directory
rm -rf folder/                   # Force remove (careful!)
rm -i file.txt                   # Interactive (ask confirmation)

# View file contents
cat filename.txt                 # Display entire file
less filename.txt                # Paginated view (q to quit)
head filename.txt                # First 10 lines
head -n 20 filename.txt          # First 20 lines
tail filename.txt                # Last 10 lines
tail -f logfile.txt              # Follow file (live updates)
```

### File Searching

```bash
# Find files
find . -name "*.js"              # Find all JS files
find . -type f -name "test*"     # Find files starting with "test"
find . -type d -name "node_modules"  # Find directories
find . -mtime -7                 # Files modified in last 7 days
find . -size +10M                # Files larger than 10MB

# Search in files
grep "search term" filename.txt
grep -r "search term" .          # Recursive search
grep -i "search term" file.txt   # Case-insensitive
grep -n "search term" file.txt   # Show line numbers
grep -v "exclude" file.txt       # Invert match
grep -A 3 "term" file.txt        # Show 3 lines after match
grep -B 3 "term" file.txt        # Show 3 lines before match
```

### File Permissions

```bash
# View permissions
ls -l

# Change permissions
chmod 755 script.sh              # rwxr-xr-x
chmod +x script.sh               # Add execute permission
chmod -w file.txt                # Remove write permission

# Change ownership
chown user:group file.txt
sudo chown -R user:group folder/
```

### System Information

```bash
# Current user
whoami

# System info
uname -a                         # All system info
uname -s                         # Kernel name
uname -r                         # Kernel release

# Disk usage
df -h                            # Disk space
du -sh folder/                   # Folder size
du -h --max-depth=1              # Size of subdirectories

# Memory usage
free -h                          # RAM usage (Linux)
top                              # Process monitor
htop                             # Better process monitor

# Network
ifconfig                         # Network interfaces (macOS/Linux)
ip addr                          # IP addresses (Linux)
ping google.com                  # Test connectivity
curl https://api.github.com      # Make HTTP request
wget https://example.com/file    # Download file
```

### Process Management

```bash
# List processes
ps aux                           # All processes
ps aux | grep python             # Find Python processes

# Kill process
kill PID                         # Graceful termination
kill -9 PID                      # Force kill
killall process-name             # Kill by name

# Background processes
command &                        # Run in background
jobs                             # List background jobs
fg %1                            # Bring job to foreground
bg %1                            # Resume job in background
```

---

## 🎨 Shell Customization

### Zsh with Oh My Zsh (Recommended)

**Install Zsh (macOS):**
```bash
# Check if already installed
zsh --version

# Install via Homebrew
brew install zsh

# Set as default shell
chsh -s $(which zsh)
```

**Install Oh My Zsh:**
```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Popular Themes:**
```bash
# Edit ~/.zshrc
ZSH_THEME="robbyrussell"  # Default
ZSH_THEME="agnoster"      # Popular
ZSH_THEME="powerlevel10k/powerlevel10k"  # Advanced
```

**Install Powerlevel10k:**
```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# Edit ~/.zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"

# Configure
p10k configure
```

**Useful Plugins:**
```bash
# Edit ~/.zshrc
plugins=(
  git
  node
  npm
  python
  docker
  kubectl
  vscode
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

**Install Additional Plugins:**
```bash
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

---

## ⚡ Aliases & Functions

### Useful Aliases

Add to `~/.zshrc` or `~/.bashrc`:

```bash
# Navigation
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias ~="cd ~"
alias -- -="cd -"

# List
alias ll="ls -lah"
alias la="ls -A"
alias l="ls -CF"

# Git shortcuts
alias gs="git status"
alias ga="git add"
alias gaa="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph --all"
alias gco="git checkout"
alias gb="git branch"
alias gd="git diff"

# Development
alias python="python3"
alias pip="pip3"
alias serve="python -m http.server 8000"
alias myip="curl http://ipecho.net/plain; echo"

# Docker
alias dps="docker ps"
alias dpa="docker ps -a"
alias di="docker images"
alias dex="docker exec -it"
alias dlog="docker logs -f"

# npm/yarn
alias ni="npm install"
alias ns="npm start"
alias nt="npm test"
alias nb="npm run build"
alias yi="yarn install"
alias ys="yarn start"

# System
alias c="clear"
alias h="history"
alias path='echo -e ${PATH//:/\\n}'
alias reload="source ~/.zshrc"

# Safety
alias rm="rm -i"
alias cp="cp -i"
alias mv="mv -i"

# Shortcuts
alias code="code ."
alias hosts="sudo nano /etc/hosts"
```

### Custom Functions

```bash
# Create directory and cd into it
mkcd() {
  mkdir -p "$1" && cd "$1"
}

# Extract any archive
extract() {
  if [ -f $1 ]; then
    case $1 in
      *.tar.bz2)   tar xjf $1     ;;
      *.tar.gz)    tar xzf $1     ;;
      *.bz2)       bunzip2 $1     ;;
      *.rar)       unrar e $1     ;;
      *.gz)        gunzip $1      ;;
      *.tar)       tar xf $1      ;;
      *.tbz2)      tar xjf $1     ;;
      *.tgz)       tar xzf $1     ;;
      *.zip)       unzip $1       ;;
      *.Z)         uncompress $1  ;;
      *.7z)        7z x $1        ;;
      *)           echo "'$1' cannot be extracted" ;;
    esac
  else
    echo "'$1' is not a valid file"
  fi
}

# Find and kill process by name
killport() {
  lsof -ti:$1 | xargs kill -9
}

# Git commit and push
gcp() {
  git add .
  git commit -m "$1"
  git push
}
```

---

## 🛠️ Productivity Tools

### Essential CLI Tools

**Install via Homebrew (macOS):**

```bash
# Better alternatives to standard tools
brew install bat          # Better cat
brew install exa          # Better ls
brew install ripgrep      # Better grep (rg)
brew install fd           # Better find
brew install fzf          # Fuzzy finder
brew install tldr         # Simplified man pages
brew install htop         # Better top
brew install tree         # Directory tree
brew install jq           # JSON processor
brew install httpie       # Better curl

# Development tools
brew install gh           # GitHub CLI
brew install lazygit      # Git TUI
brew install tmux         # Terminal multiplexer
```

**Usage Examples:**

```bash
# bat (better cat)
bat filename.txt

# exa (better ls)
exa -la --icons

# ripgrep (better grep)
rg "search term" --type js

# fd (better find)
fd "*.js"

# fzf (fuzzy finder)
vim $(fzf)                # Open file in vim with fuzzy search

# tldr (simplified man pages)
tldr git

# jq (JSON processor)
curl https://api.github.com/users/github | jq '.name'

# httpie (better curl)
http GET https://api.github.com/users/github
```

---

## 📝 Scripting Basics

### Bash Script Template

```bash
#!/bin/bash

# Script: example.sh
# Description: Example bash script
# Author: Your Name
# Date: 2025-01-01

# Exit on error
set -e

# Variables
NAME="World"
COUNT=5

# Functions
greet() {
  echo "Hello, $1!"
}

# Main logic
echo "Starting script..."

greet "$NAME"

for i in $(seq 1 $COUNT); do
  echo "Iteration $i"
done

echo "Script completed!"
```

**Make executable:**
```bash
chmod +x script.sh
./script.sh
```

### Common Scripting Patterns

**Conditional Statements:**
```bash
if [ -f "file.txt" ]; then
  echo "File exists"
else
  echo "File does not exist"
fi

# Check if directory exists
if [ -d "folder" ]; then
  echo "Directory exists"
fi

# String comparison
if [ "$VAR" = "value" ]; then
  echo "Match"
fi

# Numeric comparison
if [ $NUM -gt 10 ]; then
  echo "Greater than 10"
fi
```

**Loops:**
```bash
# For loop
for file in *.txt; do
  echo "Processing $file"
done

# While loop
counter=0
while [ $counter -lt 5 ]; do
  echo "Counter: $counter"
  ((counter++))
done

# Loop through array
files=("file1.txt" "file2.txt" "file3.txt")
for file in "${files[@]}"; do
  echo "$file"
done
```

**User Input:**
```bash
read -p "Enter your name: " name
echo "Hello, $name!"

# With default value
read -p "Enter port [3000]: " port
port=${port:-3000}
echo "Using port: $port"
```

---

## 📚 Resources

**Learning:**
- [The Missing Semester](https://missing.csail.mit.edu/) (MIT)
- [Command Line Crash Course](https://www.freecodecamp.org/news/command-line-for-beginners/)
- [Bash Scripting Tutorial](https://linuxconfig.org/bash-scripting-tutorial)

**Cheat Sheets:**
- [Linux Command Line Cheat Sheet](https://cheatography.com/davechild/cheat-sheets/linux-command-line/)
- [Bash Scripting Cheat Sheet](https://devhints.io/bash)

**Interactive:**
- [Terminus](http://www.mprat.org/Terminus/) (Terminal game)
- [Vim Adventures](https://vim-adventures.com/)

---

**Master the terminal and boost your productivity! 🚀**
