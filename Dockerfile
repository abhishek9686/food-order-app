
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM  node:14 as build-stage

WORKDIR /app

COPY ./nginx.conf /nginx.conf

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

RUN apt-get update && apt-get install -y curl && apt-get clean

COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf