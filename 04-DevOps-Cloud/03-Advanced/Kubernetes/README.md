# ☸️ Kubernetes & Container Orchestration

Kubernetes (K8s) is the industry standard for managing containerized workloads at scale.

## 🗺️ Learning Roadmap

### 1. K8s Architecture
- Control Plane vs. Worker Nodes
- Components: `kube-apiserver`, `etcd`, `kube-scheduler`, `kube-controller-manager`
- Node Components: `kubelet`, `kube-proxy`, Container Runtime

### 2. Core Objects
- **Pods:** The smallest deployable units
- **Deployments:** Scaling and rolling updates
- **Services:** Networking and Load Balancing (ClusterIP, NodePort, LoadBalancer)
- **ConfigMaps & Secrets:** Decoupling configuration

### 3. Advanced Networking & Storage
- **Ingress:** Managing external access (Ingress Controllers)
- **Volumes:** `PersistentVolumes` (PV) and `PersistentVolumeClaims` (PVC)
- **Namespaces:** Logical isolation

### 4. Ecosystem Tools
- **Helm:** The package manager for Kubernetes
- **Kustomize:** Template-free customization
- **Lens** / **K9s:** Cluster management UIs

## 📚 Recommended Books
- **Kubernetes Up & Running** by Brendan Burns
- **The Kubernetes Book** by Nigel Poulton
- **Cloud Native DevOps with Kubernetes** by John Arundel

## 🎥 Top Video Resources
- [Kubernetes Tutorial for Beginners (TechWorld with Nana)](https://www.youtube.com/watch?v=X48VuDVv0do)
- [Kubernetes Course (FreeCodeCamp)](https://www.youtube.com/watch?v=VnvRFRk_51k)

## 🛠️ Hands-on Projects
1. **Local Cluster Setup:** Install `minikube` or `kind` and deploy a sample app.
2. **Rolling Update:** Perform a zero-downtime update of a web application.
3. **Helm Chart Creation:** Pack your Dockerized app into a reusable Helm chart.

## 📝 Exercises
- [Killercoda](https://killercoda.com/playgrounds/kubernetes) - Interactive K8s scenarios
- [CKA Practice Exercises](https://github.com/dgkanatsios/CKAD-exercises)
