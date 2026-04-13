# lib/auth.ts

- importing :
    jwt - to verify tokens , 
    cookies from next/headers - cookies utility

- checking jwt secret - err if not present

- creating verifyToken function :
    - verify jwt token and return decoded payload
    - takes token as arg
    - return payload after jwt.verifying token and secret
    - err if invalid token

- creating getUserFromReq func - extract logged in user from req 
    - create cookie object 
    - get token from cookies 
    - if no token no user logged in 
    - if its there use verifyToken func and store payload in var using token
    - at end return payload in form of userId and its role