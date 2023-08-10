import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
const db = 'chemrobo_db'; // Replace with your database name

let clientPromise;

// Connect to MongoDB and return the client instance
const connectToMongo = async () => {
  if (!clientPromise) {
    clientPromise = MongoClient.connect(mongoURI, { useUnifiedTopology: true });
  }
  return clientPromise;
};

// Close the MongoDB connection
const closeMongoConnection = () => {
  if (clientPromise) {
    clientPromise.then(client => client.close());
    clientPromise = null;
  }
};

export default { connectToMongo, closeMongoConnection, db};
