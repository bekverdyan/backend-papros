FROM node:latest
MAINTAINER bekverdyan (aram.bekverdyan@gmail.com)
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm","run", "prod"]
