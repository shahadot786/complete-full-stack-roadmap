# 🚀 Flutter - Advanced Level

> **Build polished, performant, production-ready applications**

---

## 📋 Table of Contents

- [Advanced UI](#advanced-ui)
- [Animations](#animations)
- [Architecture](#architecture)
- [Testing](#testing)
- [Publishing](#publishing)

---

## 🎨 Advanced UI

### Custom Painter

```dart
import 'package:flutter/material.dart';
import 'dart:math' as math;

class CircularProgressPainter extends CustomPainter {
  final double progress;
  final Color backgroundColor;
  final Color progressColor;
  final double strokeWidth;

  CircularProgressPainter({
    required this.progress,
    this.backgroundColor = Colors.grey,
    this.progressColor = Colors.blue,
    this.strokeWidth = 10,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;

    // Background circle
    final backgroundPaint = Paint()
      ..color = backgroundColor.withOpacity(0.3)
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke;

    canvas.drawCircle(center, radius, backgroundPaint);

    // Progress arc
    final progressPaint = Paint()
      ..color = progressColor
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final sweepAngle = 2 * math.pi * progress;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      sweepAngle,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(CircularProgressPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}

// Usage
class CircularProgress extends StatelessWidget {
  final double progress;
  final double size;

  const CircularProgress({
    super.key,
    required this.progress,
    this.size = 100,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: CircularProgressPainter(
          progress: progress,
          progressColor: Theme.of(context).primaryColor,
        ),
        child: Center(
          child: Text(
            '${(progress * 100).toInt()}%',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
```

### Slivers

```dart
class SliverExample extends StatelessWidget {
  const SliverExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // Collapsing app bar
          SliverAppBar(
            expandedHeight: 200,
            floating: false,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              title: const Text('Slivers'),
              background: Image.network(
                'https://picsum.photos/800/400',
                fit: BoxFit.cover,
              ),
            ),
          ),
          
          // Persistent header
          SliverPersistentHeader(
            pinned: true,
            delegate: _SliverHeaderDelegate(
              minHeight: 60,
              maxHeight: 60,
              child: Container(
                color: Colors.blue,
                alignment: Alignment.center,
                child: const Text(
                  'Sticky Header',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ),
          
          // Grid
          SliverGrid(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
            ),
            delegate: SliverChildBuilderDelegate(
              (context, index) => Card(
                child: Center(child: Text('Item $index')),
              ),
              childCount: 10,
            ),
          ),
          
          // List
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) => ListTile(
                title: Text('List Item $index'),
              ),
              childCount: 20,
            ),
          ),
        ],
      ),
    );
  }
}

class _SliverHeaderDelegate extends SliverPersistentHeaderDelegate {
  final double minHeight;
  final double maxHeight;
  final Widget child;

  _SliverHeaderDelegate({
    required this.minHeight,
    required this.maxHeight,
    required this.child,
  });

  @override
  Widget build(context, shrinkOffset, overlapsContent) => child;

  @override
  double get maxExtent => maxHeight;

  @override
  double get minExtent => minHeight;

  @override
  bool shouldRebuild(_SliverHeaderDelegate oldDelegate) {
    return maxHeight != oldDelegate.maxHeight ||
        minHeight != oldDelegate.minHeight ||
        child != oldDelegate.child;
  }
}
```

---

## 🎬 Animations

### Implicit Animations

```dart
class AnimatedContainerExample extends StatefulWidget {
  const AnimatedContainerExample({super.key});

  @override
  State<AnimatedContainerExample> createState() => _AnimatedContainerExampleState();
}

class _AnimatedContainerExampleState extends State<AnimatedContainerExample> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => _expanded = !_expanded),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        width: _expanded ? 200 : 100,
        height: _expanded ? 200 : 100,
        decoration: BoxDecoration(
          color: _expanded ? Colors.blue : Colors.red,
          borderRadius: BorderRadius.circular(_expanded ? 32 : 8),
        ),
        child: Center(
          child: AnimatedDefaultTextStyle(
            duration: const Duration(milliseconds: 300),
            style: TextStyle(
              fontSize: _expanded ? 24 : 14,
              color: Colors.white,
            ),
            child: const Text('Tap me'),
          ),
        ),
      ),
    );
  }
}
```

### Explicit Animations

```dart
class AnimatedLogoExample extends StatefulWidget {
  const AnimatedLogoExample({super.key});

  @override
  State<AnimatedLogoExample> createState() => _AnimatedLogoExampleState();
}

class _AnimatedLogoExampleState extends State<AnimatedLogoExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.elasticOut),
    );

    _rotationAnimation = Tween<double>(begin: 0, end: 2 * math.pi).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _controller.repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Transform.rotate(
            angle: _rotationAnimation.value,
            child: child,
          ),
        );
      },
      child: const FlutterLogo(size: 100),
    );
  }
}
```

### Hero Animations

```dart
// Source screen
class SourceScreen extends StatelessWidget {
  const SourceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
        ),
        itemCount: 10,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => DetailScreen(index: index),
                ),
              );
            },
            child: Hero(
              tag: 'image-$index',
              child: Image.network(
                'https://picsum.photos/200?random=$index',
                fit: BoxFit.cover,
              ),
            ),
          );
        },
      ),
    );
  }
}

// Destination screen
class DetailScreen extends StatelessWidget {
  final int index;

  const DetailScreen({super.key, required this.index});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Hero(
          tag: 'image-$index',
          child: Image.network(
            'https://picsum.photos/800?random=$index',
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}
```

### Staggered Animations

```dart
class StaggeredAnimationExample extends StatefulWidget {
  const StaggeredAnimationExample({super.key});

  @override
  State<StaggeredAnimationExample> createState() => _StaggeredAnimationExampleState();
}

class _StaggeredAnimationExampleState extends State<StaggeredAnimationExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Animation<Offset>> _slideAnimations;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _slideAnimations = List.generate(5, (index) {
      final start = index * 0.1;
      final end = start + 0.4;
      return Tween<Offset>(
        begin: const Offset(-1, 0),
        end: Offset.zero,
      ).animate(
        CurvedAnimation(
          parent: _controller,
          curve: Interval(start, end, curve: Curves.easeOut),
        ),
      );
    });

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(5, (index) {
        return SlideTransition(
          position: _slideAnimations[index],
          child: FadeTransition(
            opacity: _controller,
            child: Container(
              height: 50,
              margin: const EdgeInsets.all(8),
              color: Colors.primaries[index % Colors.primaries.length],
            ),
          ),
        );
      }),
    );
  }
}
```

---

## 🏗️ Architecture

### Clean Architecture

```
lib/
├── core/
│   ├── error/
│   │   ├── exceptions.dart
│   │   └── failures.dart
│   ├── usecases/
│   │   └── usecase.dart
│   └── network/
│       └── network_info.dart
├── features/
│   └── user/
│       ├── data/
│       │   ├── datasources/
│       │   │   ├── user_local_datasource.dart
│       │   │   └── user_remote_datasource.dart
│       │   ├── models/
│       │   │   └── user_model.dart
│       │   └── repositories/
│       │       └── user_repository_impl.dart
│       ├── domain/
│       │   ├── entities/
│       │   │   └── user.dart
│       │   ├── repositories/
│       │   │   └── user_repository.dart
│       │   └── usecases/
│       │       ├── get_user.dart
│       │       └── update_user.dart
│       └── presentation/
│           ├── bloc/
│           │   ├── user_bloc.dart
│           │   ├── user_event.dart
│           │   └── user_state.dart
│           ├── pages/
│           │   └── user_page.dart
│           └── widgets/
│               └── user_card.dart
└── injection_container.dart
```

### Repository Pattern

```dart
// Domain layer - Abstract repository
abstract class UserRepository {
  Future<Either<Failure, User>> getUser(int id);
  Future<Either<Failure, List<User>>> getAllUsers();
  Future<Either<Failure, void>> updateUser(User user);
}

// Data layer - Implementation
class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  final UserLocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  UserRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, User>> getUser(int id) async {
    if (await networkInfo.isConnected) {
      try {
        final user = await remoteDataSource.getUser(id);
        await localDataSource.cacheUser(user);
        return Right(user);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      try {
        final user = await localDataSource.getCachedUser(id);
        return Right(user);
      } on CacheException {
        return Left(CacheFailure());
      }
    }
  }
}
```

### Dependency Injection with GetIt

```yaml
# pubspec.yaml
dependencies:
  get_it: ^7.6.7
  injectable: ^2.3.2

dev_dependencies:
  injectable_generator: ^2.4.1
```

```dart
// injection_container.dart
import 'package:get_it/get_it.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // BLoCs
  sl.registerFactory(() => UserBloc(getUser: sl()));
  
  // Use cases
  sl.registerLazySingleton(() => GetUser(sl()));
  
  // Repositories
  sl.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(
      remoteDataSource: sl(),
      localDataSource: sl(),
      networkInfo: sl(),
    ),
  );
  
  // Data sources
  sl.registerLazySingleton<UserRemoteDataSource>(
    () => UserRemoteDataSourceImpl(client: sl()),
  );
  sl.registerLazySingleton<UserLocalDataSource>(
    () => UserLocalDataSourceImpl(sharedPreferences: sl()),
  );
  
  // External
  final sharedPreferences = await SharedPreferences.getInstance();
  sl.registerLazySingleton(() => sharedPreferences);
  sl.registerLazySingleton(() => http.Client());
}
```

---

## 🧪 Testing

### Unit Tests

```dart
// test/unit/user_repository_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

class MockUserRemoteDataSource extends Mock implements UserRemoteDataSource {}

void main() {
  late UserRepositoryImpl repository;
  late MockUserRemoteDataSource mockRemoteDataSource;

  setUp(() {
    mockRemoteDataSource = MockUserRemoteDataSource();
    repository = UserRepositoryImpl(remoteDataSource: mockRemoteDataSource);
  });

  group('getUser', () {
    const testId = 1;
    final testUser = User(id: testId, name: 'Test User');

    test('should return user when remote data source succeeds', () async {
      // Arrange
      when(mockRemoteDataSource.getUser(testId))
          .thenAnswer((_) async => testUser);

      // Act
      final result = await repository.getUser(testId);

      // Assert
      expect(result, Right(testUser));
      verify(mockRemoteDataSource.getUser(testId));
    });

    test('should return failure when remote data source fails', () async {
      // Arrange
      when(mockRemoteDataSource.getUser(testId))
          .thenThrow(ServerException());

      // Act
      final result = await repository.getUser(testId);

      // Assert
      expect(result, Left(ServerFailure()));
    });
  });
}
```

### Widget Tests

```dart
// test/widget/user_card_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('UserCard displays user information', (tester) async {
    // Arrange
    const user = User(id: 1, name: 'John Doe', email: 'john@example.com');

    // Act
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: UserCard(user: user),
        ),
      ),
    );

    // Assert
    expect(find.text('John Doe'), findsOneWidget);
    expect(find.text('john@example.com'), findsOneWidget);
  });

  testWidgets('UserCard calls onTap when tapped', (tester) async {
    // Arrange
    bool tapped = false;
    const user = User(id: 1, name: 'John Doe');

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: UserCard(
            user: user,
            onTap: () => tapped = true,
          ),
        ),
      ),
    );

    // Act
    await tester.tap(find.byType(UserCard));

    // Assert
    expect(tapped, isTrue);
  });
}
```

### Integration Tests

```dart
// integration_test/app_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Complete login flow', (tester) async {
    // Launch app
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    // Enter credentials
    await tester.enterText(
      find.byKey(const Key('email_field')),
      'test@example.com',
    );
    await tester.enterText(
      find.byKey(const Key('password_field')),
      'password123',
    );

    // Tap login button
    await tester.tap(find.byKey(const Key('login_button')));
    await tester.pumpAndSettle();

    // Verify navigation to home screen
    expect(find.text('Welcome!'), findsOneWidget);
  });
}
```

---

## 📦 Publishing

### Build Configuration

```yaml
# pubspec.yaml
name: my_app
description: My awesome Flutter app
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'
```

### Android Release Build

```bash
# Generate keystore
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# Build APK
flutter build apk --release

# Build App Bundle (recommended)
flutter build appbundle --release
```

```properties
# android/key.properties
storePassword=<password>
keyPassword=<password>
keyAlias=upload
storeFile=<path-to-keystore>
```

### iOS Release Build

```bash
# Build for iOS
flutter build ios --release

# Open in Xcode for submission
open ios/Runner.xcworkspace
```

### CI/CD with GitHub Actions

```yaml
# .github/workflows/flutter.yml
name: Flutter CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
          
      - run: flutter pub get
      - run: flutter analyze
      - run: flutter test

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
          
      - run: flutter pub get
      - run: flutter build apk --release
      
      - uses: actions/upload-artifact@v3
        with:
          name: release-apk
          path: build/app/outputs/flutter-apk/app-release.apk

  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
          
      - run: flutter pub get
      - run: flutter build ios --release --no-codesign
```

---

## ✅ Advanced Checklist

- [ ] Create custom painters
- [ ] Build complex sliver layouts
- [ ] Implement implicit animations
- [ ] Create explicit animations
- [ ] Use Hero animations
- [ ] Apply clean architecture
- [ ] Implement repository pattern
- [ ] Set up dependency injection
- [ ] Write unit tests
- [ ] Write widget tests
- [ ] Run integration tests
- [ ] Configure release builds
- [ ] Set up CI/CD pipeline
- [ ] Publish to app stores

---

**Congratulations! You've mastered Flutter! 🎉**

**Explore more: [Resources](../Resources/) →**
