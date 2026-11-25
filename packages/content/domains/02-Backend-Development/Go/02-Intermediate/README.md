# 🚀 Intermediate Go - Gin Framework & GORM

> **Build production APIs with Gin and GORM**

## Gin Framework

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
    
    r.GET("/users", getUsers)
    r.POST("/users", createUser)
    
    r.Run(":8080")
}

func getUsers(c *gin.Context) {
    c.JSON(http.StatusOK, users)
}

func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, user)
}
```

## GORM Database

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
    dsn := "host=localhost user=postgres password=password dbname=mydb"
    db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    
    db.AutoMigrate(&User{})
}
```

## Resources

- [Gin Framework](https://gin-gonic.com/)
- [GORM](https://gorm.io/)

**Next:** [Advanced Go](../03-Advanced/README.md)
