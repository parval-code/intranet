# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the Docker image to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the Docker image
COPY package.json yarn.lock ./

# Install the dependencies in the Docker image
RUN yarn install --production --frozen-lockfile

# Copy the rest of the project files to the Docker image
COPY . .

# Build the Next.js application
RUN yarn build

# Set the environment variable for the port that the Next.js application will run on
ENV PORT=80

# Expose the port in the Docker image
EXPOSE 80

# Start the Next.js application when the Docker container starts
CMD ["yarn", "start"]
