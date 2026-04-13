# app\api\auth\me\route.ts

## in REST API Design : "me" = current authenticated user

- importing
  - getUserFromRequest from auth lib
  - dbconn
  - userModel

- GET
  - conn to db
  - find user from UserModel using userId and projection excluding pw
  - if no user found err
  - otherwise return user
  - return err if any
