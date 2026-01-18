# Deployment Guide - Ezmedtech Training Hub

This guide explains how to deploy the Ezmedtech Sales Team Training Hub to various hosting platforms.

## Quick Start

The training hub is a static website that can be deployed to any static hosting service. No server-side code or database required!

## Build for Production

```bash
cd training-hub
pnpm install
pnpm run build
```

This creates a `dist/` folder with optimized production files.

## Deployment Options

### Option 1: Netlify (Recommended)

**Easiest deployment with automatic HTTPS and global CDN**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
cd training-hub
pnpm run build
netlify deploy --prod --dir=dist
```

3. Follow the prompts to create a new site or link to existing one

**Or use Netlify UI:**
1. Go to https://app.netlify.com
2. Drag and drop the `dist/` folder
3. Done! Your site is live

**Custom Domain:**
- Go to Site Settings → Domain Management
- Add your custom domain (e.g., training.ezmedtech.ai)
- Update DNS records as instructed

### Option 2: Vercel

**Great for teams already using Vercel**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd training-hub
pnpm run build
vercel --prod
```

**Or use Vercel UI:**
1. Go to https://vercel.com
2. Import the project from Git or upload `dist/`
3. Configure build settings:
   - Build Command: `pnpm run build`
   - Output Directory: `dist`

### Option 3: GitHub Pages

**Free hosting for public repositories**

1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/training-hub"
}
```

2. Install gh-pages:
```bash
pnpm add -D gh-pages
```

3. Add deploy script to `package.json`:
```json
{
  "scripts": {
    "deploy": "pnpm run build && gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
pnpm run deploy
```

### Option 4: AWS S3 + CloudFront

**Enterprise-grade hosting with AWS infrastructure**

1. Create S3 bucket:
```bash
aws s3 mb s3://training-ezmedtech
```

2. Enable static website hosting:
```bash
aws s3 website s3://training-ezmedtech --index-document index.html
```

3. Upload files:
```bash
cd training-hub
pnpm run build
aws s3 sync dist/ s3://training-ezmedtech --delete
```

4. Set up CloudFront distribution:
   - Origin: Your S3 bucket
   - Default Root Object: index.html
   - Enable HTTPS
   - Add custom domain (optional)

5. Update bucket policy for CloudFront access

### Option 5: Docker + Any Cloud

**For containerized deployments**

1. Create `Dockerfile` in project root:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Build and run:
```bash
docker build -t training-hub .
docker run -p 80:80 training-hub
```

3. Deploy to:
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

### Option 6: Internal Company Server

**For on-premise hosting**

1. Build the project:
```bash
pnpm run build
```

2. Copy `dist/` folder to your web server:
```bash
scp -r dist/* user@server:/var/www/training-hub/
```

3. Configure web server (Apache example):
```apache
<VirtualHost *:80>
    ServerName training.ezmedtech.internal
    DocumentRoot /var/www/training-hub
    
    <Directory /var/www/training-hub>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Enable SPA routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

4. Configure web server (Nginx example):
```nginx
server {
    listen 80;
    server_name training.ezmedtech.internal;
    root /var/www/training-hub;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test search functionality
- [ ] Check all screenshots display properly
- [ ] Test print functionality
- [ ] Verify responsive design on mobile
- [ ] Test sidebar navigation
- [ ] Confirm smooth scrolling works
- [ ] Check external link to ezmedtech.ai
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify HTTPS is enabled (if using custom domain)

## Performance Optimization

### Enable Compression

Most hosting platforms enable gzip/brotli automatically. If not:

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript
</IfModule>
```

### Enable Caching

Add cache headers for static assets:

**Nginx:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Apache:**
```apache
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

## Custom Domain Setup

### DNS Configuration

Add these DNS records to point your domain to the hosting service:

**For Netlify/Vercel:**
```
Type: CNAME
Name: training (or @)
Value: [provided by hosting service]
```

**For AWS CloudFront:**
```
Type: A (Alias)
Name: training
Value: [CloudFront distribution domain]
```

**For Custom Server:**
```
Type: A
Name: training
Value: [server IP address]
```

### SSL/HTTPS

Most modern hosting platforms provide free SSL certificates automatically:
- Netlify: Automatic via Let's Encrypt
- Vercel: Automatic
- GitHub Pages: Automatic for github.io domains
- AWS: Use AWS Certificate Manager
- Custom Server: Use Let's Encrypt with Certbot

## Monitoring

### Uptime Monitoring

Set up monitoring with:
- UptimeRobot (free)
- Pingdom
- StatusCake
- AWS CloudWatch (if using AWS)

### Analytics (Optional)

Add analytics to track usage:

1. Google Analytics:
```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. Plausible (privacy-friendly):
```html
<script defer data-domain="training.ezmedtech.ai" src="https://plausible.io/js/script.js"></script>
```

## Troubleshooting

### Issue: Blank page after deployment

**Solution:** Check browser console for errors. Usually caused by incorrect base path.

### Issue: Images not loading

**Solution:** Verify images are in `public/images/` folder before building.

### Issue: 404 on page refresh

**Solution:** Configure server for SPA routing (see server configs above).

### Issue: Styles not applying

**Solution:** Clear browser cache or do a hard refresh (Ctrl+Shift+R).

## Rollback Procedure

If you need to rollback to a previous version:

**Netlify/Vercel:**
- Go to Deployments tab
- Click "Publish" on a previous deployment

**AWS S3:**
- Enable versioning on S3 bucket
- Restore previous version from S3 console

**Custom Server:**
- Keep backup of previous `dist/` folder
- Replace current files with backup

## Support

For deployment issues:
- Check hosting provider documentation
- Review build logs for errors
- Verify all dependencies are installed
- Ensure Node.js version matches (18+)

---

**Last Updated:** January 18, 2026
