Now that the **backend is essentially complete**, the frontend work should follow a clear order so you don’t build UI that later needs rework.

Below is a **clean, practical UI implementation roadmap** for your app.

---

# Phase 1 — Authentication UI

Goal: allow users to enter the app and create a session.

### Pages / Components

```
AuthModal
LoginForm
RegisterForm
GuestButton
```

### Flow

1. User opens site
2. Show **Login / Register / Continue as Guest**

APIs used:

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/guest
```

After success:

```
cookie set → user session active
```

---

# Phase 2 — Session Handling

Goal: detect logged-in user.

### On app load

Call:

```
GET /api/auth/me
```

Response:

```
user
role
guest status
```

Store user state in:

```
React Context or Zustand
```

Example state:

```
user
isAuthenticated
isGuest
```

---

# Phase 3 — Movie Details Page Integration

Your details page already exists:

```
/details/[media_type]/[id]
```

Now integrate backend.

When page loads:

Call:

```
GET /api/watchlist/check/:tmdbId
GET /api/rating
GET /api/similar/:mediaType/:id
```

Update UI:

```
Watchlist button state
User rating stars
Similar movies slider
```

---

# Phase 4 — Watchlist UI

Create watchlist page.

Example:

```
/watchlist
```

Tabs:

```
All
Watching
Watched
To Watch
```

APIs:

```
GET /api/watchlist
GET /api/watchlist?status=watching
GET /api/watchlist?status=watched
GET /api/watchlist?status=toWatch
```

Actions:

```
Add → POST /api/watchlist
Update → PATCH /api/watchlist/:id
Delete → DELETE /api/watchlist/:id
```

---

# Phase 5 — Rating UI

Inside movie page show:

```
⭐ ⭐ ⭐ ⭐ ⭐
```

Flow:

```
User clicks star
↓
POST /api/rating
```

If rating exists:

```
PATCH /api/rating/:id
```

UI should display:

```
IMDB rating (TMDB)
+
User rating
```

---

# Phase 6 — Search Page

You already have:

```
/search
```

Add UI features:

```
debounced search
infinite scroll
result categories (movies / tv)
```

API used:

```
GET /api/search
```

---

# Phase 7 — Genre Recommendation Section

Your homepage feature:

```
select 3 genres
↓
show recommended movies
```

UI components:

```
GenreSelector
GenreMovieSlider
```

API used:

```
GET /api/genre
```

---

# Phase 8 — Similar Movies Slider

Inside details page:

```
Because you liked this
```

API:

```
GET /api/similar/:mediaType/:id
```

Render:

```
horizontal movie slider
```

---

# Phase 9 — UX Improvements

Add:

```
Skeleton loaders
Error states
Empty watchlist state
```

Example:

```
No watchlist items yet
Add movies to start tracking
```

---

# Phase 10 — Final UI Features

Polish features:

```
watchlist status dropdown
hover preview
lazy image loading
mobile responsiveness
```

---

# Final UI Structure

Your frontend component hierarchy may look like:

```
components
 ├ auth
 │   ├ LoginForm
 │   ├ RegisterForm
 │   └ GuestButton
 │
 ├ movie
 │   ├ MovieCard
 │   ├ RatingStars
 │   ├ WatchlistButton
 │   └ SimilarSlider
 │
 ├ watchlist
 │   ├ WatchlistTabs
 │   └ WatchlistGrid
 │
 └ layout
     ├ Navbar
     ├ Footer
     └ Loader
```

---

# Recommended Implementation Order

Do frontend in this order:

```
1 Auth UI
2 Session handling
3 Movie details page integration
4 Watchlist UI
5 Rating system
6 Search improvements
7 Genre recommendations
8 Similar slider
9 UX improvements
10 Responsive polish
```

---

# Important Tip

While implementing UI:

```
Test every API endpoint from the UI immediately
```

Do **not build UI first and connect later**.

---

If you want, I can also show **the exact React state architecture (Context/Zustand) best suited for your app**, which will prevent messy state management later.
