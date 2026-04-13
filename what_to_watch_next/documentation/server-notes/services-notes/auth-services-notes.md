# server\services\auth.services.ts

- import -  
   usermodel
  bcrypt - to encrypt pw using hash
  jwt - to verify token

- check jwt secret

- registerUser function
  - takes data as arg in form of name,email and pw
  - check if user already exists or not
    - checks in userModel by using email if already exists
    - is exists - throw err alr exist
  - hash the password using bcrypt with salt 10
    - salt rounds means tells bcrypt how many times to intrn reprocess pw ,which makes it hard to dompute the hash for attackers
  - then create user by using model.create func of mongoose which stores name,email,pw, role in db 
  - store the response in user var and convert this into object
  - return the response object after deleting pwfrom it

- loginUser function
    - takes email and pw as arg
    - searches for user using model.findone using email
        - if not exists err - invalid cred
    - then checks if entered pw and db pw are same
        - if not correct - same err
    
    - if successfull create userObj 
    - return resp obj after deleting pw from it

- at last tokenGenerator func - Creates a JWT token for a user after login/register
    - takes userId and role as arg
    - uses jwt.sign
        - it takes payload , secret and expiry date as arg
        - return signed jwt token
        - Generates a secure, signed token containing userId + role with expir