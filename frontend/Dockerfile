# ===== node builder =====
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install --immutable

COPY . ./
RUN yarn build --configuration production

# ===== nginx runtime =====
FROM nginx:alpine AS runtime
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/app.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

