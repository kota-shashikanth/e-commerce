package in.skota.service;

import in.skota.dtos.Order;
import in.skota.dtos.OrderEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderConsumerService {

    @KafkaListener(
            topics = "${spring.kafka.topic.name}",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void consume(OrderEvent orderEvent) {
        log.info("Order event received in inventory service => {}", orderEvent);

        // Add your inventory update logic here
        Order order = orderEvent.getOrder();
        log.info("Processing inventory update for order: {}", order.getOrderId());

        // Example inventory processing
        try {
            updateInventory(order);
            log.info("Inventory successfully updated for order: {}", order.getOrderId());
        } catch (Exception e) {
            log.error("Error processing inventory update for order: {}", order.getOrderId(), e);
        }
    }

    private void updateInventory(Order order) {
        // Add your inventory update logic here
        // This is where you would typically:
        // 1. Check current inventory levels
        // 2. Validate if order can be fulfilled
        // 3. Update inventory counts
        // 4. Persist changes to database

        log.info("Updating inventory for product: {}, quantity: {}",
                order.getName(), order.getQty());
    }
}