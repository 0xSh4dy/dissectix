FROM node:18
WORKDIR /web
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 4173
RUN useradd dissectix
CMD ["npm","run","preview"]