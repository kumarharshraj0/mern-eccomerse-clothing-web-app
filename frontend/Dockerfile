# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
# Set VITE_API_BASE_URL to /api for production proxying
ENV VITE_API_BASE_URL=/api
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine

# Copy build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
