FROM nginx:alpine
MAINTAINER scr-sdd@stockxbid.com
ENV REACT_APP_BASE_URL='https://preprod-shopizer-ecom.outxtock.com/api/v1'

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
ADD build/ /usr/share/nginx/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 8080
