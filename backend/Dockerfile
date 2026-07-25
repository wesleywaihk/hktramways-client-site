FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY shared-resources ./shared-resources
COPY backend ./backend
RUN npm install
WORKDIR /app/backend
RUN NODE_OPTIONS=--max-old-space-size=2048 npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/package.json ./
EXPOSE 1337
CMD ["npm", "start"]
