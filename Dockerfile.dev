FROM amazoncorretto:17-alpine AS build
WORKDIR /workspace/app

# Copy maven executable and pom files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Create directories for all modules
RUN mkdir -p email-service order-service inventory-service base-domains

# Copy all module pom files
COPY email-service/pom.xml email-service/
COPY order-service/pom.xml order-service/
COPY inventory-service/pom.xml inventory-service/
COPY base-domains/pom.xml base-domains/

# Make the mvnw script executable
RUN chmod +x mvnw

# Build all the dependencies in preparation for the actual build
RUN ./mvnw dependency:go-offline -B

# Copy source code for all modules
COPY base-domains/src base-domains/src
COPY email-service/src email-service/src
COPY order-service/src order-service/src
COPY inventory-service/src inventory-service/src

# Package all applications
RUN ./mvnw clean package -DskipTests

# Create separate stages for each service
FROM amazoncorretto:17-alpine AS email-service
WORKDIR /app
COPY --from=build /workspace/app/email-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM amazoncorretto:17-alpine AS order-service
WORKDIR /app
COPY --from=build /workspace/app/order-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM amazoncorretto:17-alpine AS inventory-service
WORKDIR /app
COPY --from=build /workspace/app/inventory-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
