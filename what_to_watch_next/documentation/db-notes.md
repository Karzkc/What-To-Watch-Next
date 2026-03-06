# DB Connection - lib/db.ts 

- import MONGO URI 
- import interfaces :-
    * Mongoose cache interface - as ts doesnt know what shape global.mongoose has (causes type error)

    * No any → ESLint happy (npm run build passes)
    IntelliSense → cached.conn. shows all Mongoose methods
    Type safety → cached.conn.query() won't error
    Self-documenting → anyone reads → instantly understands

    * global = Node.js "global memory" - shared across ALL functions/requests
    Like a shared notebook everyone in your app can read/write

    * global.mongoose = Custom property on global text
    global = { process, Buffer, console, ... }  // Node.js built-ins
    global.mongoose = { conn: null, promise: null }  // YOU add this!
    *  Without global: Every API call = new MongoDB connection
    → 100 users = 100 connections = SLOW + CRASHES
     With global: 100 users = 1 connection = FAST + SAFE 
    

- mongo uri management 

- declare global
    * declare: Tells TypeScript compiler "this variable/type exists elsewhere, don't generate code, just trust me."
    * earlier mongoose cache was not identified by ts but now it is 
- mongoose cache - 
    * ```as``` keyword = Type Assertion (Type Override)
    "Trust me TypeScript, treat this as THAT type"

    * ```typeof globalThis``` = "Whatever type global actually is"
    globalThis = modern way to say "global"

    




