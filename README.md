# E-Commerce Microservices with Apache Kafka

This project demonstrates the integration of Apache Kafka with Spring Boot microservices. It consists of three
microservices that communicate through Kafka events.

## Architecture

```plaintext
                    ┌──────────────┐
                    │              │
                    │ Order Service│
                    │   (8083)     │
                    │              │
                    └──────┬───────┘
                           │
                           │ Produces Events
                           ▼
                    ┌──────────────┐
                    │              │
                    │ Kafka Topic  │
                    │(orders_topic)│
                    │              │
                    └──────┬───────┘
                           │
                 Consumes  │  Consumes
                 Events    │  Events
                           ▼
             ┌─────────────-────────────┐
             │                          │
      ┌──────┴───────┐          ┌─────-─┴───────┐
      │              │          │               │
      │  Inventory   │          │    Email      │
      │   Service    │          │   Service     │
      │    (8082)    │          │    (8081)     │
      │              │          │               │
      └──────────────┘          └──────────────-┘
```

## Prerequisites

- Java 17
- Maven
- Apache Kafka 4.0.0 (KRaft mode - no Zookeeper required)

## Services

### Order Service (Port: 8083)

- Produces order events to Kafka topic
- REST endpoint to create orders
- Path: `/api/orders`

### Inventory Service (Port: 8082)

- Consumes order events from Kafka topic (`orders_topic`)
- Updates inventory based on orders
- Uses consumer group ID `inventory-service`
- Processes order events and updates inventory records

### Email Service (Port: 8081)

- Consumes order events from Kafka topic (`orders_topic`)
- Sends email notifications for orders
- Uses consumer group ID `email-service`
- Processes order events and sends email notifications

### Base Domains Module

- Contains shared domain objects, DTOs, and utilities
- Provides cross-cutting concerns like logging aspects
- Includes the `@LogEndpoint` annotation for automatic endpoint logging
- See [Base Domains README](base-domains/README.md) for more details

## Setup

### Option 1: Running Locally

1. Start Kafka (in KRaft mode):

```bash
# Generate cluster ID if needed
kafka-storage.sh random-uuid

# Format storage directory
kafka-storage.sh format -t <cluster-id> -c config/kraft/server.properties

# Start Kafka
kafka-server-start.bat config/kraft/server.properties
```

2. Build the project:

```bash
mvn clean install
```

4. Start the services in order:

```bash
# Start Order Service
cd order-service
mvn spring-boot:run

# Start Inventory Service
cd inventory-service
mvn spring-boot:run

# Start Email Service
cd email-service
mvn spring-boot:run
```

### Option 2: Running with Docker (Recommended)

You can run the entire application stack (including Kafka in KRaft mode) using Docker Compose. This is the recommended
approach as it ensures all services are properly configured to work together:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

This will start:

- Kafka on port 9092 (in KRaft mode - no Zookeeper required)
- Kafka UI on port 8080
- Order Service on port 8083
- Inventory Service on port 8082
- Email Service on port 8081

### Option 3: Development Mode with Auto-Rebuild

For development, you can use the development-focused Docker Compose configuration that rebuilds services automatically:

```bash
# On Linux/macOS
chmod +x rebuild-services.sh

# Rebuild and restart all services
./rebuild-services.sh

# Rebuild and restart a specific service
./rebuild-services.sh order-service
```

On Windows:

```batch
:: Rebuild and restart all services
rebuild-services.bat

:: Rebuild and restart a specific service
rebuild-services.bat order-service
```

This development setup:

- Uses a dedicated Docker Compose file (`docker-compose.dev.yml`)
- Rebuilds services when you run the script
- Mounts source directories as volumes for faster development
- Preserves the same ports and dependencies as the production setup

## Testing

### Create an Order

Create an order using cURL:

```bash
curl -X POST http://localhost:8083/api/orders \
-H "Content-Type: application/json" \
-d '{
    "orderId": "123",
    "name": "Test Product",
    "qty": 2,
    "price": 29.99
}'
```

You should receive a response: `Order sent to Kafka successfully`

### Verify Kafka Integration

When you create an order:

1. The Order Service will produce an event to the `orders_topic`
2. The Inventory Service will consume the event and update inventory
3. The Email Service will consume the event and send an email notification

Check the logs of each service to verify the event flow:

```bash
# Check Order Service logs
docker-compose logs order-service

# Check Inventory Service logs
docker-compose logs inventory-service

# Check Email Service logs
docker-compose logs email-service
```

### Kafka UI

You can also access the Kafka UI at http://localhost:8080 to monitor topics, messages, and consumer groups.

### MongoDB and Inventory Management

The application uses MongoDB to store inventory data. You can access the MongoDB Express UI at http://localhost:8085 to
view and manage the database.

