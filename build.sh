#!/bin/bash

# Vercel Deployment Script for warung-madura
echo "🚀 Starting Vercel deployment for warung-madura..."

# Ensure we're in the right directory
cd /vercel/source0

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building the project..."
npm run build

# Verify that images are in build directory
echo "🖼️  Verifying images in build directory..."
ls -la build/img/

echo "✅ Build completed successfully!"
