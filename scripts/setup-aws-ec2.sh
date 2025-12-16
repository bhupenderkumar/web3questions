#!/bin/bash

# Update and install dependencies
sudo apt update && sudo apt install -y docker.io docker-compose git

# Add user to Docker group
sudo usermod -aG docker $USER
newgrp docker


# Copy environment variables
cp backend/.env.example backend/.env

# Update environment variables
sed -i 's/DB_HOST=.*/DB_HOST=postgres/' backend/.env
sed -i 's/DB_USER=.*/DB_USER=your_db_user/' backend/.env
sed -i 's/DB_PASSWORD=.*/DB_PASSWORD=your_db_password/' backend/.env

# Start services with Docker Compose
docker-compose down
docker-compose up --build -d

# Seed the database
docker-compose exec backend npm run db:seed