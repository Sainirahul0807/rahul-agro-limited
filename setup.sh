#!/bin/bash

# Rahul Agro Limited - Complete Setup Script
set -e

echo "🚀 Starting Rahul Agro Limited setup..."
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies with pnpm..."
pnpm install
echo "✅ Dependencies installed!"
echo ""

# Step 2: Run type checking
echo "🔍 Running type checks..."
pnpm run typecheck
echo "✅ Type checks passed!"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Available commands:"
echo "  pnpm run dev          - Start frontend dev server"
echo "  pnpm run build        - Build the project"
echo "  pnpm run serve        - Serve built project"
echo "  pnpm run typecheck    - Run type checking"
echo ""
echo "To start developing, run:"
echo "  pnpm --filter @workspace/rahul-agro run dev"
