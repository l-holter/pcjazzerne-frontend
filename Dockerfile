# Use the official Node.js image as the base image
FROM node:20

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port your app will run on
EXPOSE 3030

# Command to run your application
CMD ["npm", "start"]
