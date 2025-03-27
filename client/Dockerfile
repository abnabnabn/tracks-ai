# Stage 1: Build Dependencies (Base)
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Stage 2: Install Dev Dependencies
FROM base AS dependencies
RUN npm install

# Stage 3: Build for Production (if needed separately)
FROM dependencies AS build
COPY . .
RUN npm run build

# Stage 4: Production Runtime (Nginx)
FROM nginx:stable-alpine AS production
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# Nginx listens on 80 by default, EXPOSE 80 is implicit or can be stated
CMD ["nginx", "-g", "daemon off;"]

# Stage 5: Development Runtime (Vite Dev Server) - THIS IS WHAT WE WANT
FROM dependencies AS development
# Copy all source code (needed for Vite dev server)
COPY . .
# Vite listens on 3000 by default
EXPOSE 3000
# Run the Vite dev server, --host makes it listen on all interfaces
CMD ["npm", "run", "dev", "--", "--host"]

# --- IMPORTANT: Ensure this is the final stage if not using 'target' in compose ---
# (Alternatively, use 'target: development' in docker-compose.yml build section)
# Let's rely on targeting in compose for clarity.