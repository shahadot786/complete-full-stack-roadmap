# 🛠️ Linux Basics - Practice Projects

Applied learning is the best way to solidify your Linux skills.

## 🟢 Project 1: System Health Dashboard
**Goal:** Create a simple text-based dashboard that shows real-time system stats.
- **Requirements:**
  - Display current User, Date, and Uptime.
  - Show CPU load (top 5 processes).
  - Show RAM usage (Total vs. Used).
  - Show Disk usage for the root partition.
- **Tools:** `top`, `free`, `df`, `uptime`.

## 🟢 Project 2: Bulk User Creator
**Goal:** Automate the creation of 50 users from a text file.
- **Requirements:**
  - Read names from `users.txt`.
  - Create a group called `developers`.
  - Create each user and add them to the `developers` group.
  - Set a default temporary password.
- **Tools:** `useradd`, `groupadd`, `xargs` or `for` loop.

## 🟢 Project 3: Log Searcher
**Goal:** Find specific patterns in large system logs.
- **Requirements:**
  - Search `/var/log/syslog` for "Error" messages.
  - Count how many times "Failed password" appears.
  - Export the results to a file called `security_report.txt`.
- **Tools:** `grep`, `awk`, `wc`, redirection `>`.
