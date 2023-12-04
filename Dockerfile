# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy application code into the container
COPY . .

# Install application dependencies
RUN npm install

# Build TypeScript code
RUN npm run build

# Expose a port (optional) if your Node.js application listens on a specific port
EXPOSE 3001

# Define the command to run your compiled JavaScript script
CMD ["npm", "start"]
