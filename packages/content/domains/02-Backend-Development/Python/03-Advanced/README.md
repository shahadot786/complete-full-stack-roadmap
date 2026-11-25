# 🔥 Advanced Python Backend

> **Master async, microservices, and production deployment**

## Async Python Mastery

### Async Database Operations

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_user(user_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(User).filter(User.id == user_id)
        )
        return result.scalar_one_or_none()

async def create_user(name: str, email: str):
    async with async_session() as session:
        user = User(name=name, email=email)
        session.add(user)
        await session.commit()
        return user
```

### Async Background Tasks

```python
from fastapi import BackgroundTasks

def send_email(email: str, message: str):
    # Simulate email sending
    import time
    time.sleep(3)
    print(f"Email sent to {email}")

@app.post("/users")
async def create_user(user: UserCreate, background_tasks: BackgroundTasks):
    # Create user
    db_user = await create_user_in_db(user)
    
    # Send welcome email in background
    background_tasks.add_task(send_email, user.email, "Welcome!")
    
    return db_user
```

## Celery Task Queue

```bash
pip install celery redis
```

```python
# celery_app.py
from celery import Celery

celery_app = Celery(
    'tasks',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0'
)

@celery_app.task
def process_data(data):
    # Long-running task
    import time
    time.sleep(10)
    return {"status": "processed", "data": data}

@celery_app.task
def send_email_task(email, subject, body):
    # Send email
    return {"status": "sent"}

# Usage in FastAPI
from celery_app import process_data

@app.post("/process")
async def process_endpoint(data: dict):
    task = process_data.delay(data)
    return {"task_id": task.id}

@app.get("/task/{task_id}")
async def get_task_status(task_id: str):
    task = process_data.AsyncResult(task_id)
    return {
        "task_id": task_id,
        "status": task.status,
        "result": task.result
    }

# Run worker: celery -A celery_app worker --loglevel=info
```

## Microservices Architecture

### Service 1: User Service

```python
# user_service/main.py
from fastapi import FastAPI
import httpx

app = FastAPI()

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "name": "John", "email": "john@example.com"}

@app.get("/users/{user_id}/orders")
async def get_user_orders(user_id: int):
    # Call order service
    async with httpx.AsyncClient() as client:
        response = await client.get(f"http://order-service:8001/orders?user_id={user_id}")
        orders = response.json()
    
    return {"user_id": user_id, "orders": orders}
```

### Service 2: Order Service

```python
# order_service/main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/orders")
async def get_orders(user_id: int):
    # Get orders for user
    orders = [
        {"id": 1, "user_id": user_id, "total": 100},
        {"id": 2, "user_id": user_id, "total": 200}
    ]
    return orders
```

## GraphQL with Strawberry

```bash
pip install strawberry-graphql
```

```python
import strawberry
from typing import List

@strawberry.type
class User:
    id: int
    name: str
    email: str

@strawberry.type
class Query:
    @strawberry.field
    def users(self) -> List[User]:
        return [
            User(id=1, name="John", email="john@example.com"),
            User(id=2, name="Jane", email="jane@example.com")
        ]
    
    @strawberry.field
    def user(self, id: int) -> User:
        return User(id=id, name="John", email="john@example.com")

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_user(self, name: str, email: str) -> User:
        return User(id=1, name=name, email=email)

schema = strawberry.Schema(query=Query, mutation=Mutation)

# Add to FastAPI
from strawberry.fastapi import GraphQLRouter

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
```

## WebSockets

```python
from fastapi import WebSocket, WebSocketDisconnect
from typing import List

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Message: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
```

## Caching with Redis

```bash
pip install redis
```

```python
import redis
import json
from functools import wraps

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def cache(expire=60):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Create cache key
            key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
            
            # Check cache
            cached = redis_client.get(key)
            if cached:
                return json.loads(cached)
            
            # Execute function
            result = await func(*args, **kwargs)
            
            # Store in cache
            redis_client.setex(key, expire, json.dumps(result))
            
            return result
        return wrapper
    return decorator

@app.get("/users/{user_id}")
@cache(expire=300)
async def get_user(user_id: int):
    # This will be cached for 5 minutes
    user = await fetch_user_from_db(user_id)
    return user
```

## Performance Optimization

### Database Query Optimization

```python
# Bad: N+1 query problem
users = await session.execute(select(User))
for user in users:
    posts = await session.execute(select(Post).filter(Post.user_id == user.id))

# Good: Use joins
users = await session.execute(
    select(User).options(selectinload(User.posts))
)
```

### Connection Pooling

```python
from sqlalchemy.pool import QueuePool

engine = create_async_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=20,
    max_overflow=0
)
```

## Deployment

### Docker

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## Monitoring & Logging

```python
import logging
from prometheus_client import Counter, Histogram
import time

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Metrics
request_count = Counter('http_requests_total', 'Total HTTP requests')
request_duration = Histogram('http_request_duration_seconds', 'HTTP request duration')

@app.middleware("http")
async def add_metrics(request, call_next):
    start_time = time.time()
    
    response = await call_next(request)
    
    request_count.inc()
    request_duration.observe(time.time() - start_time)
    
    logger.info(f"{request.method} {request.url.path} - {response.status_code}")
    
    return response
```

## Resources

- [Async Python Guide](https://docs.python.org/3/library/asyncio.html)
- [Celery Documentation](https://docs.celeryproject.org/)
- [FastAPI Advanced](https://fastapi.tiangolo.com/advanced/)
- Books in the `Books/` folder

**Congratulations!** You've mastered advanced Python backend development!
