# Deploying Web3Question App (Frontend + Backend + Postgres) on AWS EC2

This guide will help you set up your full-stack app (frontend, backend, and Postgres DB) on an AWS EC2 instance using Docker Compose.

---

## 1. Launch an EC2 Instance
- Go to AWS Console → EC2 → Launch Instance
- Choose Ubuntu 22.04 LTS (or similar)
- Instance type: t2.micro (free tier) or larger
- Allow SSH (port 22), HTTP (port 80), and custom TCP (e.g., 3001, 8000, 5432) in security group
- Create/download a key pair for SSH access

## 2. Connect to Your Instance
```sh
ssh -i /path/to/your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

## 3. Install Docker & Docker Compose
```sh
sudo apt update && sudo apt install -y docker.io docker-compose git
sudo usermod -aG docker $USER
newgrp docker
```

## 4. Clone Your Repository
```sh
git clone <YOUR_REPO_URL>
cd web3question
```

## 5. Configure Environment Variables
- Copy `backend/.env.example` to `backend/.env` and update values as needed (DB host: `postgres`, user/pass: as in docker-compose.yml)

## 6. Start All Services with Docker Compose
```sh
docker-compose up -d
```
- This will start Postgres, backend, and any other services defined.

## 7. Seed the Database (if needed)
```sh
docker-compose exec backend npm run db:seed
```

## 8. Access the App
- Backend API: `http://<EC2_PUBLIC_IP>:3001/api`
- Frontend (if served via Python or Nginx): `http://<EC2_PUBLIC_IP>:8000` or `http://<EC2_PUBLIC_IP>`

## 9. (Optional) Serve Frontend with Nginx
- Install Nginx: `sudo apt install nginx`
- Copy static files to `/var/www/html` or configure a custom site

---

## Notes
- Make sure your security group allows inbound traffic on the ports you use.
- For production, consider using HTTPS and securing your .env files.
- You can stop all services with `docker-compose down`.

---

## Troubleshooting
- Use `docker-compose logs` to view logs.
- Use `docker ps` to check running containers.
- Use `sudo ufw allow <port>` to open additional ports if needed.

---

**You now have a full-stack app running on AWS EC2!**
