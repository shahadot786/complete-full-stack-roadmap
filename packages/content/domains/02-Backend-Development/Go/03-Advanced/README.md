# 🔥 Advanced Go - Concurrency & Microservices

> **Master goroutines, channels, and distributed systems**

## Advanced Concurrency

```go
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

## gRPC

```go
// Install: go get google.golang.org/grpc

// server.go
type server struct {
    pb.UnimplementedUserServiceServer
}

func (s *server) GetUser(ctx context.Context, req *pb.UserRequest) (*pb.UserResponse, error) {
    return &pb.UserResponse{
        Id:    req.Id,
        Name:  "John",
        Email: "john@example.com",
    }, nil
}
```

## Resources

- [Go Concurrency](https://go.dev/tour/concurrency/1)
- [gRPC Go](https://grpc.io/docs/languages/go/)

**Congratulations!** You've mastered advanced Go!
