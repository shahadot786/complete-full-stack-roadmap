# 🛠️ Networking Basics - Practice Projects

Visualizing data flow through practical labs.

## 🟢 Project 1: Custom DNS Lookup Tool
**Goal:** Query DNS records without using `dig` (use a simpler wrapper).
- **Requirements:**
  - Create a script that takes a domain.
  - Return the A record (IP address).
  - Return the MX record (Email servers).
  - Return the NS records (Name servers).
- **Tools:** `nslookup`, `host`, `dig`.

## 🟢 Project 2: Packet Sniffer Analysis
**Goal:** See what data actually looks like on the wire.
- **Requirements:**
  - Install `tcpdump` or `wireshark`.
  - Capture HTTP (Port 80) traffic while visiting a simple site.
  - Identify the GET request and the 200 OK response.
  - *Note:* Do NOT capture sensitive data.

## 🟢 Project 3: Port Scanner
**Goal:** Find which services are running on a machine.
- **Requirements:**
  - Write a simple Bash loop using `nc` (Netcat) or `telnet`.
  - Scan the first 100 ports of `localhost`.
  - Report which ones are OPEN.
- **Tools:** `nc`, `nmap` (if available).
