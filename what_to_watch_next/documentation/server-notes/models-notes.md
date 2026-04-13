# all schemas and models
## 1. user.model.ts
- create mongoose schma using userInfo interface
- adds name,email,pw,isguest,role and timestamps at end
- create UserModel using Mongoose Model 
    - checks if is there any user model already exists is yes use the same oterhwise create new model usinf userSchema

## 2. rating.model.ts
- all same except indexing on userId and tmdbId for fast access
- same model thing

## 3 . watchlist.model - same as rating

