# 🛠️ Monitoring & Logging - Practice Projects

Build systems that give you full visibility into your apps.

## 🟢 Project 1: The "Local Health" Dashboard (Grafana)
**Goal:** See your own computer's stats in a beautiful UI.
- **Requirements:**
  - Install `Prometheus` and `Grafana` (use Docker for ease).
  - Use `node_exporter` to ship your OS metrics to Prometheus.
  - Create a Grafana dashboard that shows CPU, RAM, and Disk usage over time.

## 🟢 Project 2: Centralized App Logging (ELK)
**Goal:** Stop SSHing into servers to read logs.
- **Requirements:**
  - Setup the ELK stack (Elasticsearch, Logstash, Kibana) using Docker Compose.
  - Configure a simple web app to send its logs to Logstash (or use Filebeat).
  - Use the Kibana "Discover" tab to search through your application's logs.

## 🟢 Project 3: Alerting on Failure
**Goal:** Get notified before your users notice an issue.
- **Requirements:**
  - Setup `Alertmanager` for Prometheus.
  - Create a rule that triggers if your web app returns more than 10% errors (500 codes).
  - Configure an alert to send a message to Slack or Email when the rule is met.
