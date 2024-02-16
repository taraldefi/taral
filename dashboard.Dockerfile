# Use an official Node.js runtime as the base image

FROM node:19.6.0-alpine as build
# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./apps/frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./apps/frontend .

# Build the React app
RUN npm run build

# # expose any ports
# EXPOSE 4200

# Stage 2: Serve app with Nginx
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/frontend.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]