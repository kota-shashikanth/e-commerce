package in.skota.controller;

import in.skota.dtos.Order;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class OrderControllerTest {

    private final String BASE_URL = "http://localhost:8083/api/orders";
    private final RestTemplate restTemplate = new RestTemplate();

    @Test
    void createOrder_ShouldReturnSuccess() {
        // Arrange
        Order order = Order.builder()
                .orderId("123")
                .name("Test Product")
                .qty(2)
                .price(29.99)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Order> request = new HttpEntity<>(order, headers);

        // Act
        ResponseEntity<String> response = restTemplate.postForEntity(
                BASE_URL,
                request,
                String.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Order sent to Kafka successfully");
    }

    @Test
    void createOrder_WithInvalidOrder_ShouldReturnBadRequest() {
        // Arrange
        Order invalidOrder = Order.builder()
                .orderId("123")
                // missing required fields
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Order> request = new HttpEntity<>(invalidOrder, headers);

        // Act & Assert
        HttpClientErrorException exception = assertThrows(
                HttpClientErrorException.class,
                () -> restTemplate.postForEntity(BASE_URL, request, String.class)
        );

        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void createOrder_WithInvalidJson_ShouldReturnBadRequest() {
        // Arrange
        String invalidJson = "invalid json";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(invalidJson, headers);

        // Act & Assert
        HttpClientErrorException exception = assertThrows(
                HttpClientErrorException.class,
                () -> restTemplate.postForEntity(BASE_URL, request, String.class)
        );

        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}