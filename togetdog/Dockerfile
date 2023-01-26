FROM openjdk:8-jdk-alpine
ARG JAR_FILE=*.jar
COPY /var/jenkins_home/workspace/spring-test/togetdog/${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
