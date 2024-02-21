# Use an official Node.js runtime as the base image

FROM node:20.5.1 as build-target

#
#
# copy just the ui lib & build it & install it in the frontend app.
#
COPY ./libs/ui /libs/ui

COPY package.json /usr/package.json
COPY tsconfig.json /usr/tsconfig.json
COPY yarn.lock /usr/yarn.lock

RUN yarn


RUN cd ./libs/ui && yarn && yarn build && yarn install

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./apps/frontend ./

# Install dependencies
RUN yarn

# Build the React app
RUN yarn build


# # expose any ports
# EXPOSE 4200

# Stage 2: 

# Archive
FROM node:20.5.1 as archive-target
ENV NODE_ENV=production
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

# Include only the release build and production packages.
COPY --from=build-target /app/node_modules node_modules
COPY --from=build-target /app/.next .next

CMD ["next", "start"]