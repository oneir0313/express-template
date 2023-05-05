FROM node:18.12.1-alpine3.17

COPY ./app /app
WORKDIR /app

RUN apk add --no-cache tzdata \
  && apk --no-cache add curl \
  && npm ci --production 

# default to port 9200 for node, and 9229 for debug
ARG PORT=9200
EXPOSE ${PORT} 9229

HEALTHCHECK --interval=30s \
  CMD curl --fail http://localhost:${PORT}/api/health || exit 1

CMD ["npm","start"]
