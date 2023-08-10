import { MongoClient } from 'mongodb';



// Connection URL and database name
const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
const dbName = 'chemrobo_db'; // Replace with your database name
const collectionName = 'AGROPHARM_XMIM_MONGO'; // Replace with your collection name

export const GetChemroboticsData = async (req, res) => {
  try {
    const postdata = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully!');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Build the MongoDB query based on the provided filter condition
    const query = {
      product_name: {
        $regex: new RegExp(postdata.filtercondition, 'i'),
      },
    };

    // Server-side pagination options
    const options = {
      skip: (postdata.pagenumber - 1) * postdata.rowscount,
      limit: postdata.rowscount,
      sort: { [postdata.sortby]: 1 }, // Replace 'postdata.sortby' with the actual field name for sorting
    };

    // Fetch the data from MongoDB
    const result = await collection.find(query, options).toArray();
    res.json(result);

    // Close the MongoDB connection
    client.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error querying MongoDB:', err);
    res.status(500).json({ error: 'An error occurred while querying MongoDB' });
  }
};

