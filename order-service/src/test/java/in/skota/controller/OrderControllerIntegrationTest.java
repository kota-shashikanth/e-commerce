package in.skota.controller;

import in.skota.dtos.Order;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

class OrderControllerIntegrationTest {

    private final RestTemplate restTemplate = new RestTemplate();

    @Test
    void createOrder_ShouldSendOrderToKafkaAndReturnSuccess() {
        // Arrange
        Order order = new Order("123", "Test Product", 2, 29.99);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Order> request = new HttpEntity<>(order, headers);

        // Act
        // From your application.properties
        String url = "http://localhost:8083/api/orders";
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Order sent to Kafka successfully");
    }
}