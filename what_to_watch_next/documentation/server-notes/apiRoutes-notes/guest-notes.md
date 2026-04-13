# app\api\auth\guest\route.ts

- importing
  - dbconn
  - userModel
  - tokenGen
  - cookies

- POST
  - conn to db
  - checks token by getting token cookie
  - if token alr exists - send resp
  - otherwise create a guest user in UserModel
    - with name as randome guestId
    - role and isGuest true

  - gen token using \_id and role
  - set toke cookie which expires in 7 days
  - return resp with guest userInfo
  - return err if any
