# Validators using zod

- why validators:

API receives data from user (req body, params, query)

- data can be:
        → missing
        → wrong type
        → invalid format

without validation:
→ wrong data goes to DB
→ causes bugs / crashes / security issues

---

- what validators do:
  - check incoming data before processing
  - ensure correct structure (shape)
  - ensure correct types (string, number, etc.)
  - can apply rules (min length, email format, etc.)

---

- why using Zod:
  - schema-based validation (define structure once)
  - automatic type inference (works well with TypeScript)
  - clean syntax
  - gives proper error messages

# auth.schema
- creating register schema using z.obj
    - name - min 3 trim and noempty'
    - same for email and pw 
- crating login same as reg with email and pw only 
# rating schema - same as auth
- creating ratingValidatedSchema for ratings by varifying tmdb id mediatype and rating
- creating updateRatingSchema to verify updation of ratings 

## <b> at end we use z.infer why - it automatically creates a TypeScript type from a Zod schema , without it we have to seprately make ts type and stay in sync with schema </b>

