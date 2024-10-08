# Build stage
FROM node:lts-alpine3.20 AS build

WORKDIR .

COPY package*.json . 

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:lts-alpine3.20 AS production

WORKDIR .

COPY package*.json . 

RUN npm ci --only=production

COPY --from=build /dist ./dist

CMD ["node", "dist/app.js"]