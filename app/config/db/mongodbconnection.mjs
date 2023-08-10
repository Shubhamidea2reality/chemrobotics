import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_CONNECTION_STRING || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db(process.env.MONGO_DB_NAME);

export default db;