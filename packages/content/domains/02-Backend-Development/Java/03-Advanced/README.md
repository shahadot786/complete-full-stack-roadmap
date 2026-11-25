# 🔥 Advanced Java - Microservices & Cloud

> **Master Spring Cloud and microservices architecture**

## Spring Cloud Microservices

### Service Discovery with Eureka

```java
// Eureka Server
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

// Eureka Client
@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

### API Gateway

```java
@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}

// application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/users/**
```

## Kafka Integration

```java
@Service
public class KafkaProducer {
    
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    
    public void sendMessage(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }
}

@Service
public class KafkaConsumer {
    
    @KafkaListener(topics = "user-events", groupId = "user-group")
    public void consume(String message) {
        System.out.println("Consumed: " + message);
    }
}
```

## Resources

- [Spring Cloud](https://spring.io/projects/spring-cloud)
- [Apache Kafka](https://kafka.apache.org/)

**Congratulations!** You've mastered advanced Java!
