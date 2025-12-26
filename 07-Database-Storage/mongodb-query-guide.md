# Complete MongoDB Query Parameters Guide

## Table of Contents
1. [MongoDB Basics](#mongodb-basics)
2. [Basic CRUD Operations](#basic-crud-operations)
3. [Query Operators](#query-operators)
4. [Projection](#projection)
5. [Sorting, Limiting & Pagination](#sorting-limiting--pagination)
6. [Working with Nested Documents & Arrays](#working-with-nested-documents--arrays)
7. [Update Operators](#update-operators)
8. [Aggregation Pipeline](#aggregation-pipeline)
9. [Performance & Indexing](#performance--indexing)
10. [Practice Exercises](#practice-exercises)

---

## MongoDB Basics

### What is MongoDB?
MongoDB is a NoSQL database that stores data in flexible, JSON-like documents called BSON (Binary JSON).

### Basic Structure
```javascript
// A MongoDB document looks like this:
{
  _id: ObjectId("507f1f77bcf86cd799439011"),  // Unique identifier (auto-generated)
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  hobbies: ["reading", "cycling"],
  address: {
    street: "123 Main St",
    city: "New York"
  }
}
```

### Key Concepts
- **Database**: Container for collections
- **Collection**: Group of documents (similar to a table in SQL)
- **Document**: A single record (similar to a row in SQL)
- **Field**: A key-value pair in a document (similar to a column in SQL)

---

## Basic CRUD Operations

### 1. CREATE - Insert Documents

#### Insert One Document
```javascript
db.users.insertOne({
  name: "Alice Smith",
  age: 25,
  email: "alice@example.com",
  role: "developer"
})

// Returns: { acknowledged: true, insertedId: ObjectId("...") }
```

#### Insert Multiple Documents
```javascript
db.users.insertMany([
  { name: "Bob Johnson", age: 32, email: "bob@example.com", role: "manager" },
  { name: "Carol White", age: 28, email: "carol@example.com", role: "designer" },
  { name: "David Brown", age: 35, email: "david@example.com", role: "developer" }
])

// Returns: { acknowledged: true, insertedIds: { ... } }
```

---

### 2. READ - Query Documents

#### Find All Documents
```javascript
db.users.find()
// Returns all documents in the collection
```

#### Find with Specific Criteria
```javascript
// Find users named "Alice Smith"
db.users.find({ name: "Alice Smith" })

// Find users older than 30
db.users.find({ age: { $gt: 30 } })

// Find developers
db.users.find({ role: "developer" })
```

#### Find One Document
```javascript
db.users.findOne({ email: "alice@example.com" })
// Returns the first matching document (or null if none found)
```

---

### 3. UPDATE - Modify Documents

#### Update One Document
```javascript
db.users.updateOne(
  { name: "Alice Smith" },           // Filter: which document to update
  { $set: { age: 26 } }              // Update: what to change
)

// Returns: { acknowledged: true, matchedCount: 1, modifiedCount: 1 }
```

#### Update Multiple Documents
```javascript
db.users.updateMany(
  { role: "developer" },             // Filter: all developers
  { $set: { department: "Engineering" } }
)
```

#### Replace Entire Document
```javascript
db.users.replaceOne(
  { name: "Bob Johnson" },
  {
    name: "Bob Johnson",
    age: 33,
    email: "bob.johnson@example.com",
    role: "senior manager"
  }
)
```

---

### 4. DELETE - Remove Documents

#### Delete One Document
```javascript
db.users.deleteOne({ name: "Carol White" })
// Returns: { acknowledged: true, deletedCount: 1 }
```

#### Delete Multiple Documents
```javascript
db.users.deleteMany({ age: { $lt: 25 } })
// Deletes all users younger than 25
```

#### Delete All Documents
```javascript
db.users.deleteMany({})
// Deletes all documents in the collection
```

---

## Query Operators

### Comparison Operators

#### $eq (Equal)
```javascript
// Find users with age exactly 30
db.users.find({ age: { $eq: 30 } })
// Shorthand: db.users.find({ age: 30 })
```

#### $ne (Not Equal)
```javascript
// Find users who are not developers
db.users.find({ role: { $ne: "developer" } })
```

#### $gt (Greater Than) & $gte (Greater Than or Equal)
```javascript
// Find users older than 30
db.users.find({ age: { $gt: 30 } })

// Find users 30 or older
db.users.find({ age: { $gte: 30 } })
```

#### $lt (Less Than) & $lte (Less Than or Equal)
```javascript
// Find users younger than 30
db.users.find({ age: { $lt: 30 } })

// Find users 30 or younger
db.users.find({ age: { $lte: 30 } })
```

#### $in (In Array)
```javascript
// Find users who are developers or designers
db.users.find({ role: { $in: ["developer", "designer"] } })

// Find users aged 25, 30, or 35
db.users.find({ age: { $in: [25, 30, 35] } })
```

#### $nin (Not In Array)
```javascript
// Find users who are neither developers nor designers
db.users.find({ role: { $nin: ["developer", "designer"] } })
```

---

### Logical Operators

#### $and (AND)
```javascript
// Find developers older than 30
db.users.find({
  $and: [
    { role: "developer" },
    { age: { $gt: 30 } }
  ]
})

// Implicit AND (shorter syntax)
db.users.find({ role: "developer", age: { $gt: 30 } })
```

#### $or (OR)
```javascript
// Find users who are either developers OR older than 30
db.users.find({
  $or: [
    { role: "developer" },
    { age: { $gt: 30 } }
  ]
})
```

#### $nor (NOR - Neither/Nor)
```javascript
// Find users who are neither developers nor older than 30
db.users.find({
  $nor: [
    { role: "developer" },
    { age: { $gt: 30 } }
  ]
})
```

#### $not (NOT)
```javascript
// Find users who are NOT older than 30
db.users.find({ age: { $not: { $gt: 30 } } })
```

#### Complex Logical Queries
```javascript
// Find developers older than 25 OR managers
db.users.find({
  $or: [
    { $and: [{ role: "developer" }, { age: { $gt: 25 } }] },
    { role: "manager" }
  ]
})
```

---

### Element Operators

#### $exists
```javascript
// Find documents that have a "phone" field
db.users.find({ phone: { $exists: true } })

// Find documents that don't have a "phone" field
db.users.find({ phone: { $exists: false } })
```

#### $type
```javascript
// Find documents where age is a number
db.users.find({ age: { $type: "number" } })

// Find documents where age is a string
db.users.find({ age: { $type: "string" } })

// Common BSON types:
// "double", "string", "object", "array", "bool", "null", "int", "date"
```

---

### Evaluation Operators

#### $regex (Regular Expression)
```javascript
// Find users whose name contains "Smith"
db.users.find({ name: { $regex: /Smith/ } })

// Case-insensitive search for emails ending in ".com"
db.users.find({ email: { $regex: /\.com$/, $options: "i" } })

// Find names starting with "A"
db.users.find({ name: { $regex: /^A/ } })
```

#### $text (Text Search)
```javascript
// First, create a text index
db.users.createIndex({ bio: "text" })

// Search for documents containing "developer" or "engineer"
db.users.find({ $text: { $search: "developer engineer" } })

// Search for exact phrase
db.users.find({ $text: { $search: "\"senior developer\"" } })
```

#### $mod (Modulo)
```javascript
// Find users whose age is even (divisible by 2)
db.users.find({ age: { $mod: [2, 0] } })

// Find users whose age leaves remainder 1 when divided by 3
db.users.find({ age: { $mod: [3, 1] } })
```

#### $expr (Expression)
```javascript
// Find users where age is greater than years of experience
db.users.find({
  $expr: { $gt: ["$age", "$yearsExperience"] }
})
```

---

### Array Operators

#### $all
```javascript
// Find users who have both "javascript" and "python" in skills array
db.users.find({ skills: { $all: ["javascript", "python"] } })
```

#### $elemMatch
```javascript
// For array of objects
db.users.find({
  certifications: {
    $elemMatch: { name: "AWS", level: "Professional" }
  }
})

// For array of values with multiple conditions
db.products.find({
  ratings: { $elemMatch: { $gte: 4, $lte: 5 } }
})
```

#### $size
```javascript
// Find users with exactly 3 skills
db.users.find({ skills: { $size: 3 } })

// Note: $size doesn't accept ranges, only exact numbers
```

---

## Projection

Projection allows you to specify which fields to include or exclude in the results.

### Basic Projection

#### Include Specific Fields
```javascript
// Return only name and email
db.users.find({}, { name: 1, email: 1 })
// _id is included by default

// Exclude _id
db.users.find({}, { name: 1, email: 1, _id: 0 })
```

#### Exclude Specific Fields
```javascript
// Return all fields except password
db.users.find({}, { password: 0 })

// Exclude multiple fields
db.users.find({}, { password: 0, secretKey: 0 })
```

### Array Projection

#### $slice
```javascript
// Get first 3 hobbies
db.users.find({}, { hobbies: { $slice: 3 } })

// Get last 2 hobbies
db.users.find({}, { hobbies: { $slice: -2 } })

// Skip 1, get next 3 hobbies
db.users.find({}, { hobbies: { $slice: [1, 3] } })
```

#### $elemMatch (in projection)
```javascript
// Get only scores greater than 80
db.students.find(
  { name: "John" },
  { scores: { $elemMatch: { $gt: 80 } } }
)
```

#### $ (Positional Operator)
```javascript
// Return only the first matching array element
db.students.find(
  { scores: 85 },
  { "scores.$": 1 }
)
```

---

## Sorting, Limiting & Pagination

### Sorting

#### sort()
```javascript
// Sort by age ascending (1 = ascending)
db.users.find().sort({ age: 1 })

// Sort by age descending (-1 = descending)
db.users.find().sort({ age: -1 })

// Sort by multiple fields
db.users.find().sort({ role: 1, age: -1 })
// First by role (ascending), then by age (descending)
```

### Limiting

#### limit()
```javascript
// Get only the first 5 users
db.users.find().limit(5)

// Get top 3 oldest users
db.users.find().sort({ age: -1 }).limit(3)
```

### Skipping

#### skip()
```javascript
// Skip the first 10 users
db.users.find().skip(10)

// Skip first 5, get next 10
db.users.find().skip(5).limit(10)
```

### Pagination Pattern
```javascript
// Page 1 (items 1-10)
const page = 1
const pageSize = 10
db.users.find()
  .skip((page - 1) * pageSize)
  .limit(pageSize)

// Page 2 (items 11-20)
const page = 2
db.users.find()
  .skip((page - 1) * pageSize)
  .limit(pageSize)

// With sorting
db.users.find()
  .sort({ createdAt: -1 })
  .skip((page - 1) * pageSize)
  .limit(pageSize)
```

### count()
```javascript
// Count all users
db.users.countDocuments()

// Count users matching criteria
db.users.countDocuments({ role: "developer" })

// Count with multiple conditions
db.users.countDocuments({ role: "developer", age: { $gt: 30 } })
```

---

## Working with Nested Documents & Arrays

### Querying Nested Documents

#### Dot Notation
```javascript
// Sample document
{
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001"
  }
}

// Query nested field
db.users.find({ "address.city": "New York" })

// Query multiple nested fields
db.users.find({ 
  "address.city": "New York",
  "address.zipCode": "10001"
})
```

#### Nested Object Matching
```javascript
// Exact match (order matters!)
db.users.find({
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001"
  }
})
```

### Querying Arrays

#### Array Contains Value
```javascript
// Sample document
{
  name: "Alice",
  skills: ["javascript", "python", "mongodb"]
}

// Find users with "python" skill
db.users.find({ skills: "python" })

// Find users with javascript AND python
db.users.find({ skills: { $all: ["javascript", "python"] } })
```

#### Array of Objects
```javascript
// Sample document
{
  name: "Bob",
  projects: [
    { name: "Project A", status: "completed", budget: 10000 },
    { name: "Project B", status: "in progress", budget: 15000 }
  ]
}

// Find users with any completed project
db.users.find({ "projects.status": "completed" })

// Find users with completed projects with budget > 5000
db.users.find({
  projects: {
    $elemMatch: { status: "completed", budget: { $gt: 5000 } }
  }
})
```

### Updating Nested Documents

```javascript
// Update nested field
db.users.updateOne(
  { name: "John" },
  { $set: { "address.city": "Boston" } }
)

// Update array element by position
db.users.updateOne(
  { name: "Alice" },
  { $set: { "skills.0": "javascript" } }
)

// Update first matching array element
db.users.updateOne(
  { "projects.name": "Project A" },
  { $set: { "projects.$.status": "archived" } }
)
```

---

## Update Operators

### Field Update Operators

#### $set
```javascript
// Set or update a field
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 26, role: "senior developer" } }
)
```

#### $unset
```javascript
// Remove a field
db.users.updateOne(
  { name: "Alice" },
  { $unset: { tempField: "" } }
)
```

#### $rename
```javascript
// Rename a field
db.users.updateOne(
  { name: "Alice" },
  { $rename: { "phone": "phoneNumber" } }
)
```

#### $inc
```javascript
// Increment age by 1
db.users.updateOne(
  { name: "Alice" },
  { $inc: { age: 1 } }
)

// Decrement by using negative value
db.products.updateOne(
  { name: "Widget" },
  { $inc: { stock: -5 } }
)
```

#### $mul
```javascript
// Multiply price by 1.1 (10% increase)
db.products.updateOne(
  { name: "Widget" },
  { $mul: { price: 1.1 } }
)
```

#### $min & $max
```javascript
// Update only if new value is less than current
db.scores.updateOne(
  { player: "Alice" },
  { $min: { lowScore: 85 } }
)

// Update only if new value is greater than current
db.scores.updateOne(
  { player: "Alice" },
  { $max: { highScore: 95 } }
)
```

#### $currentDate
```javascript
// Set field to current date
db.users.updateOne(
  { name: "Alice" },
  { $currentDate: { lastModified: true } }
)

// Set as timestamp
db.users.updateOne(
  { name: "Alice" },
  { $currentDate: { lastLogin: { $type: "timestamp" } } }
)
```

### Array Update Operators

#### $push
```javascript
// Add one item to array
db.users.updateOne(
  { name: "Alice" },
  { $push: { skills: "docker" } }
)

// Add multiple items
db.users.updateOne(
  { name: "Alice" },
  { $push: { skills: { $each: ["kubernetes", "terraform"] } } }
)

// Add and sort
db.users.updateOne(
  { name: "Alice" },
  { 
    $push: { 
      scores: { 
        $each: [85, 92],
        $sort: -1  // Sort descending
      }
    }
  }
)

// Add and limit array size
db.users.updateOne(
  { name: "Alice" },
  { 
    $push: { 
      recentSearches: { 
        $each: ["mongodb"],
        $slice: -10  // Keep last 10 items
      }
    }
  }
)
```

#### $pop
```javascript
// Remove last element
db.users.updateOne(
  { name: "Alice" },
  { $pop: { skills: 1 } }
)

// Remove first element
db.users.updateOne(
  { name: "Alice" },
  { $pop: { skills: -1 } }
)
```

#### $pull
```javascript
// Remove specific value from array
db.users.updateOne(
  { name: "Alice" },
  { $pull: { skills: "python" } }
)

// Remove multiple values
db.users.updateOne(
  { name: "Alice" },
  { $pull: { skills: { $in: ["python", "java"] } } }
)

// Remove with condition
db.students.updateOne(
  { name: "John" },
  { $pull: { scores: { $lt: 70 } } }
)
```

#### $pullAll
```javascript
// Remove all specified values
db.users.updateOne(
  { name: "Alice" },
  { $pullAll: { skills: ["python", "java", "c++"] } }
)
```

#### $addToSet
```javascript
// Add to array only if not already present (prevents duplicates)
db.users.updateOne(
  { name: "Alice" },
  { $addToSet: { skills: "python" } }
)

// Add multiple unique values
db.users.updateOne(
  { name: "Alice" },
  { $addToSet: { skills: { $each: ["python", "java", "go"] } } }
)
```

---

## Aggregation Pipeline

The aggregation pipeline processes documents through multiple stages to transform and analyze data.

### Basic Structure
```javascript
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
])
```

### $match
```javascript
// Filter documents (like find)
db.orders.aggregate([
  { $match: { status: "completed" } }
])

// Multiple conditions
db.orders.aggregate([
  { $match: { 
    status: "completed",
    total: { $gt: 100 }
  }}
])
```

### $group
```javascript
// Group by field and count
db.orders.aggregate([
  {
    $group: {
      _id: "$status",           // Group by status field
      count: { $sum: 1 }        // Count documents
    }
  }
])

// Group and sum
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$total" },
      orderCount: { $sum: 1 }
    }
  }
])

// Group by multiple fields
db.orders.aggregate([
  {
    $group: {
      _id: { 
        customer: "$customerId",
        status: "$status"
      },
      total: { $sum: "$amount" }
    }
  }
])
```

### $project
```javascript
// Include/exclude fields
db.users.aggregate([
  {
    $project: {
      name: 1,
      email: 1,
      _id: 0
    }
  }
])

// Create computed fields
db.users.aggregate([
  {
    $project: {
      name: 1,
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      age: 1
    }
  }
])

// Mathematical operations
db.products.aggregate([
  {
    $project: {
      name: 1,
      discountedPrice: { 
        $multiply: ["$price", 0.9]  // 10% off
      }
    }
  }
])
```

### $sort
```javascript
// Sort results
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $sort: { total: -1 } }  // Sort by total descending
])
```

### $limit & $skip
```javascript
// Limit results
db.orders.aggregate([
  { $sort: { total: -1 } },
  { $limit: 10 }  // Top 10 orders
])

// Pagination
db.orders.aggregate([
  { $sort: { createdAt: -1 } },
  { $skip: 20 },
  { $limit: 10 }
])
```

### $unwind
```javascript
// Deconstruct array field
// Before:
{ name: "Alice", skills: ["python", "javascript", "mongodb"] }

db.users.aggregate([
  { $unwind: "$skills" }
])

// After (3 documents):
{ name: "Alice", skills: "python" }
{ name: "Alice", skills: "javascript" }
{ name: "Alice", skills: "mongodb" }
```

### $lookup (Join)
```javascript
// Left outer join
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",           // Collection to join
      localField: "customerId",    // Field from orders
      foreignField: "_id",         // Field from customers
      as: "customerInfo"           // Output array field
    }
  }
])
```

### $addFields
```javascript
// Add new fields without removing existing ones
db.products.aggregate([
  {
    $addFields: {
      discountedPrice: { $multiply: ["$price", 0.9] },
      inStock: { $gt: ["$quantity", 0] }
    }
  }
])
```

### $count
```javascript
// Count documents
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $count: "completedOrders" }
])
```

### Complex Aggregation Example
```javascript
// Calculate total sales per category for 2024
db.orders.aggregate([
  // Stage 1: Filter 2024 orders
  {
    $match: {
      orderDate: {
        $gte: ISODate("2024-01-01"),
        $lt: ISODate("2025-01-01")
      }
    }
  },
  
  // Stage 2: Unwind items array
  { $unwind: "$items" },
  
  // Stage 3: Group by category
  {
    $group: {
      _id: "$items.category",
      totalRevenue: { $sum: "$items.price" },
      totalQuantity: { $sum: "$items.quantity" },
      avgPrice: { $avg: "$items.price" }
    }
  },
  
  // Stage 4: Sort by revenue
  { $sort: { totalRevenue: -1 } },
  
  // Stage 5: Limit to top 10
  { $limit: 10 },
  
  // Stage 6: Format output
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalRevenue: { $round: ["$totalRevenue", 2] },
      totalQuantity: 1,
      avgPrice: { $round: ["$avgPrice", 2] }
    }
  }
])
```

### Common Aggregation Operators

#### Arithmetic
```javascript
$add, $subtract, $multiply, $divide, $mod
$abs, $ceil, $floor, $round, $sqrt, $pow
```

#### String
```javascript
$concat, $substr, $toLower, $toUpper, $split
$trim, $ltrim, $rtrim
```

#### Array
```javascript
$size, $slice, $arrayElemAt, $concatArrays
$filter, $map, $reduce
```

#### Conditional
```javascript
// $cond (if-then-else)
{
  $project: {
    name: 1,
    priceCategory: {
      $cond: {
        if: { $gte: ["$price", 100] },
        then: "expensive",
        else: "affordable"
      }
    }
  }
}

// $switch (multiple conditions)
{
  $project: {
    name: 1,
    grade: {
      $switch: {
        branches: [
          { case: { $gte: ["$score", 90] }, then: "A" },
          { case: { $gte: ["$score", 80] }, then: "B" },
          { case: { $gte: ["$score", 70] }, then: "C" }
        ],
        default: "F"
      }
    }
  }
}
```

---

## Performance & Indexing

### Why Indexes Matter
Without indexes, MongoDB must scan every document (collection scan). Indexes allow MongoDB to quickly locate documents.

### Creating Indexes

#### Single Field Index
```javascript
// Create ascending index on age field
db.users.createIndex({ age: 1 })

// Create descending index
db.users.createIndex({ age: -1 })
```

#### Compound Index
```javascript
// Index on multiple fields
db.users.createIndex({ role: 1, age: -1 })
// Good for queries like: { role: "developer", age: { $gt: 30 } }
```

#### Unique Index
```javascript
// Ensure field values are unique
db.users.createIndex({ email: 1 }, { unique: true })
```

#### Text Index
```javascript
// For text search
db.articles.createIndex({ content: "text", title: "text" })
```

#### Geospatial Index
```javascript
// For location queries
db.places.createIndex({ location: "2dsphere" })
```

### Index Operations

```javascript
// List all indexes
db.users.getIndexes()

// Drop an index
db.users.dropIndex("age_1")

// Drop all indexes except _id
db.users.dropIndexes()
```

### Query Optimization

#### explain()
```javascript
// See query execution plan
db.users.find({ age: { $gt: 30 } }).explain("executionStats")

// Look for:
// - executionTimeMillis: How long the query took
// - totalDocsExamined: How many documents were scanned
// - executionStages.stage: "IXSCAN" (good) vs "COLLSCAN" (bad)
```

#### Covered Queries
```javascript
// Query using only indexed fields (fastest)
db.users.createIndex({ age: 1, name: 1 })

// This query is "covered" by the index
db.users.find(
  { age: { $gt: 30 } },
  { age: 1, name: 1, _id: 0 }
)
```

### Best Practices

1. **Index Frequently Queried Fields**
   ```javascript
   // If you often query by email
   db.users.createIndex({ email: 1 })
   ```

2. **Use Compound Indexes Wisely**
   ```javascript
   // Good: Index supports multiple query patterns
   db.orders.createIndex({ customerId: 1, status: 1, createdAt: -1 })
   ```

3. **Avoid Over-Indexing**
   - Indexes speed up reads but slow down writes
   - Each index takes storage space
   - Balance between query performance and write performance

4. **Use Projection to Limit Returned Data**
   ```javascript
   // Only return needed fields
   db.users.find({}, { name: 1, email: 1, _id: 0 })
   ```

5. **Monitor Slow Queries**
   ```javascript
   // Enable profiling
   db.setProfilingLevel(1, { slowms: 100 })  // Log queries > 100ms
   
   // View slow queries
   db.system.profile.find().sort({ ts: -1 }).limit(5)
   ```

---

## Practice Exercises

Now it's time to practice! Here are progressive exercises to solidify your learning.

### Exercise Set 1: Basic Queries

Given this users collection:
```javascript
db.users.insertMany([
  { name: "Alice", age: 25, role: "developer", city: "NYC", salary: 80000 },
  { name: "Bob", age: 32, role: "manager", city: "SF", salary: 120000 },
  { name: "Carol", age: 28, role: "designer", city: "NYC", salary: 75000 },
  { name: "David", age: 35, role: "developer", city: "LA", salary: 95000 },
  { name: "Eve", age: 30, role: "developer", city: "SF", salary: 100000 }
])
```

**Try these queries:**
1. Find all developers
2. Find all users in NYC
3. Find users older than 30
4. Find developers in SF
5. Find users with salary between 80000 and 100000
6. Count how many managers there are

### Exercise Set 2: Complex Queries

Given this orders collection:
```javascript
db.orders.insertMany([
  { 
    orderId: 1, 
    customer: "Alice", 
    items: ["laptop", "mouse"],
    total: 1200,
    status: "completed",
    date: ISODate("2024-01-15")
  },
  { 
    orderId: 2, 
    customer: "Bob", 
    items: ["keyboard", "monitor", "mouse"],
    total: 800,
    status: "pending",
    date: ISODate("2024-02-20")
  },
  { 
    orderId: 3, 
    customer: "Alice", 
    items: ["phone"],
    total: 600,
    status: "completed",
    date: ISODate("2024-03-10")
  }
])
```

**Try these queries:**
1. Find orders with total > 700
2. Find Alice's orders
3. Find orders that include "mouse"
4. Find completed orders in 2024
5. Find orders with more than 2 items
6. Update order 2 status to "completed"
7. Add "shipped" status to all completed orders

### Exercise Set 3: Aggregation

**Using the orders collection above:**
1. Calculate total sales per customer
2. Count orders by status
3. Find average order total
4. Find the customer with highest total spending
5. Count how many orders contain "mouse"

### Exercise Set 4: Real-World Scenario

Create a blog database with posts and comments:
```javascript
db.posts.insertMany([
  {
    title: "Getting Started with MongoDB",
    author: "Alice",
    content: "MongoDB is a NoSQL database...",
    tags: ["database", "mongodb", "tutorial"],
    likes: 45,
    comments: [
      { user: "Bob", text: "Great post!", date: ISODate("2024-01-20") },
      { user: "Carol", text: "Very helpful", date: ISODate("2024-01-21") }
    ],
    published: ISODate("2024-01-15")
  },
  {
    title: "Advanced Query Techniques",
    author: "Bob",
    content: "Let's explore aggregation...",
    tags: ["database", "mongodb", "advanced"],
    likes: 67,
    comments: [
      { user: "Alice", text: "Mind blown!", date: ISODate("2024-02-05") }
    ],
    published: ISODate("2024-02-01")
  }
])
```

**Build these queries:**
1. Find all posts by Alice
2. Find posts with "mongodb" tag
3. Find posts with more than 50 likes
4. Add a new comment to a post
5. Count total comments across all posts
6. Find posts published in January 2024
7. Increment likes on a post
8. Find posts where Bob commented
9. List all unique tags used
10. Calculate average number of comments per post

---

## Quick Reference Card

### Query Syntax
```javascript
db.collection.find(filter, projection)
db.collection.findOne(filter, projection)
db.collection.insertOne(document)
db.collection.insertMany([documents])
db.collection.updateOne(filter, update)
db.collection.updateMany(filter, update)
db.collection.deleteOne(filter)
db.collection.deleteMany(filter)
```

### Common Operators
```javascript
// Comparison
$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin

// Logical
$and, $or, $nor, $not

// Element
$exists, $type

// Array
$all, $elemMatch, $size

// Update
$set, $unset, $inc, $push, $pull, $addToSet
```

### Aggregation Stages
```javascript
$match, $group, $project, $sort, $limit, $skip
$unwind, $lookup, $addFields, $count
```

---

## Next Steps

1. **Practice Regularly**: Set up a local MongoDB and practice these queries
2. **Build Projects**: Create a real application (blog, e-commerce, task manager)
3. **Learn Advanced Topics**:
   - Transactions
   - Replication
   - Sharding
   - Schema design patterns
   - Data modeling
4. **Explore Tools**:
   - MongoDB Compass (GUI)
   - MongoDB Atlas (cloud database)
   - Mongoose (ODM for Node.js)

## Resources
- Official MongoDB Documentation: docs.mongodb.com
- MongoDB University: university.mongodb.com (free courses)
- MongoDB Cheat Sheet: Keep this guide handy!

---

**Happy Querying! 🍃**