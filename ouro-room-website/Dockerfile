# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the development server port (change if you're not using 5173 for Vite or 3000 for CRA)
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]