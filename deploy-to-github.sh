#!/bin/bash

echo "=========================================="
echo "Ezmedtech Training Hub - GitHub Deployment"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository. Please run from the training-hub directory."
    exit 1
fi

# Get GitHub username
echo "Enter your GitHub username:"
read github_username

if [ -z "$github_username" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

# Get repository name (default: training-hub)
echo ""
echo "Enter repository name (press Enter for default 'training-hub'):"
read repo_name
repo_name=${repo_name:-training-hub}

echo ""
echo "📋 Configuration:"
echo "   GitHub Username: $github_username"
echo "   Repository Name: $repo_name"
echo "   Your site will be at: https://$github_username.github.io/$repo_name/"
echo ""
echo "⚠️  Make sure you've created the repository on GitHub first!"
echo "   Go to: https://github.com/new"
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

# Add remote
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/$repo_name.git"

# Push to GitHub
echo "📤 Pushing code to GitHub..."
echo "You may be prompted for your GitHub credentials or token."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Code pushed to GitHub."
    echo ""
    echo "📝 Next steps:"
    echo "1. Go to: https://github.com/$github_username/$repo_name/settings/pages"
    echo "2. Under 'Build and deployment', set Source to: GitHub Actions"
    echo "3. Go to: https://github.com/$github_username/$repo_name/actions"
    echo "4. Click 'Deploy to GitHub Pages' and then 'Run workflow'"
    echo "5. Wait 2-3 minutes for deployment to complete"
    echo "6. Visit: https://$github_username.github.io/$repo_name/"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to push to GitHub."
    echo "Please check your credentials and try again."
    echo ""
    echo "Alternative: Use a personal access token"
    echo "1. Create token at: https://github.com/settings/tokens"
    echo "2. Run: git push https://YOUR_TOKEN@github.com/$github_username/$repo_name.git main"
    exit 1
fi
