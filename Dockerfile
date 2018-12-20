FROM node:10

RUN apt-get update && apt-get -y install ffmpeg
WORKDIR /ofunk
COPY . /ofunk
RUN npm install