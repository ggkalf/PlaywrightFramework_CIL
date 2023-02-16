# # Get the base image of Node version 16
# FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.30.0-focal
 
# Set the work directory for the application
WORKDIR /cil-playwright

# Set the environment path to node_modules/.bin
ENV PATH /cil-playwright/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies in Node environment
RUN npm install

# COPY the needed files to the app folder in Docker image
COPY . ./

# # Get the needed libraries to run Playwright
# RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
