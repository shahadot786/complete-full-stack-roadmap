# 🚀 Intermediate Java - Spring Boot Advanced

> **Build production-ready Spring Boot applications**

## Spring Security & JWT

```java
// SecurityConfig.java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// JwtUtil.java
@Component
public class JwtUtil {
    private String secret = "your-secret-key";
    
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }
}
```

## Validation

```java
// UserDTO.java
public class UserDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50)
    private String name;
    
    @Email(message = "Invalid email")
    @NotBlank
    private String email;
    
    @Min(18)
    @Max(100)
    private Integer age;
}

// Controller
@PostMapping
public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
    User user = userService.createUser(userDTO);
    return ResponseEntity.ok(user);
}
```

## Exception Handling

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            System.currentTimeMillis()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
```

## Resources

- [Spring Security](https://spring.io/projects/spring-security)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)

**Next:** [Advanced Java](../03-Advanced/README.md)
