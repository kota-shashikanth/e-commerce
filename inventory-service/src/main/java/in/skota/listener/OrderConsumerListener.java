package in.skota.listener;

import in.skota.dtos.Order;
import in.skota.dtos.OrderEvent;
import in.skota.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class OrderConsumerListener {

    private final InventoryService inventoryService;

    @KafkaListener(
            topics = "${spring.kafka.topic.name}",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void consume(OrderEvent orderEvent) {
        log.info("Order event received in inventory service => {}", orderEvent);

        Order order = orderEvent.getOrder();
        log.info("Processing inventory update for order: {}", order.getOrderId());

        try {
            boolean updated = updateInventory(order);
            if (updated) {
                log.info("Inventory successfully updated for order: {}", order.getOrderId());
            } else {
                log.warn("Could not update inventory for order: {}, insufficient stock or product not found", order.getOrderId());
            }
        } catch (Exception e) {
            log.error("Error processing inventory update for order: {}", order.getOrderId(), e);
        }
    }

    private boolean updateInventory(Order order) {
        // Use the inventory service to update inventory
        return inventoryService.updateInventoryForOrder(order.getName(), order.getQty());
    }
}
