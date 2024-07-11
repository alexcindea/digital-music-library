# Use the official Node.js image
FROM node:16

# Create and change to the app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Copy wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD ["/wait-for-it.sh", "db:27017", "--", "sh", "-c", "npx ts-node src/scripts/importData.ts && sleep 5 && npx ts-node src/index.ts"]
