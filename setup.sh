#!/bin/bash
set -e

echo "🚀 Setting up react-native-flex-ads..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the library
echo "🔨 Building library..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm test

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update package.json with your package name and author"
echo "  2. cd example && npm install && npx expo start"
echo "  3. npm login && npm publish --access public"
