# 🦋 Flutter - Complete Learning Path

> **Build beautiful, natively compiled applications from a single codebase**

[![Flutter](https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-0175C2?style=flat&logo=dart&logoColor=white)](https://dart.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 📚 Table of Contents

- [Why Flutter?](#-why-flutter)
- [Learning Path Overview](#️-learning-path-overview)
- [Getting Started](#-getting-started)
- [Detailed Curriculum](#-detailed-curriculum)
- [Projects to Build](#️-projects-to-build)
- [Resources](#-resources)

---

## 🎯 Why Flutter?

| Advantage | Description |
|-----------|-------------|
| **Single Codebase** | iOS, Android, Web, Desktop from one code |
| **Beautiful UI** | Customizable widgets, Material & Cupertino |
| **Fast Development** | Hot reload for instant changes |
| **Native Performance** | Compiles to native ARM code |
| **Rich Ecosystem** | Extensive packages on pub.dev |
| **Google Backed** | Strong support and active development |

### Who Uses Flutter?
- Google, Alibaba, BMW, eBay, Square, Tencent, ByteDance

---

## 🗺️ Learning Path Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      FLUTTER ROADMAP                             │
└─────────────────────────────────────────────────────────────────┘

📱 BEGINNER (0-2 months)
├── Dart Language
│   ├── Variables, Types, Functions
│   ├── Classes and OOP
│   ├── Async/Await, Futures
│   └── Null Safety
├── Flutter Basics
│   ├── Widgets (Stateless/Stateful)
│   ├── Layout (Row, Column, Stack)
│   ├── Material/Cupertino Design
│   └── Navigation
└── First Projects
    ├── Counter App
    ├── Profile Card
    └── Todo List

⚡ INTERMEDIATE (2-4 months)
├── State Management
│   ├── Provider
│   ├── Riverpod
│   └── BLoC Pattern
├── Data & Networking
│   ├── HTTP/Dio
│   ├── JSON Parsing
│   └── REST API Integration
├── Local Storage
│   ├── SharedPreferences
│   ├── Hive
│   └── SQLite
└── Intermediate Projects
    ├── Weather App
    ├── Notes App
    └── E-commerce App

🚀 ADVANCED (4-6 months)
├── Advanced UI
│   ├── Custom Painters
│   ├── Complex Animations
│   └── Slivers
├── Architecture
│   ├── Clean Architecture
│   ├── Repository Pattern
│   └── Dependency Injection
├── Testing
│   ├── Unit Tests
│   ├── Widget Tests
│   └── Integration Tests
└── Publishing
    ├── App Store
    ├── Play Store
    └── CI/CD
```

---

## 🚀 Getting Started

### Installation

**macOS:**
```bash
# Download Flutter SDK
git clone https://github.com/flutter/flutter.git -b stable

# Add to PATH
export PATH="$PATH:`pwd`/flutter/bin"

# Verify installation
flutter doctor
```

**Windows:**
1. Download Flutter SDK from [flutter.dev](https://flutter.dev/docs/get-started/install/windows)
2. Extract to `C:\src\flutter`
3. Add `C:\src\flutter\bin` to PATH
4. Run `flutter doctor`

### Create First Project

```bash
# Create new project
flutter create my_first_app

# Navigate to project
cd my_first_app

# Run on connected device/emulator
flutter run
```

### Project Structure

```
my_first_app/
├── lib/
│   └── main.dart         # Entry point
├── test/                  # Test files
├── android/               # Android-specific
├── ios/                   # iOS-specific
├── pubspec.yaml           # Dependencies
└── README.md
```

---

## 📖 Detailed Curriculum

### 📱 [Beginner Level](./01-Beginner/)
- Dart programming fundamentals
- Flutter widgets and layouts
- Navigation and routing
- Basic state management
- **Time:** 6-8 weeks

### ⚡ [Intermediate Level](./02-Intermediate/)
- State management solutions
- API integration and networking
- Local data persistence
- Forms and validation
- **Time:** 6-8 weeks

### 🚀 [Advanced Level](./03-Advanced/)
- Custom widgets and painters
- Advanced animations
- App architecture
- Testing and deployment
- **Time:** 6-8 weeks

---

## 🛠️ Projects to Build

### Beginner
1. **Counter App** - StatefulWidget basics
2. **Profile Card** - Layout and styling
3. **Quiz App** - Navigation and state
4. **Calculator** - Grid layout and logic

### Intermediate
5. **Weather App** - API integration
6. **Notes App** - CRUD with local storage
7. **Recipe App** - Lists and details
8. **Chat UI** - Complex layouts

### Advanced
9. **E-commerce App** - Full feature set
10. **Social Media Clone** - Authentication, real-time
11. **Expense Tracker** - Charts, database
12. **Streaming App** - Video playback, animations

---

## 📚 Resources

### Official Documentation
- [Flutter Docs](https://docs.flutter.dev/)
- [Dart Docs](https://dart.dev/guides)
- [Flutter Cookbook](https://docs.flutter.dev/cookbook)

### Free Courses
- [Flutter Codelabs](https://docs.flutter.dev/codelabs)
- [Flutter YouTube](https://www.youtube.com/@flutterdev)
- [Angela Yu's Flutter Course](https://www.udemy.com/course/flutter-bootcamp-with-dart/)

### YouTube Channels
- [Flutter](https://www.youtube.com/@flutterdev) - Official
- [Reso Coder](https://www.youtube.com/@ResoCoder) - Architecture
- [Fireship](https://www.youtube.com/@Fireship) - Quick tutorials
- [Code with Andrea](https://www.youtube.com/@codewithandrea) - Best practices

---

## ✅ Skill Checklist

### Beginner
- [ ] Master Dart fundamentals
- [ ] Understand widget tree
- [ ] Use common widgets
- [ ] Implement navigation
- [ ] Build 3 beginner projects

### Intermediate
- [ ] Implement Provider/Riverpod
- [ ] Fetch data from APIs
- [ ] Store data locally
- [ ] Build forms with validation
- [ ] Build 3 intermediate projects

### Advanced
- [ ] Create custom widgets
- [ ] Implement animations
- [ ] Apply clean architecture
- [ ] Write comprehensive tests
- [ ] Publish to app stores

---

**Ready to flutter? Start with [Beginner Level](./01-Beginner/)! 🦋**
