# Use an official Nginx image as the base image
FROM nginx:latest

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80 for Nginx
EXPOSE 80