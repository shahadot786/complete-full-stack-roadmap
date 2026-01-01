# 🛠️ Bash Scripting - Practice Projects

Put your scripting skills to the test with real-world scenarios.

## 🟢 Project 1: Automated Backup Utility
**Goal:** Periodically compress and move important folders.
- **Requirements:**
  - Compress `/home/user/documents` into a `.tar.gz` file.
  - Append a timestamp to the filename.
  - Delete backups older than 7 days to save space.
  - Use `cron` to schedule this daily.

## 🟢 Project 2: Website Monitor
**Goal:** Track the uptime of multiple websites.
- **Requirements:**
  - Create a text file with a list of URLs.
  - Read each URL and ping it or use `curl -I`.
  - Log the status (UP/DOWN) with a timestamp.
  - Send a simplified notification (even just to the terminal) for any failure.

## 🟢 Project 3: System Init Automator
**Goal:** Setup a new development machine in one click.
- **Requirements:**
  - Install `git`, `docker`, and `vscode` (via apt or snap).
  - Copy custom `.bashrc` or `.zshrc` aliases.
  - Print a summary of installed versions.
- **Tools:** `apt`, `wget`, `curl`.
