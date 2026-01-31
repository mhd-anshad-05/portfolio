# 📱 Android-Powered Portfolio with Zero-Server Infrastructure

A production-grade portfolio website hosted on a **Zero-Server architecture** using an Android device (Termux), Cloudflare Zero Trust, and GitHub Actions for automated CI/CD.

## 🚀 Architecture Overview

This project demonstrates how to repurpose mobile hardware into a secure, production-grade web server without traditional VPS hosting.

- **Host Machine:** Android (ARM64) via Termux
- **Web Server:** Nginx (optimized for low-power ARM)
- **Security:** Cloudflare Tunnel (Zero Trust) - *No open ports/Port Forwarding needed*
- **Deployment:** GitHub Actions with Cloudflare tunnel bridge
- **Domain:** kunjidev.shop (Managed via Cloudflare DNS)

## 🛠️ Key Components & Setup

### 1. Mobile Server (Termux)

The site runs inside a Termux environment, utilizing `sshd` for secure access and `cloudflared` to bridge to the internet.

- **Service Management:** `sshd` on port 8022
- **Connectivity:** `cloudflared` daemon running as a background service
- **Web Server:** Nginx serving static content

### 2. Cloudflare Tunnel

Instead of exposing a home IP address, this implements a **Cloudflare Tunnel**.

- Traffic flows: Visitor → Cloudflare Edge → Encrypted Tunnel → Termux
- **Benefits:** 
  - Built-in DDoS protection
  - SSL termination at the edge
  - Complete IP obfuscation
  - No open inbound ports required

### 3. CI/CD Pipeline

Whenever code is pushed to the `main` branch, a GitHub Action triggers:

1. **Runner Initialization:** Ubuntu-latest environment spins up
2. **Tunnel Bridge:** Installs `cloudflared` on the GitHub runner
3. **Secure Handshake:** Uses a `ProxyCommand` to tunnel into the tunnel
4. **Automated SCP:** Transfers files directly to Nginx root directory

## 📊 Architecture Diagram

```
┌─────────────┐
│   Developer │
└──────┬──────┘
       │ git push
       ▼
┌─────────────────┐
│  GitHub Repo    │
└──────┬──────────┘
       │ triggers
       ▼
┌─────────────────┐      ┌──────────────────┐
│ GitHub Actions  │─────▶│ Cloudflare Edge  │
└─────────────────┘      └────────┬─────────┘
                                  │
                          Encrypted Tunnel
                                  │
                         ┌────────▼─────────┐
                         │ Android Device   │
                         │  - Termux        │
                         │  - Nginx         │
                         │  - cloudflared   │
                         └──────────────────┘
```

## 💡 Why This Matters

### Cost Efficiency
- **$0/month** hosting cost (excluding domain)
- No VPS or cloud compute fees
- Utilizes existing hardware

### Security
- **Zero exposed inbound ports** to public internet
- Enterprise-grade security via Cloudflare Zero Trust
- Encrypted tunnel for all traffic
- DDoS protection included

### Environmental Impact
- ARM-based low-power hosting
- Significantly lower energy consumption than x86 servers
- Repurposes existing mobile hardware

### Learning Value
- Real DevOps & infrastructure concepts
- Understanding of Zero Trust architecture
- Practical CI/CD implementation
- Cloud security best practices

## 📜 How to Reproduce

### Prerequisites
- Android device with Termux installed
- Cloudflare account (free tier works)
- GitHub account
- Domain name (optional but recommended)

### Step 1: Termux Setup

```bash
# Update packages
pkg update && pkg upgrade

# Install required packages
pkg install nginx openssh

# Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64
chmod +x cloudflared-linux-arm64
mv cloudflared-linux-arm64 $PREFIX/bin/cloudflared

# Configure nginx
nginx
```

### Step 2: Cloudflare Tunnel

1. Login to Cloudflare Zero Trust Dashboard
2. Create a new tunnel
3. Install connector on Termux device
4. Route `yourdomain.com` to `http://localhost:80`
5. Route `ssh.yourdomain.com` to `ssh://localhost:8022`

### Step 3: GitHub Actions

Add these secrets to your GitHub repository:
- `SSH_PRIVATE_KEY` - Your SSH private key
- `SSH_USER` - SSH username (usually your Termux user)
- `SSH_HOST` - Your Cloudflare tunnel SSH hostname

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Zero-Server

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Install cloudflared
      run: |
        wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
        chmod +x cloudflared-linux-amd64
        sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
    
    - name: Setup SSH
      run: |
        mkdir -p ~/.ssh
        echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        echo "Host ${{ secrets.SSH_HOST }}" >> ~/.ssh/config
        echo "  ProxyCommand cloudflared access ssh --hostname %h" >> ~/.ssh/config
    
    - name: Deploy files
      run: |
        scp -r ./* ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:/data/data/com.termux/files/usr/share/nginx/html/
```

## 🎯 Project Purpose

This portfolio demonstrates:

1. **Cloud Infrastructure Skills** - Understanding of modern cloud concepts
2. **Security-First Thinking** - Zero Trust implementation
3. **DevOps Automation** - CI/CD pipeline development
4. **Problem Solving** - Creative solution to hosting challenges
5. **Cost Optimization** - Efficient resource utilization

## 📚 Tech Stack

- **Frontend:** HTML5, CSS3 (with custom properties), Vanilla JavaScript
- **Server:** Nginx on Termux (Android)
- **Security:** Cloudflare Zero Trust + Tunnel
- **CI/CD:** GitHub Actions
- **Fonts:** Work Sans, Space Mono
- **Icons:** Font Awesome 6

## 📈 Performance

- **Page Load:** < 1s (optimized static assets)
- **Uptime:** 99.9% (mobile device always-on)
- **Global CDN:** Cloudflare edge network
- **SSL/TLS:** A+ rating (Cloudflare managed)

## 🔗 Live Demo

Visit: [kunjidev.shop](https://kunjidev.shop)

## 📄 License

This project is open source and available for educational purposes.

---

**Built by Muhammed Anshad M** - Demonstrating practical cloud infrastructure and DevOps skills without relying on traditional hosting.