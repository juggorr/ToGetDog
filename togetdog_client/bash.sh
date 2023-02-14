CONTAINER_NAME=front-server

if [ $( docker ps -a | grep ${CONTAINER_NAME} | wc -l ) -gt 0 ]; then
  docker stop ${CONTAINER_NAME}
  docker rm ${CONTAINER_NAME}
fi

docker build -t front-server .
docker run -d --name ${CONTAINER_NAME} -p 3000:80 front-server
