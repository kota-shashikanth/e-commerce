package in.skota.controller;

import in.skota.dtos.Order;
import in.skota.service.OrderProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderProducerService orderProducerService;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        orderProducerService.sendOrder(order);
        return ResponseEntity.ok("Order sent to Kafka successfully");
    }
}