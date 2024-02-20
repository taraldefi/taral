# Use an official Node.js runtime as the base image

FROM node:20.5.1 as build

#
#
# copy just the ui lib & build it & install it in the frontend app.
#
COPY ./libs/ui /libs/ui


COPY package.json /usr/package.json
COPY tsconfig.json /usr/tsconfig.json
COPY yarn.lock /usr/yarn.lock

RUN yarn

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./apps/frontend/package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code to the container
COPY ./apps/frontend .

# Build the React app
RUN yarn build

RUN yarn reinstall-ui-lib

# # expose any ports
# EXPOSE 4200

# Stage 2: Serve app with Nginx
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/frontend.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]