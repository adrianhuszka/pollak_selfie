# Build stage
FROM node:lts-alpine3.20 AS build

WORKDIR /app

COPY package*.json . 

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:lts-alpine3.20 AS production

WORKDIR /app

COPY package*.json . 

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

# Create static/images folder
RUN mkdir -p /app/static/images

CMD ["node", "dist/app.js"]