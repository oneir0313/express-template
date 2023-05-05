FROM node:18.12.1-alpine3.17

COPY ./app /app
WORKDIR /app

RUN apk add --no-cache tzdata \
  && apk --no-cache add curl \
  && npm ci --production 
EXPOSE 9200 9229
CMD ["npm","start"]
