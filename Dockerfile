FROM node:11.15.0-alpine AS builder
COPY . ./backend-papros
WORKDIR /backend-papros
RUN npm i
RUN $(npm bin)/tsc

FROM nginx:1.15.8-alpine
COPY nginx.conf /etc/nginx/nginx.conf

FROM nginx:1.15.8-alpine
COPY --from=builder /backend-papros/build/ /usr/share/nginx/html
