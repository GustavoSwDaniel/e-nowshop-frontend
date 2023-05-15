#Base image
FROM node:14-alpine as build-stage

#Install serve package
RUN npm i -g serve

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# install project dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the project
RUN npm run build

# Expose a port
EXPOSE 3000

# Executables
CMD [ "serve", "-s", "dist" ]