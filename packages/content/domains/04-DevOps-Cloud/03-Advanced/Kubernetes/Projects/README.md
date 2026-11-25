# 🛠️ Kubernetes - Practice Projects

Build and scale containerized clusters.

## 🟢 Project 1: Local Cluster Setup (Minikube/Kind)
**Goal:** Run a real cluster on your own laptop.
- **Requirements:**
  - Install `minikube` or `kind`.
  - Deploy a simple Nginx Pod.
  - Expose it using a Service (NodePort).
  - Scale the replica count to 3 and verify.

## 🟢 Project 2: High-Availability Web App
**Goal:** Ensure your app stays up even if nodes fail.
- **Requirements:**
  - Create a `Deployment` with a Readiness and Liveness probe.
  - Setup a `Service` of type `LoadBalancer` (if on cloud) or `ClusterIP` with an `Ingress`.
  - Perform a rolling update to a new version of the app.
  - Roll back the update using `kubectl rollout undo`.

## 🟢 Project 3: Persistent Data with K8s
**Goal:** Run a database without losing data on restart.
- **Requirements:**
  - Create a `PersistentVolume` (PV) and `PersistentVolumeClaim` (PVC).
  - Deploy a MongoDB or Postgres Pod.
  - Mount the PVC to the database's data directory.
  - Delete the Pod and verify the data is still there when it restarts.
