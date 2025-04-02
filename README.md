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

- Consumes order events from Kafka topic (`orders_topic`)
- Updates inventory based on orders
- Uses consumer group ID `inventory-service`
- Processes order events and updates inventory records

### Email Service (Port: 8081)

- Consumes order events from Kafka topic (`orders_topic`)
- Sends email notifications for orders
- Uses consumer group ID `email-service`
- Processes order events and sends email notifications

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

### Verify Kafka Integration

When you create an order:

1. The Order Service will produce an event to the `orders_topic`
2. The Inventory Service will consume the event and update inventory
3. The Email Service will consume the event and send an email notification

Check the logs of each service to verify the event flow:

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
    └── src/
        └── main/
            └── java/
                └── in/skota/
                    └── dtos/
                        ├── Order.java
                        └── OrderEvent.java
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
- Apache Kafka
- Maven
- Java 17
- Lombok
- Spring Kafka
- Spring Validation
- Spring Web

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