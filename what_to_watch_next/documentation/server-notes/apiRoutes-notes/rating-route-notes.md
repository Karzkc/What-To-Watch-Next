# app\api\rating\[id]\route.ts

- importing
  - getUserFromRequest
  - db conn
  - removeRating, updateRating
  - updateRatingSchema

- PATCH - to update Rating
  - dbConn
  - get userId from getUserFromRequest
  - get body from req
  - parse body using updateRatingSchema and store as rating
  - update rating from 1-5 using updateRating service
  - return resp
  - return err if any

- DELETE - to remove rating from movie/show
  - dbconn
  - get userId from getUserFromRequest
  - get body from req
  - remove rating from movie/show using removeRating service
  - return resp
  - return err if any
