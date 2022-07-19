# see base.dockerfile
FROM datamall-frontend-base:1.0 as react_build

# RUN npm install --silent
# RUN npm install react-scripts@3.0.1 -g --silent

COPY package.json /home/ddp/front/package.json
WORKDIR /home/ddp/front

RUN npm install --legacy-peer-deps
COPY . /home/ddp/front
RUN yarn build

FROM nginx:1.21.6-alpine
COPY --from=react_build /home/ddp/front/dist /usr/share/nginx/html
WORKDIR /home/ddp
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8080
CMD ["nginx","-g","daemon off;"]


# FROM nginx:1.19.4-alpine

# USER root
# RUN id -u datamarket 2> /dev/null || useradd --system --create-home --uid 1001 --gid 0 datamarket
# WORKDIR /home/datamarket
# RUN npm install serve -g
# RUN yarn global add serve

# COPY 
# COPY gpn/build /home/datamarket/build

# RUN ["chmod", "-R", "u=rX,g=rX", "/home/datamarket/build"]

# USER 1001
# EXPOSE 8080
# serve -s build -l 8080
# CMD ["serve", "-s", "build", "-l", "8080"]

# docker build -t nginx:test . - создать образ (после -t имя)
# docker run -d --name <имя> -p 3005:8080 nginx:test

# docker container list --all

# docker exec -it <имя_контейнера> /bin/bash - запустить косольку
# docker container logs <имя> 

# docker container stop <имя> 
# docker container start <имя>

# переменное окружение