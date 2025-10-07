# Docker Puppeteer Setup for Screenshot API

## Overview

The GAG Pets application includes a screenshot API that uses Puppeteer to generate pet card images. When running in Docker, additional setup is required to install Chrome and its dependencies.

## Changes Made to Dockerfile

### 1. Chrome Dependencies Installation
```dockerfile
# Install Chrome dependencies
RUN apt-get update && apt-get install -y \
    wget gnupg ca-certificates procps libxss1 libgconf-2-4 \
    libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 \
    libcairo-gobject2 libgtk-3-0 libgdk-pixbuf2.0-0 \
    libxcomposite1 libxcursor1 libxdamage1 libxext6 \
    libxfixes3 libxi6 libxinerama1 libxrender1 libxtst6 \
    libnss3 libnspr4 libatk-bridge2.0-0 libdrm2 libgbm1 \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*
```

### 2. Puppeteer Chrome Installation
```dockerfile
# Install Puppeteer browsers as root, then fix permissions
RUN npx puppeteer browsers install chrome && \
    chown -R appuser:appuser /root/.cache/puppeteer || true && \
    mkdir -p /home/appuser/.cache/puppeteer && \
    cp -r /root/.cache/puppeteer/* /home/appuser/.cache/puppeteer/ 2>/dev/null || true && \
    chown -R appuser:appuser /home/appuser/.cache
```

### 3. Environment Configuration
```dockerfile
# Set Puppeteer cache path for non-root user
ENV PUPPETEER_CACHE_DIR=/home/appuser/.cache/puppeteer
```

## Error Resolution

### Before Fix
```json
{
  "error": "Screenshot generation failed",
  "message": "Could not find Chrome (ver. 140.0.7339.82). This can occur if either\n 1. you did not perform an installation before running the script (e.g. `npx puppeteer browsers install chrome`) or\n 2. your cache path is incorrectly configured (which is: /root/.cache/puppeteer)."
}
```

### After Fix
- ✅ Chrome is installed during Docker build
- ✅ Chrome binaries are accessible to non-root user
- ✅ Puppeteer cache is properly configured
- ✅ Screenshot API works in Docker container

## Building and Running

### Development
```bash
# Build the image
docker build -t gagpets .

# Run the container
docker run -p 8029:8029 gagpets
```

### Production
```bash
# Using docker-compose
docker-compose up

# Or production compose
docker-compose -f docker-compose.prod.yml up
```

## Testing the Screenshot API

Once the container is running:

```bash
# Test basic screenshot
curl http://localhost:8029/api/pets/trex/screenshot -o test_screenshot.png

# Test with parameters
curl "http://localhost:8029/api/pets/griffin/screenshot?weight=75&mutation=rainbow" -o griffin.png
```

## Security Considerations

- Chrome runs in sandbox mode within the container
- Non-root user (`appuser`) is used for the application
- Chrome dependencies are kept minimal
- Proper file permissions are maintained

## Troubleshooting

### If you still get Chrome errors:
1. Ensure Docker has enough memory (recommend 2GB+)
2. Check if the container has access to `/dev/shm` for Chrome
3. Verify the Puppeteer cache directory permissions
4. Check container logs for detailed error messages

### Manual Chrome installation check:
```bash
# Enter the container
docker exec -it <container_id> bash

# Check if Chrome is installed
ls -la /home/appuser/.cache/puppeteer/

# Test Chrome directly
node -e "const puppeteer = require('puppeteer'); puppeteer.launch().then(browser => { console.log('Chrome works!'); browser.close(); });"
```

## Performance Notes

- Chrome installation adds ~200MB to the Docker image
- Screenshot generation requires ~100-300MB memory per request
- Consider using Docker's `--shm-size` flag for better performance
- Chrome processes are automatically cleaned up after each screenshot

---

🎉 **The Docker container now fully supports the screenshot API with Chrome and Puppeteer!**