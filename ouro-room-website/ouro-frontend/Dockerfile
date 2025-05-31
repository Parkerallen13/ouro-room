# Use an official lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install deps first (better cache usage)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Vite uses
EXPOSE 5173

# Run the dev server
CMD ["npm", "run", "dev"]