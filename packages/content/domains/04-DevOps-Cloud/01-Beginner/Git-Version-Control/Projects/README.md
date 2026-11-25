# 🛠️ Git & Version Control - Practice Projects

Master Git by solving real-world collaboration problems.

## 🟢 Project 1: The "Clean History" Challenge
**Goal:** Practice interactive rebasing and commit squashing.
- **Requirements:**
  - Create a repo with 10 messy commits.
  - Use `git rebase -i` to squash them into 3 meaningful commits.
  - Rename commit messages to follow [Conventional Commits](https://www.conventionalcommits.org/).

## 🟢 Project 2: GitHub Flow Simulation
**Goal:** Simulate a real team environment.
- **Requirements:**
  - Create a "feature" branch.
  - Push changes and open a Pull Request.
  - Simulate a merge conflict by changing the same line on the `main` branch.
  - Resolve the conflict and merge.

## 🟢 Project 3: Automated Pre-commit Hooks
**Goal:** Prevent bad code from being committed.
- **Requirements:**
  - Write a shell script that runs a linter (e.g., `eslint` or `flake8`).
  - Configure `.git/hooks/pre-commit` to run this script.
  - Verify that the commit fails if the code has formatting errors.
