# 🍎 Swift for iOS Development

> **Master Swift for modern iOS development**

---

## 📋 Table of Contents

- [Swift Basics](#swift-basics)
- [Object-Oriented Programming](#object-oriented-programming)
- [Protocols and Extensions](#protocols-and-extensions)
- [Concurrency](#concurrency)
- [SwiftUI Essentials](#swiftui-essentials)

---

## 🎯 Swift Basics

### Variables and Constants

```swift
// Constants (let) - Immutable
let name: String = "Swift"
let version: Double = 5.9
let isModern: Bool = true

// Variables (var) - Mutable
var count: Int = 0
count = 1

// Type inference
let language = "Swift"  // Inferred as String
let year = 2024         // Inferred as Int

// String interpolation
let greeting = "Hello, \(name)! Version \(version)"

// Multi-line strings
let json = """
    {
        "name": "\(name)",
        "version": \(version)
    }
    """
```

### Optionals

```swift
// Optional declaration
var optionalName: String? = nil
var optionalAge: Int? = 25

// Optional binding (if let)
if let name = optionalName {
    print("Name is \(name)")
} else {
    print("Name is nil")
}

// Guard statement
func greet(name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \(name)!")
}

// Nil coalescing
let displayName = optionalName ?? "Anonymous"

// Optional chaining
let length = optionalName?.count

// Force unwrapping (use sparingly!)
let forcedName = optionalName!  // Crashes if nil

// Implicitly unwrapped optionals
var assumedName: String! = "Swift"
let implicitName: String = assumedName  // No unwrapping needed
```

### Collections

```swift
// Arrays
var fruits: [String] = ["Apple", "Banana", "Orange"]
fruits.append("Mango")
fruits.remove(at: 0)
let first = fruits.first  // Optional

// Dictionaries
var ages: [String: Int] = ["Alice": 25, "Bob": 30]
ages["Charlie"] = 35
let aliceAge = ages["Alice"]  // Optional

// Sets
var numbers: Set<Int> = [1, 2, 3, 3, 4]  // {1, 2, 3, 4}
numbers.insert(5)
let contains = numbers.contains(3)

// Higher-order functions
let numbers2 = [1, 2, 3, 4, 5]

let doubled = numbers2.map { $0 * 2 }           // [2, 4, 6, 8, 10]
let evens = numbers2.filter { $0 % 2 == 0 }     // [2, 4]
let sum = numbers2.reduce(0, +)                  // 15
let sorted = numbers2.sorted { $0 > $1 }        // [5, 4, 3, 2, 1]

// Chaining
let result = numbers2
    .filter { $0 % 2 == 0 }
    .map { $0 * $0 }
    .reduce(0, +)  // 20
```

### Functions and Closures

```swift
// Basic function
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// Default parameters
func greet(_ name: String, with greeting: String = "Hello") -> String {
    return "\(greeting), \(name)!"
}

// Variadic parameters
func sum(_ numbers: Int...) -> Int {
    return numbers.reduce(0, +)
}

// Inout parameters
func increment(_ value: inout Int) {
    value += 1
}

var x = 5
increment(&x)  // x is now 6

// Closures
let multiply: (Int, Int) -> Int = { a, b in
    return a * b
}

// Trailing closure syntax
let sorted = [3, 1, 4, 1, 5].sorted { $0 < $1 }

// Capturing values
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}

let counter = makeCounter()
print(counter())  // 1
print(counter())  // 2
```

### Control Flow

```swift
// Switch statement
func describe(_ value: Any) -> String {
    switch value {
    case let x as Int where x > 0:
        return "Positive integer: \(x)"
    case let x as Int:
        return "Integer: \(x)"
    case let s as String:
        return "String: \(s)"
    case is Double:
        return "A double"
    default:
        return "Unknown type"
    }
}

// For loops
for i in 1...5 {
    print(i)  // 1, 2, 3, 4, 5
}

for i in stride(from: 0, to: 10, by: 2) {
    print(i)  // 0, 2, 4, 6, 8
}

// While loops
var countdown = 5
while countdown > 0 {
    print(countdown)
    countdown -= 1
}

// Repeat-while (do-while)
repeat {
    print("At least once")
} while false
```

---

## 🏗️ Object-Oriented Programming

### Structures

```swift
struct Point {
    var x: Double
    var y: Double
    
    // Computed property
    var magnitude: Double {
        return sqrt(x * x + y * y)
    }
    
    // Mutating method
    mutating func translate(by offset: Point) {
        x += offset.x
        y += offset.y
    }
    
    // Static method
    static func origin() -> Point {
        return Point(x: 0, y: 0)
    }
}

// Usage
var point = Point(x: 3, y: 4)
print(point.magnitude)  // 5.0
point.translate(by: Point(x: 1, y: 1))
```

### Classes

```swift
class Person {
    let id: UUID
    var name: String
    var age: Int
    
    // Designated initializer
    init(name: String, age: Int) {
        self.id = UUID()
        self.name = name
        self.age = age
    }
    
    // Convenience initializer
    convenience init(name: String) {
        self.init(name: name, age: 0)
    }
    
    // Computed property
    var isAdult: Bool {
        return age >= 18
    }
    
    // Method
    func introduce() -> String {
        return "Hi, I'm \(name), \(age) years old."
    }
    
    // Deinitializer
    deinit {
        print("\(name) is being deinitialized")
    }
}

// Inheritance
class Employee: Person {
    var company: String
    
    init(name: String, age: Int, company: String) {
        self.company = company
        super.init(name: name, age: age)
    }
    
    override func introduce() -> String {
        return "\(super.introduce()) I work at \(company)."
    }
}
```

### Enumerations

```swift
// Basic enum
enum Direction {
    case north, south, east, west
}

// Enum with associated values
enum Result<T> {
    case success(T)
    case failure(Error)
}

// Enum with raw values
enum HTTPStatus: Int {
    case ok = 200
    case notFound = 404
    case serverError = 500
    
    var description: String {
        switch self {
        case .ok: return "OK"
        case .notFound: return "Not Found"
        case .serverError: return "Server Error"
        }
    }
}

// Usage
let status = HTTPStatus.ok
print(status.rawValue)       // 200
print(status.description)    // "OK"

// Pattern matching
func handle(_ result: Result<String>) {
    switch result {
    case .success(let data):
        print("Success: \(data)")
    case .failure(let error):
        print("Error: \(error)")
    }
}
```

---

## 🔌 Protocols and Extensions

### Protocols

```swift
// Define protocol
protocol Drawable {
    var color: String { get set }
    func draw()
}

// Protocol with default implementation
extension Drawable {
    func draw() {
        print("Drawing with color \(color)")
    }
}

// Conforming to protocol
struct Circle: Drawable {
    var color: String
    var radius: Double
    
    func draw() {
        print("Drawing circle with radius \(radius)")
    }
}

// Protocol composition
protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

func greet(_ person: Named & Aged) {
    print("Hello, \(person.name)! You are \(person.age).")
}
```

### Extensions

```swift
// Extend existing types
extension String {
    var isValidEmail: Bool {
        let pattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        return range(of: pattern, options: .regularExpression) != nil
    }
    
    func trimmed() -> String {
        return trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

// Usage
let email = "test@example.com"
print(email.isValidEmail)  // true

// Extend with protocol conformance
extension Array: Drawable where Element == Circle {
    var color: String {
        get { first?.color ?? "none" }
        set { }
    }
    
    func draw() {
        for circle in self {
            circle.draw()
        }
    }
}
```

---

## ⚡ Concurrency

### Async/Await

```swift
// Async function
func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}

// Calling async function
func loadData() async {
    do {
        let user = try await fetchUser(id: 1)
        print("Loaded: \(user.name)")
    } catch {
        print("Error: \(error)")
    }
}

// Parallel execution
func loadUserAndPosts(userId: Int) async throws -> (User, [Post]) {
    async let user = fetchUser(id: userId)
    async let posts = fetchPosts(userId: userId)
    
    return try await (user, posts)
}

// Task
Task {
    await loadData()
}

// Task with priority
Task(priority: .high) {
    await importantWork()
}
```

### Actors

```swift
actor BankAccount {
    private var balance: Double = 0
    
    func deposit(_ amount: Double) {
        balance += amount
    }
    
    func withdraw(_ amount: Double) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }
    
    func getBalance() -> Double {
        return balance
    }
}

// Usage
let account = BankAccount()

Task {
    await account.deposit(100)
    let balance = await account.getBalance()
    print("Balance: \(balance)")
}
```

### Combine (Reactive)

```swift
import Combine

class UserViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private var cancellables = Set<AnyCancellable>()
    
    func fetchUsers() {
        isLoading = true
        
        URLSession.shared.dataTaskPublisher(for: URL(string: "https://api.example.com/users")!)
            .map(\.data)
            .decode(type: [User].self, decoder: JSONDecoder())
            .receive(on: DispatchQueue.main)
            .sink(
                receiveCompletion: { [weak self] completion in
                    self?.isLoading = false
                    if case .failure(let error) = completion {
                        self?.errorMessage = error.localizedDescription
                    }
                },
                receiveValue: { [weak self] users in
                    self?.users = users
                }
            )
            .store(in: &cancellables)
    }
}
```

---

## 📱 SwiftUI Essentials

### Basic Views

```swift
struct ContentView: View {
    @State private var name = ""
    @State private var isOn = false
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Personal Info") {
                    TextField("Name", text: $name)
                    Toggle("Enable notifications", isOn: $isOn)
                }
                
                Section("Actions") {
                    Button("Save") {
                        print("Saving \(name)")
                    }
                    .buttonStyle(.borderedProminent)
                }
            }
            .navigationTitle("Settings")
        }
    }
}
```

### Lists and Navigation

```swift
struct UserListView: View {
    let users: [User]
    
    var body: some View {
        NavigationStack {
            List(users) { user in
                NavigationLink(value: user) {
                    HStack {
                        AsyncImage(url: user.avatarURL) { image in
                            image.resizable()
                        } placeholder: {
                            ProgressView()
                        }
                        .frame(width: 50, height: 50)
                        .clipShape(Circle())
                        
                        VStack(alignment: .leading) {
                            Text(user.name)
                                .font(.headline)
                            Text(user.email)
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }
                    }
                }
            }
            .navigationTitle("Users")
            .navigationDestination(for: User.self) { user in
                UserDetailView(user: user)
            }
        }
    }
}
```

### State Management

```swift
// @State for local state
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        Button("Count: \(count)") {
            count += 1
        }
    }
}

// @Binding for passing state
struct ChildView: View {
    @Binding var value: String
    
    var body: some View {
        TextField("Enter value", text: $value)
    }
}

// @StateObject for view-owned objects
struct ParentView: View {
    @StateObject private var viewModel = ViewModel()
    
    var body: some View {
        Text(viewModel.data)
    }
}

// @ObservedObject for passed objects
struct ChildView2: View {
    @ObservedObject var viewModel: ViewModel
    
    var body: some View {
        Text(viewModel.data)
    }
}

// @EnvironmentObject for dependency injection
@main
struct MyApp: App {
    @StateObject private var settings = Settings()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(settings)
        }
    }
}
```

---

## 📚 Resources

- [Swift Documentation](https://www.swift.org/documentation/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui)
- [Stanford CS193p](https://cs193p.sites.stanford.edu/)

---

## ✅ Checklist

- [ ] Understand let vs var
- [ ] Master optionals
- [ ] Use structs vs classes appropriately
- [ ] Implement protocols
- [ ] Write extensions
- [ ] Use async/await
- [ ] Understand actors
- [ ] Build SwiftUI views
- [ ] Manage state properly
- [ ] Implement navigation

---

**Continue building amazing iOS apps! 🍎**
