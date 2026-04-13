# DB Connection - lib/db.ts 

- Mongoose cache:

mongoose.connect() → creates new connection on every request → can cause too many connections / crash  

with cache:
first request → creates connection  
next requests → reuse same connection  

steps - 
- defined an interface for mongoose cache → has 2 things: conn and promise

- declared mongooseCache on global (using TypeScript declare global)
      so TS knows this property exists

- created typed variable:
      global as typeof globalThis & { mongooseCache?: MongooseCache }
      → extending global object to include mongooseCache

- if mongooseCache not present → initialize it:
        { conn: null, promise: null }

(inside dbConnect)

- check if conn already exists → return it (reuse)

- if no promise → start connection:
        mongoose.connect(MONGO_URI)

- store that in cache.promise

- await promise → store final connection in cache.conn

- return connection

- why promise:
        handles multiple parallel requests
        → if connection already in progress, others wait for same promise
        → prevents multiple simultaneous connections