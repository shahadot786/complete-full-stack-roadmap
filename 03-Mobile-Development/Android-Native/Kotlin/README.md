# 📘 Kotlin for Android Development

> **Master Kotlin for modern Android development**

---

## 📋 Table of Contents

- [Kotlin Basics](#kotlin-basics)
- [Object-Oriented Programming](#object-oriented-programming)
- [Functional Programming](#functional-programming)
- [Coroutines](#coroutines)
- [Android with Kotlin](#android-with-kotlin)

---

## 🎯 Kotlin Basics

### Variables and Types

```kotlin
// Immutable (val) - Preferred
val name: String = "Kotlin"
val age: Int = 10
val pi: Double = 3.14159
val isAwesome: Boolean = true

// Mutable (var)
var count: Int = 0
count = 1

// Type inference
val language = "Kotlin"  // Inferred as String
val version = 2.0        // Inferred as Double

// String templates
val greeting = "Hello, $name! Version ${version.toInt()}"

// Multi-line strings
val json = """
    {
        "name": "$name",
        "version": $version
    }
""".trimIndent()
```

### Null Safety

```kotlin
// Nullable types
var nullableName: String? = "Kotlin"
nullableName = null  // OK

// Non-null types
var nonNullName: String = "Kotlin"
// nonNullName = null  // Compile error!

// Safe calls
val length: Int? = nullableName?.length

// Elvis operator
val len: Int = nullableName?.length ?: 0

// Not-null assertion (use sparingly!)
val definiteLength: Int = nullableName!!.length

// Safe cast
val obj: Any = "Hello"
val str: String? = obj as? String

// Let scope function
nullableName?.let { name ->
    println("Name is: $name")
}
```

### Functions

```kotlin
// Basic function
fun add(a: Int, b: Int): Int {
    return a + b
}

// Single expression function
fun multiply(a: Int, b: Int): Int = a * b

// Default parameters
fun greet(name: String, greeting: String = "Hello"): String {
    return "$greeting, $name!"
}

// Named arguments
greet(name = "Kotlin", greeting = "Welcome")

// Varargs
fun sum(vararg numbers: Int): Int {
    return numbers.sum()
}

// Extension functions
fun String.addEmoji(emoji: String = "🎉"): String {
    return "$this $emoji"
}

"Kotlin".addEmoji()  // "Kotlin 🎉"

// Higher-order functions
fun operation(a: Int, b: Int, op: (Int, Int) -> Int): Int {
    return op(a, b)
}

operation(5, 3) { x, y -> x + y }  // 8
```

### Collections

```kotlin
// Lists
val immutableList = listOf("a", "b", "c")
val mutableList = mutableListOf(1, 2, 3)
mutableList.add(4)

// Maps
val immutableMap = mapOf("a" to 1, "b" to 2)
val mutableMap = mutableMapOf<String, Int>()
mutableMap["c"] = 3

// Sets
val set = setOf(1, 2, 3, 3)  // {1, 2, 3}

// Collection operations
val numbers = listOf(1, 2, 3, 4, 5)

val doubled = numbers.map { it * 2 }           // [2, 4, 6, 8, 10]
val evens = numbers.filter { it % 2 == 0 }     // [2, 4]
val sum = numbers.reduce { acc, n -> acc + n }  // 15
val first = numbers.firstOrNull { it > 3 }     // 4

// Chaining
val result = numbers
    .filter { it % 2 == 0 }
    .map { it * it }
    .sum()  // 20 (4 + 16)
```

### Control Flow

```kotlin
// When expression (enhanced switch)
fun describe(obj: Any): String = when (obj) {
    1 -> "One"
    "Hello" -> "Greeting"
    is Long -> "Long number"
    !is String -> "Not a string"
    else -> "Unknown"
}

// When with ranges
fun gradeToLetter(grade: Int): String = when (grade) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    in 70..79 -> "C"
    in 60..69 -> "D"
    else -> "F"
}

// For loops
for (i in 1..5) { print(i) }        // 12345
for (i in 5 downTo 1) { print(i) }  // 54321
for (i in 1..10 step 2) { print(i) } // 13579

// Destructuring
val (name, age) = Pair("Alice", 25)
val (key, value) = "name" to "Kotlin"
```

---

## 🏗️ Object-Oriented Programming

### Classes

```kotlin
// Basic class
class Person(
    val name: String,
    var age: Int = 0
) {
    // Secondary constructor
    constructor(name: String) : this(name, 0)
    
    // Init block
    init {
        require(age >= 0) { "Age must be positive" }
    }
    
    // Properties
    val isAdult: Boolean
        get() = age >= 18
    
    // Methods
    fun introduce() = "Hi, I'm $name, $age years old"
}

// Usage
val person = Person("Alice", 25)
println(person.introduce())
```

### Data Classes

```kotlin
data class User(
    val id: Int,
    val name: String,
    val email: String
)

// Automatic: equals(), hashCode(), toString(), copy()
val user1 = User(1, "Alice", "alice@example.com")
val user2 = user1.copy(name = "Bob")

// Destructuring
val (id, name, email) = user1
```

### Sealed Classes

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    data object Loading : Result<Nothing>()
}

// Usage with when
fun handleResult(result: Result<String>) {
    when (result) {
        is Result.Success -> println("Data: ${result.data}")
        is Result.Error -> println("Error: ${result.message}")
        is Result.Loading -> println("Loading...")
    }
}
```

### Interfaces and Inheritance

```kotlin
interface Drawable {
    fun draw()
    fun resize(factor: Double) = println("Resizing by $factor")
}

open class Shape(val name: String) {
    open fun area(): Double = 0.0
}

class Circle(
    val radius: Double
) : Shape("Circle"), Drawable {
    
    override fun area(): Double = Math.PI * radius * radius
    
    override fun draw() {
        println("Drawing circle with radius $radius")
    }
}
```

### Object and Companion Object

```kotlin
// Singleton
object Logger {
    fun log(message: String) = println("[LOG] $message")
}

Logger.log("Hello")

// Companion object (static-like)
class User private constructor(val name: String) {
    companion object {
        fun create(name: String): User {
            return User(name.trim())
        }
    }
}

val user = User.create("Alice")
```

---

## 🔄 Functional Programming

### Lambda Expressions

```kotlin
// Lambda syntax
val sum: (Int, Int) -> Int = { a, b -> a + b }

// Trailing lambda
listOf(1, 2, 3).map { it * 2 }

// Function references
fun isEven(n: Int) = n % 2 == 0
listOf(1, 2, 3, 4).filter(::isEven)

// Inline functions
inline fun measureTime(block: () -> Unit): Long {
    val start = System.currentTimeMillis()
    block()
    return System.currentTimeMillis() - start
}
```

### Scope Functions

```kotlin
val user = User("Alice", 25)

// let - transform and return
val nameLength = user.name?.let { it.length }

// run - execute block on object
val greeting = user.run {
    "Hello, $name! You are $age years old."
}

// with - group operations
with(user) {
    println(name)
    println(age)
}

// apply - configure object
val configuredUser = User("Bob", 30).apply {
    // configure...
}

// also - additional actions
val savedUser = user.also {
    println("Saving user: ${it.name}")
}
```

### Sequences

```kotlin
// Lazy evaluation
val result = sequenceOf(1, 2, 3, 4, 5)
    .filter { 
        println("Filter: $it")
        it % 2 == 0 
    }
    .map { 
        println("Map: $it")
        it * it 
    }
    .first()

// Generate sequence
val fibonacci = generateSequence(Pair(0, 1)) { (a, b) -> 
    Pair(b, a + b) 
}.map { it.first }

fibonacci.take(10).toList()  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

## ⚡ Coroutines

### Basics

```kotlin
import kotlinx.coroutines.*

// Launch coroutine
fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
}

// Async/await
suspend fun fetchUser(id: Int): User {
    delay(1000)  // Simulate network call
    return User(id, "User$id", "user$id@example.com")
}

fun main() = runBlocking {
    val user = async { fetchUser(1) }
    val posts = async { fetchPosts(1) }
    
    println("User: ${user.await()}")
    println("Posts: ${posts.await()}")
}
```

### Dispatchers

```kotlin
// Different dispatchers
launch(Dispatchers.Main) {
    // UI operations
}

launch(Dispatchers.IO) {
    // Network/disk operations
}

launch(Dispatchers.Default) {
    // CPU-intensive work
}

// Switch context
suspend fun loadData(): String = withContext(Dispatchers.IO) {
    // Load from network
    "data"
}
```

### Flow

```kotlin
import kotlinx.coroutines.flow.*

// Create flow
fun numbers(): Flow<Int> = flow {
    for (i in 1..5) {
        delay(100)
        emit(i)
    }
}

// Collect flow
fun main() = runBlocking {
    numbers()
        .filter { it % 2 == 0 }
        .map { it * it }
        .collect { println(it) }
}

// StateFlow
class ViewModel {
    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()
    
    fun updateName(name: String) {
        _uiState.update { it.copy(name = name) }
    }
}
```

---

## 📱 Android with Kotlin

### Jetpack Compose Basics

```kotlin
@Composable
fun UserCard(user: User, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = user.avatarUrl,
                contentDescription = "Avatar",
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
            )
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(
                    text = user.name,
                    style = MaterialTheme.typography.titleMedium
                )
                Text(
                    text = user.email,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
```

### ViewModel

```kotlin
class UserViewModel(
    private val repository: UserRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(UserUiState())
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()
    
    init {
        loadUsers()
    }
    
    fun loadUsers() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            try {
                val users = repository.getUsers()
                _uiState.update { 
                    it.copy(isLoading = false, users = users) 
                }
            } catch (e: Exception) {
                _uiState.update { 
                    it.copy(isLoading = false, error = e.message) 
                }
            }
        }
    }
}

data class UserUiState(
    val isLoading: Boolean = false,
    val users: List<User> = emptyList(),
    val error: String? = null
)
```

---

## 📚 Resources

- [Kotlin Documentation](https://kotlinlang.org/docs/)
- [Kotlin Koans](https://play.kotlinlang.org/koans/)
- [Android Kotlin Fundamentals](https://developer.android.com/courses/kotlin-fundamentals/course)
- [Kotlin for Android Developers](https://www.udacity.com/course/developing-android-apps-with-kotlin--ud9012)

---

## ✅ Checklist

- [ ] Understand val vs var
- [ ] Master null safety
- [ ] Use data classes effectively
- [ ] Implement sealed classes
- [ ] Write higher-order functions
- [ ] Use scope functions
- [ ] Understand coroutines
- [ ] Work with Flow
- [ ] Build Compose UI
- [ ] Implement ViewModel

---

**Continue learning Android development! 🤖**
