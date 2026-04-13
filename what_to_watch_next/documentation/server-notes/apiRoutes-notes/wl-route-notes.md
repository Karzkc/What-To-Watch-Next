# app\api\watchlist\route.ts

- importing
  - getUserFromRequest from auth lib
  - dbconn
  - addToWatchlist, getUserWatchlist services

- POST
  - conn to db
  - get user id from getUserFromRequest()
  - get body from req in the form of tmdbId and mediaType
  - if not found err
  - if media type not from movie or tv - err
  - if no err , add the item to watchlist
  - return response
  - return err if any

- GET
  - conn to db
  - get params from url
  - get status from params
  - if status not exists or not in suitable categ - err
  - get user from getUserFromRequest()
  - get watchlist obj from getUserWatchlist() using userId and status
  - return all items by retireving the data such as title , ids, status , posterpath etc from tmdb api and mapping all to enriched obj (enrich - add extra info)
  - return enriched obj
  - return err if any
