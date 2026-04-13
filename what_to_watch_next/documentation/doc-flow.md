🔹 PHASE 1 — Core Foundation
server/lib/db.ts ✅ (done)
server/lib/auth.ts
server/lib/utils.ts
🔹 PHASE 2 — Type System (Interfaces)
server/lib/interfaces/mongoose.interfaces.ts ⚠️
server/lib/interfaces/userInfo.interfaces.ts
server/lib/interfaces/auth.interfaces.ts
server/lib/interfaces/watchlist.interfaces.ts
server/lib/interfaces/rating.interfaces.ts
🔹 PHASE 3 — Database Models
server/models/user.model.ts
server/models/watchlist.model.ts
server/models/rating.model.ts
server/models/test.model.ts (optional / last)
🔹 PHASE 4 — Validators (Input Validation)
server/validators/auth.schema.ts
server/validators/rating.schema.ts
🔹 PHASE 5 — Business Logic (MOST IMPORTANT)
server/services/auth.services.ts ⚠️
server/services/watchlist.services.ts
server/services/rating.services.ts

🔹 PHASE 6 — API ROUTES (Top Layer)
🟢 Start with AUTH (critical flow)
/app/api/auth/register/route.ts
/app/api/auth/login/route.ts
/app/api/auth/me/route.ts
/app/api/auth/logout/route.ts
/app/api/auth/guest/route.ts

🟡 Then USER FEATURES
/app/api/watchlist/route.ts
/app/api/watchlist/[id]/route.ts
/app/api/watchlist/check/[tmdbId]/route.ts
/app/api/rating/route.ts
/app/api/rating/[id]/route.ts
🔵 Then CONTENT APIs (simpler ones)

/app/api/trending/route.ts
/app/api/banner/route.ts
/app/api/genre/route.ts
/app/api/movieAPI/route.ts
/app/api/showsAPI/route.ts
/app/api/search/route.ts
/app/api/similar/[mediaType]/[id]/route.ts
