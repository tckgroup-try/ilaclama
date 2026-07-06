FROM node:20-alpine

WORKDIR /app

# Install system dependencies needed for Node packages (if any)
RUN apk add --no-cache libc6-compat

# Copy package configurations
COPY package.json package-lock.json ./

# Install packages
RUN npm ci

# Copy all files
COPY . .

# Set environment variables for build time
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run build scripts (Prisma generation, geo maps generation, and next build)
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npx", "next", "start", "-p", "3000"]
