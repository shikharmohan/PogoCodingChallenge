FROM node:latest

WORKDIR /app/pogo-coding-challenge

EXPOSE 3000

CMD [ "yarn","start-dev" ]