FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY shared-resources ./shared-resources
COPY frontend ./frontend
RUN npm install
WORKDIR /app/frontend
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_IMG_URL
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_IMG_URL=$NEXT_PUBLIC_IMG_URL
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=$NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
RUN NODE_OPTIONS=--max-old-space-size=2048 npm run build

FROM node:20-alpine
WORKDIR /app/frontend
COPY --from=build /app/frontend ./
COPY --from=build /app/node_modules ../node_modules
COPY --from=build /app/shared-resources ../shared-resources
EXPOSE 3000
CMD ["npm", "start"]
