# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# ---- Development Stage ----
FROM base AS development
# Expose the port the app runs on
EXPOSE 3001
# Command to run the app using ts-node-dev for hot reloading
CMD ["npm", "run", "dev"]


# ---- Production Stage ----
FROM base AS production
# Build TypeScript code
RUN npm run build
# Install only production dependencies
RUN npm prune --production
# Expose the port the app runs on
EXPOSE 3001
# Command to run the compiled application
CMD ["npm", "start"]

# Use the development stage by default if not specified during build
# Or choose 'production' via `docker build --target production ...`
FROM development