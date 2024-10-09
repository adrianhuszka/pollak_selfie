# Build stage
FROM node:22 AS build

RUN apt-get update && apt-get install -y libc6

WORKDIR .

COPY package*.json . 

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:22 AS production

WORKDIR .

COPY package*.json . 

RUN npm ci --only=production

COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/prisma /app/prisma
COPY --from=build /dist ./dist

# Create static/images folder
RUN mkdir -p /static/images

CMD ["node", "dist/app.js"]