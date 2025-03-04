# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json (if available) first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev  # 🛠 Avoid installing devDependencies in production

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5050

# Start the application
CMD ["node", "server.js"]
