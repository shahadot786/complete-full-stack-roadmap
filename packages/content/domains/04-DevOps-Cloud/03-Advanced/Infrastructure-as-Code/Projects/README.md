# 🛠️ Infrastructure as Code (IaC) - Practice Projects

Provision and configure infrastructure automatically.

## 🟢 Project 1: The "Cloud Bucket" (Terraform)
**Goal:** Deploy cloud resources using HCL.
- **Requirements:**
  - Write a Terraform script to create an S3 bucket or equivalent.
  - Enable versioning on the bucket.
  - Output the bucket's ARN/URL.
  - Use `terraform plan` to verify before `apply`.

## 🟢 Project 2: The "Web Server Setup" (Ansible)
**Goal:** Configure a remote server without SSHing manually.
- **Requirements:**
  - Create an Ansible Inventory file with your server's IP.
  - Write a Playbook that:
    - Updates the system (`apt update`).
    - Installs Nginx.
    - Copies a custom `index.html` from your local machine.
    - Restarts Nginx.

## 🟢 Project 3: Multi-Cloud VPC (Terraform)
**Goal:** Build complex networking architecture.
- **Requirements:**
  - Use Terraform modules to create a VPC.
  - Create a Public Subnet and a Private Subnet.
  - Deploy an Internet Gateway and a NAT Gateway.
  - Verify that an instance in the private subnet can still access the internet but not vice versa.
