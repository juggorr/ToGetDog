CONTAINER_NAME=back-server

if [ $( docker ps -a | grep ${CONTAINER_NAME} | wc -l ) -gt 0 ]; then
  docker stop ${CONTAINER_NAME}
  docker rm ${CONTAINER_NAME}
fi

docker build -t back-server .
docker run -d -v /home/ubuntu/image:/home/ubuntu/image --name ${CONTAINER_NAME} -p 8080:8080 back-server