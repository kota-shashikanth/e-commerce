# Docker Compose Configuration

This project uses multiple Docker Compose files to organize services into logical groups. This approach allows you to
start only the services you need for a particular development task.

## Docker Compose Files

- **docker-compose.mongo.yml**: MongoDB and MongoDB Express
- **docker-compose.kafka.yml**: Kafka and Kafka UI
- **docker-compose.services.yml**: Microservices (Order, Inventory, Email)
- **docker-compose.ui.yml**: Angular UI
- **docker-compose.yml**: Master file that includes all other compose files

## Usage

### Starting All Services

To start all services at once:

```bash
docker-compose up -d
```

### Starting Specific Service Groups

To start only MongoDB and Kafka:

```bash
docker-compose -f docker-compose.mongo.yml -f docker-compose.kafka.yml up -d
```

To start only the microservices (requires Kafka and MongoDB to be running):

```bash
docker-compose -f docker-compose.services.yml up -d
```

To start only the UI (requires backend services to be running):

```bash
docker-compose -f docker-compose.ui.yml up -d
```

### Stopping Services

To stop all services started with a specific compose file:

```bash
docker-compose down
```

To stop and remove volumes (this will delete all data):

```bash
docker-compose down -v
```

## Service URLs

- **MongoDB**: mongodb://localhost:27017
- **MongoDB Express UI**: http://localhost:8085
- **Kafka**: localhost:9092
- **Kafka UI**: http://localhost:8080
- **Order Service**: http://localhost:8083/api
- **Inventory Service**: http://localhost:8082/api
- **Email Service**: http://localhost:8081/api
- **Angular UI**: http://localhost:4200
