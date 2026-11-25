# 💡 Backend Best Practices

## API Design

### RESTful Principles
- Use nouns for resources (`/users`, not `/getUsers`)
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Use plural nouns (`/users`, not `/user`)
- Use proper status codes
- Version your API (`/api/v1/users`)

### URL Structure
```
GET    /api/v1/users          # Get all users
GET    /api/v1/users/:id      # Get user by ID
POST   /api/v1/users          # Create user
PUT    /api/v1/users/:id      # Update user
DELETE /api/v1/users/:id      # Delete user
```

### Response Format
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John"
  },
  "message": "User retrieved successfully"
}
```

## Security

### Authentication
- Use HTTPS only
- Implement JWT or OAuth 2.0
- Hash passwords with bcrypt
- Use secure session management
- Implement refresh tokens

### Input Validation
- Validate all user inputs
- Sanitize data
- Use parameterized queries
- Implement rate limiting
- Use CORS properly

### Security Headers
```javascript
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true
}));
```

## Database

### Optimization
- Use indexes wisely
- Avoid N+1 queries
- Use connection pooling
- Implement caching
- Use database transactions

### Schema Design
- Normalize data appropriately
- Use foreign keys
- Add proper constraints
- Use appropriate data types
- Plan for scalability

## Error Handling

### Consistent Errors
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID 123 not found",
    "statusCode": 404
  }
}
```

## Performance

### Caching
- Cache frequently accessed data
- Use Redis for session storage
- Implement CDN for static assets
- Use HTTP caching headers

### Optimization
- Use pagination for large datasets
- Implement lazy loading
- Optimize database queries
- Use async operations
- Implement load balancing

## Testing

### Test Pyramid
- Unit tests (70%)
- Integration tests (20%)
- E2E tests (10%)

### Best Practices
- Write tests first (TDD)
- Mock external dependencies
- Test edge cases
- Maintain high coverage
- Use CI/CD for automated testing

## Logging & Monitoring

### Logging
```javascript
logger.info('User logged in', { userId: user.id });
logger.error('Database connection failed', { error: err.message });
```

### Monitoring
- Track response times
- Monitor error rates
- Set up alerts
- Use APM tools
- Track business metrics

## Code Organization

### Project Structure
```
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── config/
└── tests/
```

### Clean Code
- Follow SOLID principles
- Use meaningful names
- Keep functions small
- Write self-documenting code
- Add comments for complex logic

## Deployment

### Environment
- Use environment variables
- Never commit secrets
- Use .env files
- Implement CI/CD
- Use Docker for consistency

### Production Checklist
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Implement backups
- [ ] Set up error tracking
- [ ] Configure rate limiting
- [ ] Enable CORS properly
- [ ] Use process manager (PM2)
- [ ] Set up health checks
- [ ] Configure auto-scaling

## Resources

- [12 Factor App](https://12factor.net/)
- [REST API Best Practices](https://restfulapi.net/)
- [OWASP Security](https://owasp.org/)
