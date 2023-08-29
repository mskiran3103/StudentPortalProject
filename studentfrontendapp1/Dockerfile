FROM ubuntu:latest
RUN apt-get update && apt-get install -y unzip
RUN apt-get install nodejs -y && apt-get install npm -y
WORKDIR /app
COPY com/ui/test/smfrontui.zip /app/smfrontui.zip
RUN ls -l /app
WORKDIR /app
RUN unzip smfrontui.zip
WORKDIR /app
RUN pwd
RUN ls -l /app/studentfrontendapp1
RUN cp -r /app/studentfrontendapp1/package*.json /app/
RUN npm install
RUN npm run build
EXPOSE $PORT
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=$PORT
ENV PROXY_API=$PROXY_API
ENV PROXY_LOGIN=$PROXY_LOGIN
CMD [ "npm", "start" ]
