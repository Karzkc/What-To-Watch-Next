# Authentication & Features Implementation Roadmap

## ✅ Phase 1: Complete Auth Flow

### 1️⃣ Create Register Route
**File:** `app/api/auth/register/route.ts`

**Flow:**
- Connect to DB
- Parse request body
- Validate with Zod
- Call `registerUser()`
- Generate JWT token
- Set httpOnly cookie
- Return success response

**Test Cases:**
- ✓ User inserted into DB
- ✓ Cookie set correctly

### 2️⃣ Create Login Route
**File:** `app/api/auth/login/route.ts`

**Flow:**
- Connect to DB
- Parse request body
- Validate credentials
- Call `loginUser()`
- Generate JWT token
- Set httpOnly cookie
- Return success response

**Test Cases:**
- ✓ Valid login succeeds
- ✓ Wrong password fails

### 3️⃣ Create Logout Route
**File:** `app/api/auth/logout/route.ts`

**Flow:**
- Clear httpOnly cookie
- Return success response

### 4️⃣ Create Token Verification Utility
**File:** `lib/auth.ts`

**Functions:**
- `verifyToken()` - Verify JWT from cookie
- `getUserFromRequest()` - Extract user from request

**Purpose:**
- Read and verify JWT cookie
- Return userId and role
- Throw error if invalid

### 5️⃣ Create Protected `/api/auth/me` Route

**Flow:**
- Read cookie
- Verify token
- Query user from DB
- Return user data

**Test Cases:**
- ✓ Works when authenticated
- ✓ Fails without valid cookie

---

## ✅ Phase 2: Watchlist System
*(Start only after Phase 1 is complete)*

### 6️⃣ Create Watchlist Model

**Fields:**
- `userId` (indexed)
- `tmdbId`
- `mediaType`
- `status`
- `timestamps` (createdAt, updatedAt)

**Indexes:**
- Compound unique index: `userId + tmdbId`

### 7️⃣ Create Watchlist Service

**Functions:**
- `addToWatchlist()`
- `getUserWatchlist()`
- `updateStatus()`
- `removeFromWatchlist()`

**Security:** Always filter by `userId` from token

### 8️⃣ Create Watchlist Routes
**Files:**
- `app/api/watchlist/route.ts`
- `app/api/watchlist/[id]/route.ts`

**Protection:** Implement token verification middleware

---

## ✅ Phase 3: Rating System
*(Same pattern as Phase 2)*
- `rating.model.ts`
- `rating.service.ts`
- `rating/` API routes

---

## ✅ Phase 4: Reaction System (Like/Dislike)
*(Same pattern as Phase 2)*

---

## ✅ Phase 5: Production Hardening

- Standardize API response format
- Implement proper error handling
- Secure cookie flags (httpOnly, Secure, SameSite)
- Add guest user support
- Add TTL index for auto-cleanup (optional)
- Add rate limiting for auth routes

---

## 🔒 Strict Implementation Order
1. Register route
2. Login route
3. Logout route
4. JWT verification utility
5. `/auth/me` protected route
6. Watchlist system
7. Rating system
8. Reaction system
9. Production hardening
