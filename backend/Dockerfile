FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
