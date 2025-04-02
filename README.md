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
- Apache Kafka 3.x
- Zookeeper

## Services

### Order Service (Port: 8083)

- Produces order events to Kafka topic
- REST endpoint to create orders
- Path: `/api/orders`

### Inventory Service (Port: 8082)

- Consumes order events from Kafka topic
- Updates inventory based on orders

### Email Service (Port: 8081)

- Consumes order events from Kafka topic
- Sends email notifications for orders

## Setup

1. Start Zookeeper:

```bash
zookeeper-server-start.bat config/zookeeper.properties
```

2. Start Kafka:

```bash
kafka-server-start.bat config/server.properties
```

3. Build the project:

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

## Testing

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

## Project Structure

```
e-commerce/
├── order-service/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── in/skota/
│           │       ├── controller/
│           │       ├── service/
│           │       └── config/
│           └── resources/
│               └── application.properties
├── inventory-service/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── in/skota/
│           └── resources/
│               └── application.properties
├── email-service/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── in/skota/
│           └── resources/
│               └── application.properties
└── base-domains/
    └── src/
        └── main/
            └── java/
                └── in/skota/
                    └── dtos/
```

## Configuration

Each service has its own `application.properties` file with specific configurations:

### Order Service

```properties
server.port=8083
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.topic.name=orders_topic
```

### Inventory Service

```properties
server.port=8082
spring.kafka.bootstrap-servers=localhost:9092
```

### Email Service

```properties
server.port=8081
spring.kafka.bootstrap-servers=localhost:9092
```

## Technologies Used

- Spring Boot 3.x
- Apache Kafka
- Maven
- Java 17
- Lombok
- Spring Kafka

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT](LICENSE)