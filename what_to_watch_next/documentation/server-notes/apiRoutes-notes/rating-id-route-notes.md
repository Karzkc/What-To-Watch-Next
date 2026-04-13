# app\api\rating\route.ts

- importing
  - getUserFromRequest
  - dbConnect
  - addRating, getUserRatings from rating services
  - ratingValidatedSchema from zod rating validator

- POST
  - conn to db
  - get userId from getUserFromRequest
  - get body from req
  - parse body using ratingValidatedSchema
  - store parsed body in form of tmdbId, mediaType, rating
  - use addRating service to add rating from 1-5
  - return success resp
  - return err if any

- GET
  - conn to db
  - get userId from getUserFromRequest
  - get ratings from getUserRatings service
  - return success resp
  - return err if any
