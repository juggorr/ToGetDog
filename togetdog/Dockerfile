FROM openjdk:8-jdk-alpine
ARG JAR_FILE=*.jar
COPY /build/libs/${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
