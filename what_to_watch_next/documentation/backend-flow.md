# Backend Architecture

## Layers
`Route → Validation → Service → Model → Database`

## Auth Flow
1. User registers
2. Password hashed
3. JWT created
4. JWT stored in httpOnly cookie
5. Protected routes verify token

## Watchlist Flow
1. Verify authentication
2. Extract userId
3. Create watchlist entry
4. Enforce unique (userId + tmdbId)

---

# Files Architecture

## 1️⃣ Environment Setup
```
.env.local - for MONGODB_URI , JWT_SECRET
```

## 2️⃣ Database Connection
```
server/lib/db.ts
```
- **Purpose:**
  - Connect to MongoDB
  - Use mongoose connection caching
  - Prevent multiple connections in Next.js
- **Used at:** All API routes

## 3️⃣ User Interface / Types
```
server/interfaces/user.interface.ts
```
- Define TypeScript structure of User document

## 4️⃣ User Model
```
server/models/user.model.ts (also other models)
```
- **Purpose:**
  - Define mongoose schema
  - Create user collection
- **Contains:**
  - User schema
  - Password field
  - Role enum
  - Timestamps
  - Model export

## 5️⃣ Validation Layer
```
server/validators/auth.schema.ts
```
- Validate incoming requests using Zod
- **Schemas created:**
  - `registerSchema`
  - `loginSchema`
- **Used inside:** Auth routes

## 6️⃣ Authentication Service (Business Logic)
```
server/services/auth.service.ts
```
- **Purpose:** Handle business logic
- **Functions created:**
  - `registerUser()`
  - `loginUser()`
  - `tokenGenerator()`
- **Responsibilities:**
  - Check duplicate user
  - Hash password
  - Verify password
  - Generate JWT

## 7️⃣ Authentication Routes
```
app/api/auth/
```
- **Files created:**
  ```
  register/route.ts
  login/route.ts
  logout/route.ts
  ```

### Register Route
```
POST /api/auth/register
```
- **Flow:**
  1. Connect DB
  2. Validate input
  3. `registerUser()`
  4. Generate JWT
  5. Set cookie
  6. Return response

### Login Route
```
POST /api/auth/login
```
- **Flow:**
  1. Connect DB
  2. Validate input
  3. `loginUser()`
  4. Generate JWT
  5. Set cookie
  6. Return response

### Logout Route
```
POST /api/auth/logout
```
- **Flow:**
  1. Delete cookie
  2. Return success

## 8️⃣ Authentication Utility
```
server/lib/auth.ts
```
- **Functions created:**
  - `verifyToken()`
  - `getUserFromRequest()`
- **Purpose:**
  - Read cookie
  - Verify JWT
  - Extract userId + role
- **Used by:** Protected routes

## 9️⃣ Auth Verification Route
```
app/api/auth/me/route.ts
```
- **Endpoint:**
  ```
  GET /api/auth/me
  ```
- **Purpose:** Return logged-in user
- **Flow:**
  1. Connect DB
  2. `getUserFromRequest()`
  3. Find user in DB
  4. Return user

## 🔟 Watchlist Interface
```
server/interfaces/watchlist.interface.ts
```
- **Purpose:** Define watchlist data structure
- **Fields:**
  - `userId`
  - `tmdbId`
  - `mediaType`
  - `status`
  - `createdAt`
  - `updatedAt`

## 11 Watchlist Model
```
server/models/watchlist.model.ts
```
- **Purpose:** Store user watchlist
- **Schema fields:**
  - `userId`
  - `tmdbId`
  - `mediaType`
  - `status`
  - `timestamps`
- **Important index:** Compound unique (`userId + tmdbId`)
  - Prevents duplicates