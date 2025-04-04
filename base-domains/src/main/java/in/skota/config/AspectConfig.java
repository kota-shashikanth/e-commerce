package in.skota.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * Configuration class to enable AspectJ auto-proxy.
 * This is required for the aspects to work.
 */
@Configuration
@EnableAspectJAutoProxy
public class AspectConfig {
    // No additional configuration needed
}
