# 🍎 iOS Native Development

> **Build stunning iOS apps with Swift and SwiftUI**

[![Swift](https://img.shields.io/badge/Swift-F05138?style=flat&logo=swift&logoColor=white)](https://swift.org/)
[![SwiftUI](https://img.shields.io/badge/SwiftUI-0D47A1?style=flat&logo=swift&logoColor=white)](https://developer.apple.com/xcode/swiftui/)
[![Xcode](https://img.shields.io/badge/Xcode-147EFB?style=flat&logo=xcode&logoColor=white)](https://developer.apple.com/xcode/)

---

## 📚 Table of Contents

- [Why Native iOS?](#-why-native-ios)
- [Learning Path](#️-learning-path)
- [Getting Started](#-getting-started)
- [Curriculum](#-curriculum)
- [Resources](#-resources)

---

## 🎯 Why Native iOS?

| Advantage | Description |
|-----------|-------------|
| **Best Performance** | Optimized for Apple hardware |
| **Full API Access** | Complete iOS SDK available |
| **SwiftUI** | Modern declarative UI framework |
| **Apple Ecosystem** | macOS, watchOS, tvOS integration |
| **App Store** | Access to premium market |
| **Job Market** | High-paying iOS developer roles |

---

## 🗺️ Learning Path

```
┌─────────────────────────────────────────────────────────────────┐
│                     iOS DEVELOPMENT ROADMAP                      │
└─────────────────────────────────────────────────────────────────┘

📱 BEGINNER (0-3 months)
├── Swift Fundamentals
│   ├── Variables, Types, Optionals
│   ├── Classes, Structs, Enums
│   ├── Protocols and Extensions
│   └── Error Handling
├── SwiftUI Basics
│   ├── Views and Modifiers
│   ├── Layouts (VStack, HStack, ZStack)
│   ├── State Management
│   └── Navigation
└── First Apps
    ├── Hello World
    ├── Counter App
    └── Todo List

⚡ INTERMEDIATE (3-6 months)
├── Architecture
│   ├── MVVM Pattern
│   ├── ObservableObject
│   └── Combine basics
├── Data Management
│   ├── Core Data
│   ├── UserDefaults
│   └── URLSession
├── Advanced SwiftUI
│   ├── Custom Views
│   ├── Animations
│   └── Gestures
└── Projects
    ├── Weather App
    ├── Notes App
    └── Photo Gallery

🚀 ADVANCED (6-12 months)
├── Advanced Patterns
│   ├── Clean Architecture
│   ├── Dependency Injection
│   └── Modularization
├── Combine & Async
│   ├── Publishers/Subscribers
│   ├── async/await
│   └── Structured Concurrency
├── Testing
│   ├── XCTest
│   ├── UI Testing
│   └── TDD
└── Publishing
    ├── App Store
    ├── TestFlight
    └── CI/CD
```

---

## 🚀 Getting Started

### Prerequisites
- Mac with macOS Ventura or later
- Xcode (latest version from App Store)
- Apple Developer Account (for device testing/publishing)

### Create First Project

1. Open Xcode
2. File → New → Project
3. Select "App" under iOS
4. Configure:
   - Product Name: MyFirstApp
   - Interface: SwiftUI
   - Language: Swift

### Project Structure

```
MyFirstApp/
├── MyFirstApp.swift         # App entry point
├── ContentView.swift        # Main view
├── Assets.xcassets/         # Images, colors
├── Preview Content/         # SwiftUI previews
└── Info.plist               # App configuration
```

---

## 📖 Curriculum

### [Swift Fundamentals](./Swift/)

**Topics:**
- Variables and Constants
- Optionals and Unwrapping
- Collections
- Control Flow
- Functions and Closures
- Classes, Structs, Enums
- Protocols and Extensions
- Error Handling
- Generics

**Sample Code:**
```swift
// Variables
let name: String = "Swift"
var count: Int = 0

// Optionals
var optionalName: String? = nil
let unwrapped = optionalName ?? "Default"

// Struct
struct User: Identifiable {
    let id: UUID
    var name: String
    var email: String
}

// Protocol
protocol DataFetching {
    func fetchData() async throws -> [User]
}

// Async/await
func loadUsers() async throws -> [User] {
    let url = URL(string: "https://api.example.com/users")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([User].self, from: data)
}
```

### SwiftUI Basics

**Topics:**
- Views and Modifiers
- State and Binding
- Lists and Navigation
- Forms and Input
- Styling and Theming

**Sample Code:**
```swift
struct ContentView: View {
    @State private var name = ""
    @State private var count = 0
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Hello, \(name.isEmpty ? "World" : name)!")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            TextField("Enter your name", text: $name)
                .textFieldStyle(.roundedBorder)
                .padding(.horizontal)
            
            HStack {
                Button("−") { count -= 1 }
                    .buttonStyle(.bordered)
                
                Text("\(count)")
                    .font(.title)
                    .frame(width: 100)
                
                Button("+") { count += 1 }
                    .buttonStyle(.borderedProminent)
            }
        }
        .padding()
    }
}
```

### Architecture (MVVM)

```swift
// Model
struct Task: Identifiable, Codable {
    let id: UUID
    var title: String
    var isCompleted: Bool
}

// ViewModel
@MainActor
class TaskViewModel: ObservableObject {
    @Published var tasks: [Task] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    func addTask(title: String) {
        let task = Task(id: UUID(), title: title, isCompleted: false)
        tasks.append(task)
    }
    
    func toggleTask(_ task: Task) {
        if let index = tasks.firstIndex(where: { $0.id == task.id }) {
            tasks[index].isCompleted.toggle()
        }
    }
    
    func deleteTask(_ task: Task) {
        tasks.removeAll { $0.id == task.id }
    }
}

// View
struct TaskListView: View {
    @StateObject private var viewModel = TaskViewModel()
    @State private var newTaskTitle = ""
    
    var body: some View {
        NavigationStack {
            List {
                ForEach(viewModel.tasks) { task in
                    TaskRow(task: task) {
                        viewModel.toggleTask(task)
                    }
                }
                .onDelete { indexSet in
                    indexSet.forEach { viewModel.deleteTask(viewModel.tasks[$0]) }
                }
            }
            .navigationTitle("Tasks")
            .toolbar {
                ToolbarItem(placement: .bottomBar) {
                    HStack {
                        TextField("New task", text: $newTaskTitle)
                        Button("Add") {
                            viewModel.addTask(title: newTaskTitle)
                            newTaskTitle = ""
                        }
                        .disabled(newTaskTitle.isEmpty)
                    }
                }
            }
        }
    }
}
```

---

## 📚 Resources

### Official Documentation
- [Swift Documentation](https://www.swift.org/documentation/)
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui/)
- [Apple Developer](https://developer.apple.com/)
- [Swift Playgrounds](https://www.apple.com/swift/playgrounds/)

### Free Courses
- [Swift Playgrounds](https://www.apple.com/swift/playgrounds/)
- [100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui)
- [Stanford CS193p](https://cs193p.sites.stanford.edu/)

### Books
- "Swift Programming" by Big Nerd Ranch
- "SwiftUI by Tutorials" by Kodeco (Ray Wenderlich)
- "Pro iPhone Development with Swift 5" by Wallace Wang

### YouTube Channels
- [Paul Hudson](https://www.youtube.com/@twostraws)
- [Swiftful Thinking](https://www.youtube.com/@SwiftfulThinking)
- [Kodeco](https://www.youtube.com/@Kodeco)

### Websites
- [Hacking with Swift](https://www.hackingwithswift.com/)
- [Swift by Sundell](https://www.swiftbysundell.com/)
- [Kodeco](https://www.kodeco.com/)

---

## ✅ Skill Checklist

### Beginner
- [ ] Master Swift basics
- [ ] Understand optionals
- [ ] Create SwiftUI views
- [ ] Use State and Binding
- [ ] Implement navigation

### Intermediate
- [ ] Apply MVVM architecture
- [ ] Use ObservableObject
- [ ] Fetch data from APIs
- [ ] Store data locally
- [ ] Create custom components

### Advanced
- [ ] Master Combine framework
- [ ] Use async/await
- [ ] Write unit tests
- [ ] Implement UI tests
- [ ] Publish to App Store

---

**Start your iOS journey: [Swift Fundamentals](./Swift/) →**
