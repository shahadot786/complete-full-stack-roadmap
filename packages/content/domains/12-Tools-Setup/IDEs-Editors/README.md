# 💻 IDEs & Code Editors - Complete Setup Guide

> **Master your development environment for maximum productivity**

---

## 🎯 Visual Studio Code - Complete Setup

### Installation & Initial Setup

**Download:**
- Visit [code.visualstudio.com](https://code.visualstudio.com/)
- Choose your OS (Windows, macOS, Linux)
- Install and launch

**First Launch Configuration:**
```bash
# Open VS Code from terminal (macOS/Linux)
code .

# Install 'code' command in PATH (macOS)
# Cmd+Shift+P → "Shell Command: Install 'code' command in PATH"
```

---

## 🔌 Essential Extensions by Category

### Frontend Development

**1. ES7+ React/Redux/React-Native snippets**
- ID: `dsznajder.es7-react-js-snippets`
- Shortcuts: `rafce`, `useState`, `useEffect`

**2. Prettier - Code Formatter**
- ID: `esbenp.prettier-vscode`
- Auto-format on save
- Consistent code style

**3. ESLint**
- ID: `dbaeumer.vscode-eslint`
- Real-time linting
- Auto-fix on save

**4. Live Server**
- ID: `ritwickdey.LiveServer`
- Launch local development server
- Hot reload

**5. Auto Rename Tag**
- ID: `formulahendry.auto-rename-tag`
- Automatically rename paired HTML/XML tags

**6. CSS Peek**
- ID: `pranaygp.vscode-css-peek`
- Jump to CSS definitions

**7. Tailwind CSS IntelliSense**
- ID: `bradlc.vscode-tailwindcss`
- Autocomplete for Tailwind classes

---

### Backend Development

**1. Python (Microsoft)**
- ID: `ms-python.python`
- IntelliSense, linting, debugging
- Jupyter notebook support

**2. Pylance**
- ID: `ms-python.vscode-pylance`
- Fast, feature-rich language support

**3. Java Extension Pack**
- ID: `vscjava.vscode-java-pack`
- Complete Java development environment

**4. Go**
- ID: `golang.go`
- Go language support

**5. REST Client**
- ID: `humao.rest-client`
- Test APIs directly in VS Code

**6. Thunder Client**
- ID: `rangav.vscode-thunder-client`
- Lightweight REST API client

---

### Database & DevOps

**1. Docker**
- ID: `ms-azuretools.vscode-docker`
- Manage containers and images

**2. Kubernetes**
- ID: `ms-kubernetes-tools.vscode-kubernetes-tools`
- K8s cluster management

**3. PostgreSQL**
- ID: `ckolkman.vscode-postgres`
- Database management

**4. MongoDB for VS Code**
- ID: `mongodb.mongodb-vscode`
- MongoDB integration

---

### Git & Version Control

**1. GitLens**
- ID: `eamodio.gitlens`
- Supercharge Git capabilities
- Blame annotations, history

**2. Git Graph**
- ID: `mhutchie.git-graph`
- Visualize repository graph

**3. GitHub Pull Requests**
- ID: `github.vscode-pull-request-github`
- Manage PRs from VS Code

---

### AI & Productivity

**1. GitHub Copilot**
- ID: `github.copilot`
- AI pair programmer
- Code suggestions

**2. Tabnine**
- ID: `tabnine.tabnine-vscode`
- AI code completion

**3. Error Lens**
- ID: `usernamehw.errorlens`
- Highlight errors inline

**4. Better Comments**
- ID: `aaron-bond.better-comments`
- Color-coded comments

**5. Todo Tree**
- ID: `gruntfuggly.todo-tree`
- Track TODO, FIXME, etc.

---

### Themes & Icons

**1. One Dark Pro**
- ID: `zhuangtongfa.material-theme`
- Popular dark theme

**2. Material Icon Theme**
- ID: `pkief.material-icon-theme`
- Beautiful file icons

**3. Dracula Official**
- ID: `dracula-theme.theme-dracula`
- Dracula color scheme

---

## ⚙️ VS Code Settings Configuration

### settings.json (User Settings)

```json
{
  // Editor
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 22,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.suggestSelection": "first",
  "editor.inlineSuggest.enabled": true,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,

  // Files
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  // Workbench
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.startupEditor": "welcomePage",
  "workbench.editor.enablePreview": false,

  // Terminal
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.fontFamily": "MesloLGS NF",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "line",

  // Prettier
  "prettier.singleQuote": true,
  "prettier.semi": true,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 80,
  "prettier.tabWidth": 2,

  // Language-specific
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true
  },

  // Git
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,

  // Emmet
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },

  // GitHub Copilot
  "github.copilot.enable": {
    "*": true
  }
}
```

---

## ⌨️ Essential Keyboard Shortcuts

### General
| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + P` | Quick Open File |
| `Cmd/Ctrl + Shift + P` | Command Palette |
| `Cmd/Ctrl + B` | Toggle Sidebar |
| `Cmd/Ctrl + J` | Toggle Panel |
| `Cmd/Ctrl + `` ` `` | Toggle Terminal |
| `Cmd/Ctrl + ,` | Settings |

### Editing
| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + /` | Toggle Line Comment |
| `Cmd/Ctrl + Shift + /` | Toggle Block Comment |
| `Cmd/Ctrl + D` | Select Next Occurrence |
| `Cmd/Ctrl + Shift + L` | Select All Occurrences |
| `Alt + Up/Down` | Move Line Up/Down |
| `Cmd/Ctrl + Shift + K` | Delete Line |
| `Cmd/Ctrl + Enter` | Insert Line Below |
| `Cmd/Ctrl + Shift + Enter` | Insert Line Above |

### Navigation
| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + G` | Go to Line |
| `Cmd/Ctrl + Shift + O` | Go to Symbol |
| `F12` | Go to Definition |
| `Alt + F12` | Peek Definition |
| `Cmd/Ctrl + Tab` | Switch Between Files |

### Search & Replace
| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + F` | Find |
| `Cmd/Ctrl + H` | Replace |
| `Cmd/Ctrl + Shift + F` | Find in Files |
| `Cmd/Ctrl + Shift + H` | Replace in Files |

---

## 🎨 Custom Snippets

### JavaScript/React Snippets

**Create:** File → Preferences → User Snippets → javascript.json

```json
{
  "Console Log": {
    "prefix": "clg",
    "body": ["console.log('$1:', $1);"],
    "description": "Console log with label"
  },
  "Arrow Function": {
    "prefix": "af",
    "body": ["const $1 = ($2) => {", "  $3", "};"],
    "description": "Arrow function"
  },
  "Async Arrow Function": {
    "prefix": "aaf",
    "body": ["const $1 = async ($2) => {", "  $3", "};"],
    "description": "Async arrow function"
  },
  "Try Catch": {
    "prefix": "tryc",
    "body": [
      "try {",
      "  $1",
      "} catch (error) {",
      "  console.error('Error:', error);",
      "}"
    ],
    "description": "Try catch block"
  }
}
```

---

## 🚀 Productivity Tips

### Multi-Cursor Editing
- `Alt + Click` - Add cursor
- `Cmd/Ctrl + Alt + Up/Down` - Add cursor above/below
- `Cmd/Ctrl + D` - Select next occurrence

### Zen Mode
- `Cmd/Ctrl + K Z` - Distraction-free coding

### Split Editor
- `Cmd/Ctrl + \` - Split editor
- `Cmd/Ctrl + 1/2/3` - Focus editor group

### Emmet
- `div.container>ul>li*5` + Tab
- `!` + Tab (HTML boilerplate)

---

## 🔧 JetBrains IDEs Setup

### PyCharm Professional

**Essential Plugins:**
1. **Material Theme UI** - Beautiful themes
2. **Rainbow Brackets** - Colorize brackets
3. **Key Promoter X** - Learn shortcuts
4. **GitToolBox** - Enhanced Git integration
5. **String Manipulation** - Text transformation

**Keymap:**
- Use "VS Code" keymap for consistency
- Settings → Keymap → VS Code

**Python Interpreter:**
```
Settings → Project → Python Interpreter
→ Add Interpreter → Virtualenv Environment
```

---

### IntelliJ IDEA

**For Java/Kotlin Development:**

**Essential Plugins:**
1. **Lombok** - Reduce boilerplate
2. **SonarLint** - Code quality
3. **Maven Helper** - Dependency management
4. **Spring Boot Assistant** - Spring support

**Live Templates:**
```
Settings → Editor → Live Templates
→ Add custom templates for common patterns
```

---

## 📚 Resources

**VS Code:**
- [Official Documentation](https://code.visualstudio.com/docs)
- [VS Code Can Do That?](https://vscodecandothat.com/)
- [Awesome VS Code](https://github.com/viatsko/awesome-vscode)

**JetBrains:**
- [PyCharm Guide](https://www.jetbrains.com/pycharm/guide/)
- [IntelliJ IDEA Guide](https://www.jetbrains.com/idea/guide/)

---

**Your IDE is now optimized for professional development! 🚀**
