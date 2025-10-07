# Use Node.js 22 LTS
FROM node:22-slim

# Install Chrome dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libgconf-2-4 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcairo-gobject2 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxinerama1 \
    libxrandr2 \
    libxrender1 \
    libxtst6 \
    libnss3 \
    libnspr4 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libgtk-3-0 \
    libgbm1 \
    libasound2 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Install Puppeteer browsers before creating non-root user
RUN npx puppeteer browsers install chrome

# Create non-root user and setup permissions
RUN groupadd -g 1001 appuser && \
    useradd -r -u 1001 -g appuser -m appuser && \
    mkdir -p /home/appuser/.cache/puppeteer && \
    cp -r /root/.cache/puppeteer/* /home/appuser/.cache/puppeteer/ 2>/dev/null || true && \
    chown -R appuser:appuser /home/appuser/.cache

# Copy application code
COPY . .

# Change ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Set Puppeteer cache path for non-root user
ENV PUPPETEER_CACHE_DIR=/home/appuser/.cache/puppeteer

# Expose port
EXPOSE 8029

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); const options = {hostname: 'localhost', port: 8029, path: '/health', timeout: 2000}; const req = http.request(options, (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); }); req.on('error', () => process.exit(1)); req.end();"

# Start the application
CMD ["npm", "start"]
