ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

WORKDIR /usr/src/app

# Build
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install
COPY --link . .

# Command to run the applicationd
CMD ["npm", "run", "dev"]