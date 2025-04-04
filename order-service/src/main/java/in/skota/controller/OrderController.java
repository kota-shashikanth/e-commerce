package in.skota.controller;

import in.skota.annotation.LogEndpoint;
import in.skota.dtos.Order;
import in.skota.producer.OrderProducer;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Slf4j
@Validated
@LogEndpoint(description = "Order API endpoints")
public class OrderController {

    private final OrderProducer orderProducer;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody @Valid Order order) {
        try {
            orderProducer.sendOrder(order).get();
            return ResponseEntity.ok("Order sent to Kafka successfully");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return ResponseEntity.internalServerError().body("Order processing interrupted");
        } catch (ExecutionException e) {
            log.error("Failed to process order", e);
            return ResponseEntity.internalServerError().body("Failed to process order");
        }
    }
}