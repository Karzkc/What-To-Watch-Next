# app\api\auth\login\route.ts

- importing
  - dbConnect
  - loginUser, tokenGenerator , loginSchema
  - cookies
  - zodErrors

- POST
  - connect to db
  - take body from req in form of email and pw
  - parse body using LoginSchmea from zod
  - generate token
  - set cookie of token exp in 7 days
  - send nextresp
  - handle errors of zod or internal server