#### Testing MongoDB Connection

To test the MongoDB connection, you can use the provided test script:

```bash
# After starting the containers
mongosh "mongodb://admin:password@localhost:27017/e-commerce?authSource=admin" --file test-mongodb.js
```

#### Initialize Inventory Data

To initialize the inventory with sample data, you can use the provided script:

```bash
# After starting the containers
mongosh "mongodb://admin:password@localhost:27017/e-commerce?authSource=admin" --file init-inventory.js
```

#### Inventory API Endpoints

The inventory service provides the following REST endpoints:

- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/{productId}` - Get inventory by product ID
- `POST /api/inventory` - Create a new inventory item
- `PUT /api/inventory/{id}` - Update an existing inventory item

Example to create a new inventory item:

```bash
curl -X POST http://localhost:8082/api/inventory \
-H "Content-Type: application/json" \
-d '{
    "productId": "P009",
    "productName": "New Product",
    "quantity": 25,
    "price": 39.99,
    "category": "New Category",
    "isInStock": true
}'
```

```bash
# Order Service logs should show:
"Sending order event to Kafka => OrderEvent(...)"
"Order sent successfully to topic: orders_topic, partition: 0, offset: 0"

# Inventory Service logs should show:
"Order event received in inventory service => OrderEvent(...)"
"Processing inventory update for order: 123"

# Email Service logs should show:
"Order event received in email service => OrderEvent(...)"
"Processing email notification for order: 123"
```

## Project Structure

```
e-commerce/
├── order-service/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── in/skota/
│           │       ├── controller/
│           │       │   └── OrderController.java
│           │       ├── service/
│           │       │   └── OrderProducerService.java
│           │       └── config/
│           │           └── KafkaConfig.java
│           └── resources/
│               └── application.properties
├── inventory-service/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── in/skota/
│           │       ├── service/
│           │       │   └── OrderConsumerService.java
│           │       └── config/
│           │           └── KafkaConsumerConfig.java
│           └── resources/
│               └── application.properties
├── email-service/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── in/skota/
│           │       ├── service/
│           │       │   └── OrderConsumerService.java
│           │       └── config/
│           │           └── KafkaConsumerConfig.java
│           └── resources/
│               └── application.properties
└── base-domains/
    ├── README.md
    └── src/
        └── main/
            └── java/
                └── in/skota/
                    ├── dtos/
                    │   ├── Order.java
                    │   └── OrderEvent.java
                    ├── annotation/
                    │   └── LogEndpoint.java
                    ├── aspect/
                    │   └── EndpointLoggingAspect.java
                    └── config/
                        └── AspectConfig.java
```

## Configuration

Each service has its own `application.properties` file with specific configurations:

### Order Service

```properties
server.port=8083
server.servlet.context-path=/api
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.springframework.kafka.support.serializer.JsonSerializer
spring.kafka.topic.name=orders_topic
```

### Inventory Service

```properties
server.port=8082
server.servlet.context-path=/api
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=inventory-service
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.springframework.kafka.support.serializer.JsonDeserializer
spring.kafka.topic.name=orders_topic
```

### Email Service

```properties
server.port=8081
server.servlet.context-path=/api
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=email-service
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.springframework.kafka.support.serializer.JsonDeserializer
spring.kafka.topic.name=orders_topic
```

## Technologies Used

- Spring Boot 3.x
- Apache Kafka 4.0.0 (KRaft mode - no Zookeeper required)
- MongoDB
- Maven
- Java 17 (Amazon Corretto)
- Lombok
- Spring Kafka
- Spring Data MongoDB
- Spring Validation
- Spring Web
- Docker & Docker Compose
- Kafka UI for monitoring
- MongoDB Express for database management

## Docker Setup

This project uses a single Dockerfile at the root level to build all services. The Dockerfile uses a multi-stage build
approach:

1. First stage builds all modules in a single build
2. Subsequent stages create separate images for each service

The docker-compose.yml file is configured to use Apache Kafka 4.0.0 in KRaft mode, which eliminates the need for
Zookeeper.

## Kafka KRaft Mode

KRaft (Kafka Raft) mode is a new architecture introduced in Apache Kafka that removes the dependency on Zookeeper.
Benefits include:

- Simplified architecture with fewer components to manage
- Improved scalability and performance
- Better fault tolerance
- Reduced operational complexity

## Kafka Concepts Used

- **Topics**: Named channels where messages are published
- **Producers**: Components that publish messages to topics
- **Consumers**: Components that subscribe to topics and process messages
- **Consumer Groups**: Groups of consumers that divide the work of processing messages
- **Serialization/Deserialization**: Converting Java objects to/from byte streams for Kafka
- **Offsets**: Tracking which messages have been consumed

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT](LICENSE)