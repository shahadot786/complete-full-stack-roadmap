# ☕ Java Beginner - Spring Boot Fundamentals

> **Start building enterprise applications with Java and Spring Boot**

## Java Basics

### Variables and Data Types

```java
// Primitive types
int age = 30;
double price = 19.99;
boolean isActive = true;
char grade = 'A';

// Strings
String name = "John Doe";

// Arrays
int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[]{"John", "Jane"};
```

### Classes and Objects

```java
public class User {
    private String name;
    private String email;
    
    // Constructor
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}
```

## Spring Boot Setup

```bash
# Using Spring Initializr CLI
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,h2 \
  -d type=maven-project \
  -d bootVersion=3.2.0 \
  -d groupId=com.example \
  -d artifactId=myapp \
  -o myapp.zip

unzip myapp.zip
cd myapp
./mvnw spring-boot:run
```

## First Spring Boot Application

```java
// Application.java
package com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## REST Controller

```java
// UserController.java
package com.example.myapp.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private List<User> users = new ArrayList<>();
    
    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return users.stream()
            .filter(u -> u.getId().equals(id))
            .findFirst()
            .orElse(null);
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        users.add(user);
        return user;
    }
}
```

## Entity and Repository

```java
// User.java
package com.example.myapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(unique = true)
    private String email;
    
    // Constructors, getters, setters
}

// UserRepository.java
package com.example.myapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

## Service Layer

```java
// UserService.java
package com.example.myapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
```

## Configuration

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
  h2:
    console:
      enabled: true
```

## Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Java Tutorial](https://docs.oracle.com/javase/tutorial/)

**Next:** [Intermediate Java](../02-Intermediate/README.md)
