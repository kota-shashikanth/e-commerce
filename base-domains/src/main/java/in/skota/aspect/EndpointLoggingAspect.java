package in.skota.aspect;

import in.skota.annotation.LogEndpoint;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Aspect for logging controller endpoints.
 * Logs details about requests, responses, and execution time.
 */
@Aspect
@Component
@Order(1)
@Slf4j
public class EndpointLoggingAspect {

    /**
     * Pointcut for all methods in controller classes.
     */
    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void restControllerMethods() {
    }

    /**
     * Pointcut for methods annotated with LogEndpoint.
     */
    @Pointcut("@annotation(in.skota.annotation.LogEndpoint)")
    public void logEndpointAnnotatedMethods() {
    }

    /**
     * Pointcut for classes annotated with LogEndpoint.
     */
    @Pointcut("@within(in.skota.annotation.LogEndpoint)")
    public void logEndpointAnnotatedClasses() {
    }

    /**
     * Around advice for logging endpoints.
     * Applies to methods that are either:
     * 1. Directly annotated with @LogEndpoint
     * 2. In a class annotated with @LogEndpoint
     */
    @Around("restControllerMethods() && (logEndpointAnnotatedMethods() || logEndpointAnnotatedClasses())")
    public Object logEndpointExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        // Get method signature and annotation
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        // Get annotation from method or class
        LogEndpoint logEndpoint = method.getAnnotation(LogEndpoint.class);
        if (logEndpoint == null) {
            logEndpoint = method.getDeclaringClass().getAnnotation(LogEndpoint.class);
        }

        // Get HTTP request details
        HttpServletRequest request = getCurrentRequest();
        String httpMethod = request != null ? request.getMethod() : "UNKNOWN";
        String requestURI = request != null ? request.getRequestURI() : "UNKNOWN";

        // Log request details
        String description = logEndpoint.description().isEmpty()
                ? ""
                : " - " + logEndpoint.description();

        log.info("==> {} {} - {}.{}{}",
                httpMethod,
                requestURI,
                signature.getDeclaringTypeName(),
                signature.getName(),
                description);

        // Log parameters if enabled
        if (logEndpoint.logParams() && joinPoint.getArgs().length > 0) {
            String params = formatParameters(joinPoint.getArgs(), signature.getParameterNames());
            log.info("Request Parameters: {}", params);
        }

        // Measure execution time if enabled
        long startTime = System.currentTimeMillis();
        Object result;

        try {
            // Execute the method
            result = joinPoint.proceed();

            // Log execution time if enabled
            if (logEndpoint.logExecutionTime()) {
                long executionTime = System.currentTimeMillis() - startTime;
                log.info("Execution Time: {} ms", executionTime);
            }

            // Log response if enabled
            if (logEndpoint.logResponse() && result != null) {
                log.info("Response: {}", formatResponse(result));
            }

            // Log successful completion
            log.info("<== {} {} - Completed Successfully", httpMethod, requestURI);

            return result;
        } catch (Exception e) {
            // Log exception
            log.error("<== {} {} - Failed with exception: {}", httpMethod, requestURI, e.getMessage());
            throw e;
        }
    }

    /**
     * Get the current HTTP request.
     */
    private HttpServletRequest getCurrentRequest() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            return attributes != null ? attributes.getRequest() : null;
        } catch (Exception e) {
            log.warn("Could not get current request: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Format method parameters for logging.
     */
    private String formatParameters(Object[] args, String[] paramNames) {
        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < args.length; i++) {
            String paramName = i < paramNames.length ? paramNames[i] : "arg" + i;
            params.put(paramName, args[i]);
        }

        return params.entrySet().stream()
                .map(entry -> entry.getKey() + "=" + formatValue(entry.getValue()))
                .collect(Collectors.joining(", "));
    }

    /**
     * Format a value for logging, handling arrays and collections.
     */
    private String formatValue(Object value) {
        if (value == null) {
            return "null";
        } else if (value.getClass().isArray()) {
            return Arrays.deepToString((Object[]) value);
        } else {
            // Limit string length to avoid huge logs
            String stringValue = value.toString();
            if (stringValue.length() > 1000) {
                return stringValue.substring(0, 997) + "...";
            }
            return stringValue;
        }
    }

    /**
     * Format response for logging.
     */
    private String formatResponse(Object response) {
        if (response == null) {
            return "null";
        }

        String stringValue = response.toString();
        if (stringValue.length() > 1000) {
            return stringValue.substring(0, 997) + "...";
        }
        return stringValue;
    }
}
