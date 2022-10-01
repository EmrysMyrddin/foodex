FROM nginx:stable-alpine

RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx"]

COPY build /usr/src/app
