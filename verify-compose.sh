#!/bin/bash

# Docker Compose Verification Script
# This script verifies that your Dockerfile and compose.yaml work together properly

echo "🔍 Verifying Docker Compose setup for GAG Pets..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"

# Validate compose configuration
echo "📋 Validating Docker Compose configuration..."
if docker compose config > /dev/null 2>&1; then
    echo "✅ Docker Compose configuration is valid"
else
    echo "❌ Docker Compose configuration has errors"
    docker compose config
    exit 1
fi

# Build the image
echo "🏗️  Building Docker image..."
if docker compose build; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Docker image build failed"
    exit 1
fi

# Start the service
echo "🚀 Starting services..."
docker compose up -d

# Wait for service to be ready
echo "⏳ Waiting for service to start..."
sleep 15

# Test health endpoint
echo "🔍 Testing health endpoint..."
if curl -f http://localhost:8029/health > /dev/null 2>&1; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    echo "📋 Container logs:"
    docker compose logs
    docker compose down
    exit 1
fi

# Test screenshot API
echo "📸 Testing screenshot API..."
if curl -f "http://localhost:8029/api/pets/trex/screenshot" -o compose_test_screenshot.png > /dev/null 2>&1; then
    echo "✅ Screenshot API works!"
    echo "📁 Screenshot saved as: compose_test_screenshot.png"
    ls -la compose_test_screenshot.png
else
    echo "❌ Screenshot API failed"
    echo "📋 Container logs:"
    docker compose logs
fi

# Clean up
echo "🧹 Cleaning up..."
docker compose down

echo "🎉 Docker Compose verification complete!"