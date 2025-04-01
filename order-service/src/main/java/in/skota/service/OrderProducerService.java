package in.skota.service;

import in.skota.dtos.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderProducerService {

    private final KafkaTemplate<String, Order> kafkaTemplate;
    @Value("${spring.kafka.topic.name}")
    private String topicName;

    public void sendOrder(Order order) {
        kafkaTemplate.send(topicName, order);
        System.out.println("Order sent to Kafka: " + order);
    }
}