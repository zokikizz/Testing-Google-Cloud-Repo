FROM node:12.7-alpine AS build
WORKDIR /app
# COPY package.json ./
# RUN npm install
COPY . .
# RUN npm run build --prod
RUN npm ci && npm run build
###Stage 2: Run ###
FROM nginx:1.17.1-alpine AS prod-stage
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx","-g","daemon off;"]