# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the API
RUN npm run build:api

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built API from builder
COPY --from=builder /app/dist-api ./dist-api

# Expose the port
EXPOSE 8010

# Set environment variable
ENV PORT=8010
ENV NODE_ENV=production

# Start the API server
CMD ["node", "dist-api/main.cjs"]
