# To-Do App Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A professional REST API backend for user authentication and management built with NestJS, MongoDB, and TypeScript.

## Description

This is a NestJS-based REST API backend providing:
- User registration with secure password hashing
- User login with credential validation
- User deletion and management
- MongoDB integration for persistent data storage
- Professional 3-tier architecture (Presentation → Business → Data Access)

## Tech Stack

- **Framework**: NestJS 11.0.1 (TypeScript framework for scalable server-side applications)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcryptjs for password hashing (10 salt rounds)
- **Language**: TypeScript
- **Testing**: Jest unit tests + e2e tests
- **Code Quality**: ESLint + Prettier
- **Port**: 4500
- **Database Endpoint**: MongoDB (localhost:27017/users)

## Architecture

Professional 3-tier clean architecture:

```
src/
├── presentation/        ← HTTP layer
│   ├── controllers/    (REST endpoints)
│   └── dtos/          (Data transfer objects)
├── business/           ← Business logic layer
│   └── services/      (Core operations)
├── data-access/        ← Database layer
│   └── entities/      (MongoDB Mongoose schemas)
├── users/              ← Users module
└── shared/             (Global constants & configs)
```

## API Endpoints

### Users Module (`/users`)

| Endpoint | Method | Purpose | Request Body |
|----------|--------|---------|--------------|
| `/users/register` | POST | Register a new user | `{ email: string, password: string }` |
| `/users/login` | POST | Authenticate user | `{ email: string, password: string }` |
| `/users/:id` | DELETE | Delete user by ID | - |

### Response Examples

**Register Success:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "createdAt": "2026-03-25T10:30:00.000Z",
  "message": "User registered successfully"
}
```

**Login Success:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "message": "Login successful"
}
```

## Database Schema

### User Entity

```typescript
User {
  _id: ObjectId (MongoDB auto-generated)
  id: string (UUID - unique identifier)
  email: string (unique, lowercase, trimmed)
  password: string (hashed with bcryptjs)
  createdAt: timestamp (auto-generated)
  updatedAt: timestamp (auto-updated)
}
```

## How It Works

### Registration Flow
1. Client sends POST request with email + password
2. Service checks if email already exists → throws `ConflictException` if found
3. Password is hashed using bcryptjs (10 salt rounds for security)
4. New user document is created in MongoDB
5. Response returns user ID + email (password never exposed)

### Login Flow
1. Client sends POST request with email + password
2. Service finds user by email (with password field included)
3. Password comparison using bcryptjs.compare()
4. Returns user info on success, `BadRequestException` on failure
5. Password never returned in response

### Delete Flow
1. Client sends DELETE request with user ID
2. Service removes user document from MongoDB
3. Returns success message with deleted user ID
4. Throws `BadRequestException` if user not found

## Getting Started

### Installation

```bash
$ npm install
```

### Running the Application

```bash
# development mode
$ npm run start

# watch mode (recommended for development)
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

The application will start on `http://localhost:4500`

### Running Tests

```bash
# unit tests
$ npm run test

# unit tests with watch mode
$ npm run test:watch

# test coverage report
$ npm run test:cov

# e2e tests
$ npm run test:e2e
```

## Code Quality

### Linting & Formatting

```bash
# run ESLint fix
$ npm run lint

# format code with Prettier
$ npm run format
```

## Key Features

✅ **Secure Password Storage**: Passwords are hashed with bcryptjs (10 salt rounds), never stored in plain text  
✅ **Email Validation**: Prevents duplicate email registrations with unique constraint  
✅ **Professional Architecture**: 3-tier clean architecture (Presentation → Business → Data Access)  
✅ **Modular Design**: UsersModule is self-contained and easily exportable  
✅ **Error Handling**: Proper HTTP exceptions for conflicts, bad requests, and validation  
✅ **Timestamps**: Automatic `createdAt` and `updatedAt` tracking  
✅ **Type Safety**: Full TypeScript implementation for compile-time safety  
✅ **Security Best Practices**: No passwords in response, email validation, unique constraints  

## Technologies Used

- `@nestjs/common`: Core NestJS decorators and utilities
- `@nestjs/core`: NestJS core module system
- `@nestjs/mongoose`: MongoDB integration with Mongoose
- `@nestjs/platform-express`: HTTP platform with Express
- `mongoose`: MongoDB object modeling
- `bcryptjs`: Password hashing library (industry standard)
- `uuid`: Unique identifier generation
- `TypeScript`: Static typing and advanced language features

## Future Enhancements

- JWT token-based authentication
- Password reset functionality
- Email verification
- Role-based access control (RBAC)
- Rate limiting
- Task/Todo management system
- User profile endpoints
- Password change functionality

## Deployment

### Building for Production

```bash
# build the application
$ npm run build

# run production build
$ npm run start:prod
```

### Environment Setup

The application uses MongoDB for persistence. Ensure MongoDB is running:

```bash
# local MongoDB setup
mongod --dbpath /path/to/data
```

The database connection is configured in `src/shared/shared-constants.ts`:
- Connection string: `mongodb://localhost:27017/users`
- Database name: `users`
- Collection: `users`

### Cloud Deployment Options

For cloud platforms, update the MongoDB connection string in `src/shared/shared-constants.ts`:

```typescript
public static readonly databaseEndpoint: string = 'your_mongodb_atlas_connection_string';
```

## Project Structure Explanation

- **presentation/**: HTTP controllers and DTOs for request/response handling
- **business/**: Service layer with core business logic and operations
- **data-access/**: Database entities, schemas, and repository patterns
- **users/**: Feature module bundling controllers, services, and imports
- **shared/**: Global configuration like port and database endpoint

## Module Dependencies

```
AppModule
  ├── MongooseModule (connects to MongoDB)
  └── UsersModule
      ├── MongooseModule.forFeature([User])
      ├── UsersController (REST endpoints)
      └── UsersService (business logic)
```

## Contributing

When adding new features:
1. Create controller endpoints in `presentation/controllers/`
2. Add service methods in `business/services/`
3. Define DTOs in `presentation/dtos/`
4. Update entity schemas in `data-access/entities/`
5. Export new services/modules as needed

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Support

For NestJS-specific questions, visit:
- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Discord Community](https://discord.gg/G7Qnnhy)
- [NestJS Official Courses](https://courses.nestjs.com/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
