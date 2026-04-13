# app\api\watchlist\check\[tmdbId]\route.ts

- importing
  - watchlistModel

- GET - to check if movie/show exists in watchlist or not
  - conn to db
  - get tmdb if from params
  - get userId from getUserFromRequest
  - search for item in watchlistModel
    - if found return response with exists true
    - if not return exists false
