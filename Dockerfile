FROM node:8-alpine
LABEL maintainer="Ocean Protocol <devops@oceanprotocol.com>"

RUN apk add --no-cache --update git python krb5 krb5-libs gcc make g++ krb5-dev bash

COPY . pleuston
WORKDIR /pleuston

RUN npm install -g npm serve
RUN npm install
RUN chmod +x ./scripts/docker-entrypoint.sh

ENTRYPOINT ["./scripts/docker-entrypoint.sh"]

# Expose listen port
EXPOSE 3000