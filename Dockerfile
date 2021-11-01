FROM node:16.13.0

WORKDIR /app/pogo-coding-challenge

EXPOSE 8080 3000

CMD [ "npm","run", "dev" ]