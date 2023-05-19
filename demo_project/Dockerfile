FROM node:20-alpine3.17

RUN mkdir -p /home/app

COPY ./app /home/app

RUN cd /home/app/
RUN npm install --production

CMD ["node", "/home/app/server.js"]
