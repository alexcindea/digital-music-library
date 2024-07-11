# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Install a simple HTTP server to serve static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "build"]
