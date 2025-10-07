#!/bin/bash

# Docker Puppeteer Test Script
# This script tests if the Docker container can generate screenshots properly

echo "🐾 Testing GAG Pets Docker Screenshot API..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t gagpets-test . || {
    echo "❌ Docker build failed!"
    exit 1
}

echo "✅ Docker build successful!"

# Run the container in background
echo "🚀 Starting container..."
docker run -d -p 8029:8029 --name gagpets-test-container gagpets-test || {
    echo "❌ Container start failed!"
    exit 1
}

# Wait for the server to start
echo "⏱️  Waiting for server to start..."
sleep 10

# Test health endpoint
echo "🔍 Testing health endpoint..."
if curl -f http://localhost:8029/health > /dev/null 2>&1; then
    echo "✅ Health check passed!"
else
    echo "❌ Health check failed!"
    docker logs gagpets-test-container
    docker stop gagpets-test-container
    docker rm gagpets-test-container
    exit 1
fi

# Test screenshot API
echo "📸 Testing screenshot API..."
if curl -f "http://localhost:8029/api/pets/trex/screenshot?weight=50&age=25" -o docker_test_screenshot.png > /dev/null 2>&1; then
    echo "✅ Screenshot API works!"
    echo "📁 Screenshot saved as: docker_test_screenshot.png"
    ls -la docker_test_screenshot.png
else
    echo "❌ Screenshot API failed!"
    docker logs gagpets-test-container
fi

# Cleanup
echo "🧹 Cleaning up..."
docker stop gagpets-test-container > /dev/null 2>&1
docker rm gagpets-test-container > /dev/null 2>&1

echo "🎉 Docker test complete!"