# GitHub Pages Deployment Guide

This guide will walk you through deploying the Ezmedtech Training Hub to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer (or use GitHub Desktop)
- The training hub code (already prepared in this directory)

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `training-hub` (or your preferred name)
   - **Description**: "Ezmedtech Sales Team Training Hub"
   - **Visibility**: Choose **Private** (recommended for internal training) or **Public**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /home/ubuntu/training-hub

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/training-hub.git

# Push the code
git push -u origin main
```

**Alternative: If you prefer using a personal access token:**

```bash
# Create a personal access token at: https://github.com/settings/tokens
# Select scopes: repo (full control)

# Push with token
git push https://YOUR_TOKEN@github.com/YOUR_USERNAME/training-hub.git main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. In the left sidebar, click **"Pages"**
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
5. The page will show "GitHub Pages is currently disabled" - this is normal, it will activate after the first deployment

### Step 4: Trigger Deployment

The GitHub Actions workflow is already configured and will run automatically when you push code.

**To trigger the first deployment:**

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to watch the progress
4. Wait for both "build" and "deploy" jobs to complete (usually 2-3 minutes)

**If you don't see a workflow run:**

1. Go to **"Actions"** tab
2. Click **"Deploy to GitHub Pages"** in the left sidebar
3. Click **"Run workflow"** button
4. Select **"main"** branch
5. Click **"Run workflow"**

### Step 5: Access Your Deployed Site

Once deployment is complete:

1. Go to **"Settings"** → **"Pages"**
2. You'll see a message: **"Your site is live at https://YOUR_USERNAME.github.io/training-hub/"**
3. Click the link to view your training hub!

## Repository URL Format

Your training hub will be accessible at:

**Format**: `https://YOUR_USERNAME.github.io/training-hub/`

**Examples**:
- If your username is `ezmedtech`: https://ezmedtech.github.io/training-hub/
- If your username is `john-smith`: https://john-smith.github.io/training-hub/

## Updating the Training Hub

To update content in the future:

1. Make changes to the code locally
2. Commit changes:
   ```bash
   git add -A
   git commit -m "Update training content"
   git push origin main
   ```
3. GitHub Actions will automatically rebuild and redeploy (takes 2-3 minutes)

## Custom Domain (Optional)

If you want to use a custom domain like `training.ezmedtech.ai`:

1. Go to **"Settings"** → **"Pages"**
2. Under **"Custom domain"**, enter your domain: `training.ezmedtech.ai`
3. Click **"Save"**
4. Add DNS records at your domain provider:

**For subdomain (training.ezmedtech.ai):**
```
Type: CNAME
Name: training
Value: YOUR_USERNAME.github.io
```

**For apex domain (ezmedtech.ai):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

5. Wait for DNS propagation (can take up to 24 hours)
6. Check **"Enforce HTTPS"** once DNS is verified

## Troubleshooting

### Issue: "404 - Page not found" after deployment

**Solution**: 
- Wait 5-10 minutes for GitHub Pages to fully activate
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that the workflow completed successfully in Actions tab

### Issue: Styles not loading

**Solution**:
- This is usually fixed by the `base` configuration in `vite.config.ts`
- Verify the base path matches your repository name
- Clear browser cache

### Issue: Workflow fails with "permission denied"

**Solution**:
1. Go to **"Settings"** → **"Actions"** → **"General"**
2. Scroll to **"Workflow permissions"**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **"Save"**
6. Re-run the workflow

### Issue: Images not displaying

**Solution**:
- Check that images are in `public/images/` folder
- Verify image paths in `App.tsx` are correct
- Rebuild and redeploy

## GitHub Actions Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) does the following:

1. **Checkout code** - Gets the latest code from the repository
2. **Setup Node.js** - Installs Node.js 18
3. **Setup pnpm** - Installs pnpm package manager
4. **Install dependencies** - Runs `pnpm install`
5. **Build** - Runs `pnpm run build` with GitHub Pages environment variable
6. **Deploy** - Uploads the built files to GitHub Pages

The workflow runs automatically on:
- Every push to the `main` branch
- Manual trigger via "Run workflow" button

## Security Considerations

### For Private Repositories:
- Training hub is only accessible to people with repository access
- Manage access via **"Settings"** → **"Collaborators"**

### For Public Repositories:
- Training hub is accessible to anyone on the internet
- Consider if your training materials should be public
- Remove any sensitive information before making public

## Cost

GitHub Pages is **completely free** for:
- Public repositories (unlimited)
- Private repositories (with GitHub Free, Pro, Team, or Enterprise)

**Limits:**
- 1 GB repository size limit
- 100 GB bandwidth per month
- 10 builds per hour

The training hub is well within these limits (~5 MB total size).

## Alternative: Deploy from Local Computer

If you prefer to deploy from your local computer instead of the sandbox:

1. Download the training hub:
   ```bash
   # Download the tar.gz file provided earlier
   tar -xzf training-hub-v1.0.tar.gz
   cd training-hub
   ```

2. Follow the same steps above, but run git commands from your local terminal

## Support

For GitHub-specific issues:
- GitHub Pages Documentation: https://docs.github.com/pages
- GitHub Actions Documentation: https://docs.github.com/actions
- GitHub Support: https://support.github.com

For training hub issues:
- Check the README.md file
- Review the DEPLOYMENT.md file
- Contact your IT team

## Next Steps After Deployment

1. ✅ Share the URL with your sales team
2. ✅ Bookmark the URL for easy access
3. ✅ Test all features (search, navigation, print)
4. ✅ Add the URL to your internal documentation
5. ✅ Consider setting up a custom domain for easier access

---

**Your training hub will be live at:**
`https://YOUR_USERNAME.github.io/training-hub/`

(Replace YOUR_USERNAME with your actual GitHub username)
