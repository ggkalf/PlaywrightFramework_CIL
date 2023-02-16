# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.30.0-focal
 
# Set the work directory for the application
WORKDIR /cil-playwright

# Set the environment path to node_modules/.bin
ENV PATH /cil-playwright/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies in Node environment
RUN apt-get update && npm install

# COPY the needed files to the app folder in Docker image
COPY . ./