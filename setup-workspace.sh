#!/bin/bash
# Workspace setup script for Disney AI Plus

WORKSPACE_DIR="$1"
MAIN_REPO_DIR="$(dirname "$0")"

if [ -z "$WORKSPACE_DIR" ]; then
    WORKSPACE_DIR="$(pwd)"
fi

echo "🚀 Setting up Disney AI Plus workspace..."

# Copy .clinerules if it exists
if [ -f "$MAIN_REPO_DIR/.clinerules" ]; then
    echo "📋 Copying .clinerules..."
    cp "$MAIN_REPO_DIR/.clinerules" "$WORKSPACE_DIR/.clinerules"
else
    echo "⚠️  .clinerules not found in main repo"
fi

# Create symlink for .env.local (best approach - shares the same file)
if [ -f "$MAIN_REPO_DIR/disney-ai-plus-app/.env.local" ]; then
    echo "🔗 Creating symlink for .env.local..."
    mkdir -p "$WORKSPACE_DIR/disney-ai-plus-app"
    ln -sf "$MAIN_REPO_DIR/disney-ai-plus-app/.env.local" "$WORKSPACE_DIR/disney-ai-plus-app/.env.local"
    echo "✅ .env.local symlinked (all workspaces share the same environment)"
elif [ -f "$WORKSPACE_DIR/disney-ai-plus-app/.env.example" ]; then
    echo "⚠️  .env.local not found in main repo"
    echo "💡 Please create .env.local in the main repo:"
    echo "   cp $MAIN_REPO_DIR/disney-ai-plus-app/.env.example $MAIN_REPO_DIR/disney-ai-plus-app/.env.local"
    echo "   Then add your Supabase credentials"
fi

echo "✅ Workspace setup complete!"
