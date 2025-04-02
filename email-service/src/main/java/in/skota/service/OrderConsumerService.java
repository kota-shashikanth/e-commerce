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
        log.info("Order event received in email service => {}", orderEvent);

        // Get order details from the event
        Order order = orderEvent.getOrder();
        log.info("Processing email notification for order: {}", order.getOrderId());

        // Example email notification processing
        try {
            sendEmailNotification(order);
            log.info("Email notification sent successfully for order: {}", order.getOrderId());
        } catch (Exception e) {
            log.error("Error sending email notification for order: {}", order.getOrderId(), e);
        }
    }

    private void sendEmailNotification(Order order) {
        // Add your email sending logic here
        // This is where you would typically:
        // 1. Format the email content
        // 2. Set up recipient information
        // 3. Connect to an email service
        // 4. Send the email

        log.info("Sending email notification for product: {}, quantity: {}, total price: ${}",
                order.getName(),
                order.getQty(),
                order.getQty() * order.getPrice());
    }
}
