# Stage 1: Build the frontend application
FROM node:lts-alpine AS builder
WORKDIR /app
COPY landing-page/package*.json ./
RUN npm install
COPY landing-page/ .
RUN npm run build

# Stage 2: Serve the built static files using Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY landing-page/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
