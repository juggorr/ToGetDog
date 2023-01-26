FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 8080

CMD ["java", "-jar", "application.jar"]
