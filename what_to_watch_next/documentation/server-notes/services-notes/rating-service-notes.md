# server\services\rating.services.ts

- importing
  - rating model
  - rating info interface
  - types from mongoose - for type safe interations with models

- creating addRating func
  - which takes userId,tmdbId , mediaType, rating as arg
  - checks if rating alr exists if not err
  - if not create a coll from ratingModel
  - return response

- func getUserRatings
  - which takes userId (of type Obj id)
  - finds rating from ratingModel and sort on basis of doc
  - return rating

- func updateRating
  - takes takes userId,tmdbId , rating as arg
  - find rating with rating id from rating Model
  - if not found err
  - if user id mismatch err
  - updating old rating with new
  - saving new rating and return resp obj

- func removeRating
  - rakes userId , ratingId
  - finds rating from ratingModel
    -if not found err
  - if user id mismatch err
  - deleting rating
  - return response Obj
