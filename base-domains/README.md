# Base Domains Module

This module contains shared domain objects, utilities, and aspects used by all microservices in the e-commerce
application.

## Contents

- Domain Transfer Objects (DTOs)
- Shared Models
- Annotations
- Aspects
- Utilities

## Endpoint Logging Aspect

The module includes an aspect for logging REST controller endpoints. It provides detailed logging of HTTP requests,
responses, and execution times.

### Features

- Log HTTP method, URI, and controller method details
- Log request parameters
- Log response body
- Measure and log execution time
- Log exceptions

### Usage

#### 1. Add the `@LogEndpoint` annotation to your controller methods or classes

```java
import in.skota.annotation.LogEndpoint;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    // Log a specific endpoint
    @GetMapping("/{id}")
    @LogEndpoint(description = "Get product by ID")
    public Product getProduct(@PathVariable String id) {
        // Method implementation
    }
}
```

#### 2. Apply at the class level to log all methods

```java
import in.skota.annotation.LogEndpoint;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@LogEndpoint // Will apply to all methods in this controller
public class OrderController {

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // Method implementation
    }
    
    // Override class-level settings for a specific method
    @GetMapping("/{id}")
    @LogEndpoint(logResponse = false) 
    public Order getOrder(@PathVariable String id) {
        // Method implementation
    }
}
```

### Real Examples in the Project

The annotation has been applied to the following controllers in the project:

```java
// OrderController.java
@RestController
@RequestMapping("/orders")
@LogEndpoint(description = "Order API endpoints")
public class OrderController {
    // Methods will be logged automatically
}

// InventoryController.java
@RestController
@RequestMapping("/inventory")
@LogEndpoint(description = "Inventory API endpoints")
public class InventoryController {
    // Methods will be logged automatically
}
```

### Configuration Options

The `@LogEndpoint` annotation supports the following options:

- `description`: Optional description to include in the log message
- `logParams`: Whether to log request parameters (default: true)
- `logResponse`: Whether to log the response body (default: true)
- `logExecutionTime`: Whether to log execution time (default: true)

### Sample Log Output

```
==> GET /api/products/123 - in.skota.controller.ProductController.getProduct - Get product by ID
Request Parameters: id=123
Execution Time: 45 ms
Response: Product{id='123', name='Laptop', price=999.99}
<== GET /api/products/123 - Completed Successfully
```

### Notes

- Large request/response bodies are truncated to avoid excessive logging
- Exceptions are logged with their message
- The aspect only applies to methods in classes annotated with `@RestController`
