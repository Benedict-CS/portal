#!/bin/bash

# Configuration
IMAGE_NAME="benedict-portal"
CONTAINER_NAME="my-portal"
PORT=3000

echo "🚀 Starting deployment of $IMAGE_NAME..."

# 1. Pull latest changes (assuming this is run inside the repo on the server)
echo "📥 Pulling latest changes from Git..."
git pull origin main

# 2. Build the Docker image
echo "🛠️ Building Docker image..."
docker build -t $IMAGE_NAME .

# 3. Stop and remove existing container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🛑 Stopping and removing existing container: $CONTAINER_NAME..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# 4. Run the new container
echo "🏃 Running new container on port $PORT..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:3000 \
    --restart unless-stopped \
    $IMAGE_NAME

echo "✅ Deployment successful! Portal is running at http://localhost:$PORT"
echo "🌐 If using Nginx Proxy Manager, ensure it points to this port."
