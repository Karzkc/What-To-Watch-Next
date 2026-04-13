# server\services\watchlist.services.ts

- importing watchlistModel and watchlistInfo interface

- func addToWatchlist
  - takes userId , tmdbId, mediaType as arg
  - checkes is alr exists in watchlist
  - if exists err
  - if not create watchlist model
  - return resp obj

- func getUserWatchlist
  - takes userId , status
  - create a query obj with userId and status elements
  - is status exists put query status = status
  - search query inside watchlistmodel sorted by doc
  - returning resp obj

- func updateWatchStatus
  - takes userId , watchlistItemId , status
  - finds watchlist item from its model with watchlistItemId
  - if not found or user id not same in both give err
  - otherwise update old status to new
  - return resp obj

- func removeFromWatchlist
  - takes userId, watchlistItemId
  - finds watchlist item using watchlistItemId and userId and deletes it using model.findOneAndDelete
  - if not found err
    -return resp obj
