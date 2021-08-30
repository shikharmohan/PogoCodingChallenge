FROM node:latest

WORKDIR /app/pogo-coding-challenge

EXPOSE 8080

CMD [ "npm","run", "dev" ]