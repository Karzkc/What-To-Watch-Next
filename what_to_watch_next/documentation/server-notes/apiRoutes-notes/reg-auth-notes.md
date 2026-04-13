# app\api\auth\register\route.ts

- importing
  - dbconnect
  - regUser , token gen from services
  - reg schema
  - cookies
  - zod errs

- POST
  - connect to db
  - take body from req
  - parse and validate body from regSchema (zod)
  - register user using parsed data into db
  - generate token using tokenGen func by giving \_id and role
  - set cookie of token which expires at 7 days
  - return success Nextresp
  - is err
    - if err from zod , show in sequence
    - otherwise server errors
