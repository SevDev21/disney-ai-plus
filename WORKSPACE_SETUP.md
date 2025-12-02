# Workspace Setup Guide

This repository uses Conductor workspaces for parallel development. Environment variables and project rules are automatically shared across all workspaces.

## How It Works

When you create a new Conductor workspace, files are automatically set up using **symlinks**:

- **`.env.local`** → Symlinked to main repo (all workspaces share the same environment)
- **`.clinerules`** → Copied to workspace (project rules for AI assistants)

### Benefits of Symlinks

✅ **No manual copying** - Environment variables automatically available in all workspaces  
✅ **Single source of truth** - Update `.env.local` once, all workspaces get the changes  
✅ **Zero maintenance** - No need to sync credentials across workspaces  

## Automatic Setup

### Option 1: Git Hook (Automatic) ⭐ Recommended

The repository has a `post-checkout` git hook that runs automatically when Conductor creates a worktree. It will:
1. Copy `.clinerules` from main repo
2. Create symlink for `.env.local`

**No action needed!** Just create a workspace and the files will be ready.

### Option 2: Manual Script

If the git hook doesn't run, execute the setup script manually:

```bash
# From main repo
./setup-workspace.sh /path/to/workspace

# Or from within the workspace
/Users/salilmonga/CSUN/disney-ai-plus/setup-workspace.sh $(pwd)
```

## Initial Setup (One Time Only)

### 1. Create `.env.local` in Main Repo

If you haven't already, create `.env.local` in the main repository:

```bash
cd /Users/salilmonga/CSUN/disney-ai-plus/disney-ai-plus-app
cp .env.example .env.local
```

Then edit `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
```

**This only needs to be done once!** All current and future workspaces will automatically use this file via symlink.

### 2. Add `.clinerules` to Main Repo

```bash
cd /Users/salilmonga/CSUN/disney-ai-plus
# Create or update .clinerules with project rules
git add .clinerules
git commit -m "Add project rules for AI assistants"
git push
```

## Files Explained

### `.env.local` (Symlinked)
Contains environment variables for the app:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

**Location:** Main repo at `disney-ai-plus-app/.env.local`  
**In Workspaces:** Symlink points to main repo  
**Git Status:** Ignored (listed in `.gitignore`)

### `.clinerules` (Copied)
Project-specific rules for AI assistants:
- Database schema (profiles, videos tables)
- Authentication setup
- Code conventions and patterns
- AI preferences (Context7, Playwright, CodeRabbit)
- Development workflow

**Location:** Main repo at `.clinerules`  
**In Workspaces:** Copy of main repo version  
**Git Status:** Committed to repository

### `.env.example` (Template)
Template with placeholder values, committed to git:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Verifying Setup

Check if symlink was created correctly:

```bash
ls -la disney-ai-plus-app/.env.local
```

You should see output like:
```
lrwxr-xr-x  .env.local -> /Users/salilmonga/CSUN/disney-ai-plus/disney-ai-plus-app/.env.local
```

The `->` indicates it's a symlink pointing to the main repo.

## Troubleshooting

### Symlink not created automatically

**Solution:** Run the setup script manually:
```bash
/Users/salilmonga/CSUN/disney-ai-plus/setup-workspace.sh $(pwd)
```

### Git hook not running

**Check if executable:**
```bash
ls -l /Users/salilmonga/CSUN/disney-ai-plus/.git/hooks/post-checkout
```

**Make executable:**
```bash
chmod +x /Users/salilmonga/CSUN/disney-ai-plus/.git/hooks/post-checkout
```

### .env.local not found in main repo

**Create it:**
```bash
cd /Users/salilmonga/CSUN/disney-ai-plus/disney-ai-plus-app
cp .env.example .env.local
# Edit .env.local with your actual credentials
```

### Want to use different .env per workspace?

If you need workspace-specific environment variables:
1. Delete the symlink: `rm disney-ai-plus-app/.env.local`
2. Copy from main repo: `cp /Users/salilmonga/CSUN/disney-ai-plus/disney-ai-plus-app/.env.local .`
3. Modify as needed for this workspace

## Best Practices

✅ **Keep `.env.local` in main repo only** - Never commit it to git  
✅ **Update `.env.example`** when adding new environment variables  
✅ **Run setup script** if automatic setup doesn't work  
✅ **Share Supabase credentials** across all workspaces (they use the same database)  

## Architecture

```
Main Repo
├── .clinerules (committed)
├── .env.local (git-ignored, shared via symlink)
└── disney-ai-plus-app/
    └── .env.example (committed)

Workspace 1 (.conductor/amsterdam/)
├── .clinerules (copied)
└── disney-ai-plus-app/
    └── .env.local → symlink to main repo

Workspace 2 (.conductor/guatemala/)
├── .clinerules (copied)
└── disney-ai-plus-app/
    └── .env.local → symlink to main repo
```

All workspaces share the same environment variables through symlinks! 🔗
