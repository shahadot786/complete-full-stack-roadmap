# 🔵 Go Beginner - Getting Started

> **Learn Go fundamentals and build your first API**

## Go Basics

```go
package main

import "fmt"

func main() {
    // Variables
    var name string = "John"
    age := 30  // Short declaration
    
    // Arrays and Slices
    numbers := []int{1, 2, 3, 4, 5}
    
    // Maps
    user := map[string]string{
        "name":  "John",
        "email": "john@example.com",
    }
    
    fmt.Println(name, age, numbers, user)
}
```

## Structs and Methods

```go
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func (u *User) Greet() string {
    return fmt.Sprintf("Hello, I'm %s", u.Name)
}
```

## Basic HTTP Server

```go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/users", usersHandler)
    
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Hello Go!",
    })
}
```

## Resources

- [Go Documentation](https://go.dev/doc/)
- [Go by Example](https://gobyexample.com/)

**Next:** [Intermediate Go](../02-Intermediate/README.md)
