# Stage 1: Build the React application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local src and public folders to the container
COPY ./src ./src
COPY ./public ./public

# Build the React app
RUN npm run build

# Stage 2: Serve the React application from Nginx server
FROM nginx:alpine

# Copy the build files from stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
