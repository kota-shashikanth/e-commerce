package in.skota.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to mark controller methods for logging.
 * When applied to a method, the aspect will log details about the request and response.
 * Can also be applied at the class level to log all methods in the controller.
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface LogEndpoint {

    /**
     * Optional description to include in the log message.
     */
    String description() default "";

    /**
     * Whether to log request parameters.
     */
    boolean logParams() default true;

    /**
     * Whether to log the response body.
     */
    boolean logResponse() default true;

    /**
     * Whether to log execution time.
     */
    boolean logExecutionTime() default true;
}
