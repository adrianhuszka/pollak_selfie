# Build stage
FROM node:lts-alpine3.20 AS build

RUN apt-get update && apt-get install -y libc6

WORKDIR /

COPY package*.json . 

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:lts-alpine3.20 AS production

WORKDIR /

COPY package*.json . 

RUN npm ci --only=production

COPY --from=build /dist ./dist

# Create static/images folder
RUN mkdir -p /static/images

CMD ["node", "dist/app.js"]