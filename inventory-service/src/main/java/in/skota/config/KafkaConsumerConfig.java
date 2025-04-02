package in.skota.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {
    // Spring Boot's auto-configuration will handle basic consumer config
    // Additional custom configuration can be added here if needed
}