// import { MongoClient } from "mongodb";
// const url = process.env.MONGODB_CONNECTION_STRING || "";

// const database = 'test'
// const client = new MongoClient(url);

// async function getData(){
//     let result = await client.connect();
//     let db = result.db(database);
//     let collection = db.collection('COMMON_PATENT_TYPES');
//     let response = await collection.find({}).toArray();
//     console.log(response);


// }

// getData();


// import { MongoClient } from "mongodb";

// const url = process.env.MONGODB_CONNECTION_STRING || "";
// const database = 'chemrobo_db';
// const client = new MongoClient(url);

// export async function getData() {
//   try {
//     await client.connect();
//     console.log("Connected successfully to MongoDB");

//     const db = client.db(database);
//     const collection = db.collection('AGROPHARM_XMIM_MONGO');

//     const response = await collection.find({}).toArray();
//     //const response = await collection.find({}).toArray();
//    // console.log(response);

//     await client.close();
//     console.log("Connection to MongoDB closed");

//     return response; // If you want to return the data from the function
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }


import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_CONNECTION_STRING || ''; // Replace with your MongoDB connection string
const databaseName = 'test'; // Replace with your database name

// async function connectToMongoDB() {
//   try {
//     const client = new MongoClient(url);
//     await client.connect();
//     console.log('Connected successfully to MongoDB');
//     // const db = client.db(databaseName);
//     //  return db;
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }

let db = null;

export async function connectToMongoDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(databaseName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error('MongoDB not connected. Call connectToMongoDB() first.');
  }
  return db;
}

export default connectToMongoDB;


