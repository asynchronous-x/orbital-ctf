# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (including dev dependencies)
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --production

# Copy built files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Ensure uploads and challenges directories exist
RUN mkdir -p public/uploads
RUN mkdir -p /challenges

# Copy other necessary files
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

# Create a non-root user and switch to it
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV CHALLENGES_DIR=/challenges
ENV INGEST_CHALLENGES_AT_STARTUP=false


# Initialize database and run the app
CMD npx prisma migrate deploy && \
    npx prisma db seed && \
    npm start
