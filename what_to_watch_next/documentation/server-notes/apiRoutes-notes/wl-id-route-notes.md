# app\api\watchlist\[id]\route.ts

- importing
  - getUserFromRequest
  - dbconn
  - removeFromWatchlist,updateWatchStatus

- PATCH - for updating status
  - take watchlistItemId from params
  - conn to db
  - get userId from auth
  - get body from req
  - get status from body
  - if status not from desired ones - err
  - otherwise update status to new one using updateWatchStatus
  - return resp
  - return err if any

- DELETE - to remove from watchlist
  - take watchlistItemId from params
  - conn to db
  - get userId from auth
  - delete item from db using removeFromWatchlist
  - return resp
  - return err if any
