# 🔵 Go Backend Development

> **Build high-performance APIs with Go**

## Setup

```bash
# Install Go
# Download from https://golang.org/dl/

# Verify
go version

# Initialize project
mkdir myapp
cd myapp
go mod init myapp
```

## Basic HTTP Server

```go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var users = []User{
    {ID: 1, Name: "John", Email: "john@example.com"},
}

func main() {
    http.HandleFunc("/users", getUsers)
    http.HandleFunc("/users/create", createUser)
    
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    var user User
    json.NewDecoder(r.Body).Decode(&user)
    user.ID = len(users) + 1
    users = append(users, user)
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}
```

## Gin Framework

```bash
go get -u github.com/gin-gonic/gin
```

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type User struct {
    ID    uint   `json:"id"`
    Name  string `json:"name" binding:"required"`
    Email string `json:"email" binding:"required,email"`
}

func main() {
    r := gin.Default()
    
    // Routes
    r.GET("/users", getUsers)
    r.GET("/users/:id", getUser)
    r.POST("/users", createUser)
    r.PUT("/users/:id", updateUser)
    r.DELETE("/users/:id", deleteUser)
    
    r.Run(":8080")
}

func getUsers(c *gin.Context) {
    c.JSON(http.StatusOK, users)
}

func getUser(c *gin.Context) {
    id := c.Param("id")
    // Find user by ID
    c.JSON(http.StatusOK, user)
}

func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    // Save user
    c.JSON(http.StatusCreated, user)
}
```

## Database with GORM

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
```

```go
import (
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name  string `gorm:"not null"`
    Email string `gorm:"uniqueIndex;not null"`
}

func main() {
    dsn := "host=localhost user=postgres password=password dbname=mydb port=5432"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }
    
    // Auto migrate
    db.AutoMigrate(&User{})
    
    // Create
    user := User{Name: "John", Email: "john@example.com"}
    db.Create(&user)
    
    // Read
    var users []User
    db.Find(&users)
    
    // Update
    db.Model(&user).Update("Name", "Jane")
    
    // Delete
    db.Delete(&user)
}
```

## Middleware

```go
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        
        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "No token provided"})
            c.Abort()
            return
        }
        
        // Verify token
        c.Next()
    }
}

// Usage
r.Use(AuthMiddleware())
```

## Goroutines & Concurrency

```go
func processData(data []string) {
    var wg sync.WaitGroup
    
    for _, item := range data {
        wg.Add(1)
        go func(item string) {
            defer wg.Done()
            // Process item
            fmt.Println("Processing:", item)
        }(item)
    }
    
    wg.Wait()
}

// Channels
func worker(jobs <-chan int, results chan<- int) {
    for job := range jobs {
        results <- job * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    // Start workers
    for w := 1; w <= 3; w++ {
        go worker(jobs, results)
    }
    
    // Send jobs
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Collect results
    for a := 1; a <= 9; a++ {
        <-results
    }
}
```

## Testing

```go
package main

import (
    "testing"
    "github.com/stretchr/testify/assert"
)

func TestGetUsers(t *testing.T) {
    router := setupRouter()
    
    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/users", nil)
    router.ServeHTTP(w, req)
    
    assert.Equal(t, 200, w.Code)
}
```

## Resources

- [Go Documentation](https://go.dev/doc/)
- [Gin Framework](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
