# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install only production dependencies (no devDependencies)
RUN npm ci --only=production  

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5050

# Run the application
CMD ["node", "server.js"]
