# portfolio

# 📱 Android-Powered Portfolio with Automated CI/CD
A high-performance portfolio website hosted on a "Zero-Server" architecture using an Android device (Termux), Cloudflare Zero Trust, and GitHub Actions.

## 🚀 Architecture Overview
This project demonstrates how to repurpose mobile hardware into a secure, production-grade web server. 

- **Host Machine:** Android (ARM64) via Termux
- **Web Server:** Nginx (optimized for low-power ARM)
- **Security:** Cloudflare Tunnel (Zero Trust) - *No open ports/Port Forwarding needed.*
- **Deployment:** GitHub Actions with a custom Cloudflare `ProxyCommand` bridge.
- **Domain:** kunjidev.shop (Managed via Cloudflare DNS)

## 🛠️ Key Components & Setup

### 1. The Mobile Server (Termux)
The site runs inside a Termux environment, utilizing `sshd` for secure access and `cloudflared` to bridge to the internet.
* **Service Management:** `sshd` on port 8022.
* **Connectivity:** `cloudflared` daemon running as a background service.

### 2. The Cloudflare Tunnel
Instead of exposing my home IP address, I implemented a **Cloudflare Tunnel**. 
- Traffic flows from the visitor -> Cloudflare Edge -> Encrypted Tunnel -> Termux.
- **Benefits:** Built-in DDoS protection, SSL termination at the edge, and complete IP obfuscation.

### 3. CI/CD Pipeline (The "Magic")
Whenever code is pushed to the `main` branch, a GitHub Action triggers:
1. **Runner Initialization:** Ubuntu-latest environment spins up.
2. **Tunnel Bridge:** Installs `cloudflared` on the GitHub runner.
3. **Secure Handshake:** Uses a `ProxyCommand` to "tunnel into the tunnel" to reach the phone.
4. **Automated SCP:** Transfers `index.html`, `CSS`, and assets directly to the Nginx root directory.

## ⚙️ Deployment Workflow
```mermaid
graph LR
  A[Developer] -->|Push| B(GitHub Repo)
  B --> C{GitHub Actions}
  C -->|Proxy via Cloudflared| D[Cloudflare Network]
  D -->|Secure Tunnel| E[Android Phone]
  E -->|Nginx| F[Live Site]
