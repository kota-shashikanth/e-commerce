package in.skota.producer;

import in.skota.dtos.Order;
import in.skota.dtos.OrderEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderProducer {

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;
    
    @Value("${spring.kafka.topic.name}")
    private String topicName;

    public CompletableFuture<SendResult<String, OrderEvent>> sendOrder(Order order) {
        // 1. Create OrderEvent from Order
        OrderEvent orderEvent = new OrderEvent(
                "Order placed successfully!",
                "PENDING",
                order
        );

        // 2. Log the event being sent
        log.info("Sending order event to Kafka => {}", orderEvent);

        // 3. Send to Kafka and handle completion
        return kafkaTemplate
                .send(topicName, order.getOrderId(), orderEvent)
                .whenComplete((result, ex) -> {
                    if (ex == null) {
                        // 4. Success logging
                        log.info("Order sent successfully to topic: {}, partition: {}, offset: {}",
                                result.getRecordMetadata().topic(),
                                result.getRecordMetadata().partition(),
                                result.getRecordMetadata().offset());
                    } else {
                        // 5. Error logging
                        log.error("Failed to send order to Kafka", ex);
                    }
                });
    }
}
