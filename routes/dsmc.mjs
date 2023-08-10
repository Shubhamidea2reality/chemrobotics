export const GetChemroboticsData = async (req, res) => {
    try {
      const postdata = req.body;
  
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
      console.log('Connected to GetChemroboticsData MongoDB successfully!');
      const db = client.db(dbName);
  
      // Get the collection based on the provided tablename
      const collectionName = postdata.tablename;
      const collection = db.collection(collectionName);
  
      // Build the MongoDB query based on the provided filter conditions
      const andConditions = [];
  
      if (postdata.product_name) {
        andConditions.push({
          product_name: { $regex: new RegExp(postdata.product_name, 'i') },
        });
      }
  
      if (postdata.exporter_name) {
        andConditions.push({
          exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
        });
      }
  
      if (postdata.importer_name) {
        andConditions.push({
          importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
        });
      }
  
      if (postdata.importer_country) {
        andConditions.push({
          importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
        });
      }
  
      if (postdata.trade_name) {
        andConditions.push({
          trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
        });
      }
  
      if (postdata.exporter_country) {
        andConditions.push({
          exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
        });
      }
      //suplier name
      if (postdata.exporter_name) {
        andConditions.push({
          exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
        });
      }
      // Add more AND conditions here for other fields
  
      // Combine all AND conditions using $and operator
      const andQuery = andConditions.length > 0 ? { $and: andConditions } : {};
  
      // Build the OR conditions for the same field using $or operator
      const orConditions = [];
  
      if (postdata.product_name) {
        orConditions.push({
          product_name: { $regex: new RegExp(postdata.product_name, 'i') },
        });
      }
  
      if (postdata.exporter_name) {
        orConditions.push({
          exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
        });
      }
  
      if (postdata.importer_name) {
        orConditions.push({
          importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
        });
      }
  
      if (postdata.importer_country) {
        orConditions.push({
          importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
        });
      }
  
      if (postdata.trade_name) {
        orConditions.push({
          trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
        });
      }
  
      if (postdata.exporter_country) {
        orConditions.push({
          exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
        });
      }
  
      if (postdata.exporter_name) {
        orConditions.push({
          exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
        });
      }
  
      // Add more OR conditions here for other fields
  
      // Combine all OR conditions using $or operator
      const orQuery = orConditions.length > 0 ? { $or: orConditions } : {};
  
      // Combine the AND and OR queries using $and operator
      const finalQuery = {};
      if (andConditions.length > 0) {
        finalQuery.$and = [andQuery, orQuery];
      } else {
        finalQuery.$or = [orQuery];
      }
  
      // Server-side pagination options
      const options = {
        skip: (postdata.pagenumber - 1) * postdata.rowscount,
        limit: postdata.rowscount,
      };
  
      // Fetch the data from MongoDB
      const result = await collection.find(finalQuery, options).toArray();
      res.json(result);
  
      // Close the MongoDB connection
      client.close();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.error('Error querying MongoDB:', err);
      res.status(500).json({ error: 'An error occurred while querying MongoDB' });
    }
  };
  




  /**faster version 1  */

  /**separate the OR conditions into a separate array,
   *  and then we push it into the AND conditions array using $or operator.
   *  This way, we can include both $and and $or conditions in the final query. */


  export const GetChemroboticsData = async (req, res) => {
    try {
      const postdata = req.body;
  
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
      console.log('Connected to GetChemroboticsData MongoDB successfully!');
      const db = client.db(dbName);
  
      // Get the collection based on the provided tablename
      const collectionName = postdata.tablename;
      const collection = db.collection(collectionName);
  
      // Build the MongoDB query based on the provided filter conditions
      const andConditions = [];
      const orConditions = [];
  
      if (postdata.product_name) {
        orConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
      }
  
      if (postdata.exporter_name) {
        orConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
      }
  
      if (postdata.importer_name) {
        orConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
      }
  
      if (postdata.importer_country) {
        orConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
      }
  
      if (postdata.trade_name) {
        orConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
      }
  
      if (postdata.exporter_country) {
        orConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
      }
  
      // Add more OR conditions here for other fields
  
      if (orConditions.length > 0) {
        andConditions.push({ $or: orConditions });
      }
  
      // Combine all AND conditions using $and operator
      const query = andConditions.length > 0 ? { $and: andConditions } : {};
  
      // Server-side pagination options
      const options = {
        skip: (postdata.pagenumber - 1) * postdata.rowscount,
        limit: postdata.rowscount,
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
  










  /********version3 with aggregation pipeline */

  export const GetChemroboticsData = async (req, res) => {
    try {
      const postdata = req.body;
  
      const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
      console.log('Connected to GetChemroboticsData MongoDB successfully!');
      const db = client.db(dbName);
      const collectionName = postdata.tablename;
      const collection = db.collection(collectionName);
  
      // Build the MongoDB aggregation pipeline based on the provided filter conditions
      const pipeline = [];
  
      // Match stage for AND conditions
      const andConditions = [];
      if (postdata.product_name) {
        andConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
      }
  
      if (postdata.exporter_name) {
        andConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
      }
  
      if (postdata.importer_name) {
        andConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
      }
  
      if (postdata.importer_country) {
        andConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
      }
  
      if (postdata.trade_name) {
        andConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
      }
  
      if (postdata.exporter_country) {
        andConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
      }
  
      // Add more AND conditions here for other fields...
  
      if (andConditions.length > 0) {
        pipeline.push({ $match: { $and: andConditions } });
      }
  
      // Match stage for OR conditions
      const orConditions = [];
      if (postdata.product_name) {
        orConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
      }
  
      if (postdata.exporter_name) {
        orConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
      }
  
      if (postdata.importer_name) {
        orConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
      }
  
      if (postdata.importer_country) {
        orConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
      }
  
      if (postdata.trade_name) {
        orConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
      }
  
      if (postdata.exporter_country) {
        orConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
      }
  
      // Add more OR conditions here for other fields...
  
      if (orConditions.length > 0) {
        pipeline.push({ $match: { $or: orConditions } });
      }
  
      // Server-side pagination options using $skip and $limit
      const options = {
        skip: (postdata.pagenumber - 1) * postdata.rowscount,
        limit: postdata.rowscount,
      };
  
      // Add pagination to the pipeline
      pipeline.push({ $skip: options.skip }, { $limit: options.limit });
  
      // Fetch the data from MongoDB using aggregation pipeline
      const result = await collection.aggregate(pipeline).toArray();
      res.json(result);
  
      // Close the MongoDB connection
      client.close();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.error('Error querying MongoDB:', err);
      res.status(500).json({ error: 'An error occurred while querying MongoDB' });
    }
  };














/*** optimized with indexing   morethan a minutes almost fail*/
import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb://your-mongodb-uri';
const dbName = 'your-database-name';

export const GetChemroboticsData = async (req, res) => {
  try {
    const postdata = req.body;

    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    console.log('Connected to GetChemroboticsData MongoDB successfully!');
    const db = client.db(dbName);
    const collectionName = postdata.tablename;
    const collection = db.collection(collectionName);

    // Create an index for the fields used in the query (assuming these fields are frequently searched)
    await collection.createIndex({
      product_name: 'text',
      exporter_name: 'text',
      importer_name: 'text',
      importer_country: 'text',
      trade_name: 'text',
      exporter_country: 'text',
      // Add more fields that are frequently searched...
    });

    // Build the MongoDB query based on the provided filter conditions
    const query = {};

    const andConditions = [];
    const orConditions = [];

    if (postdata.product_name) {
      // Use $text for full-text search, which utilizes the index we created
      orConditions.push({ $text: { $search: postdata.product_name } });
    }

    if (postdata.exporter_name) {
      orConditions.push({ $text: { $search: postdata.exporter_name } });
    }

    if (postdata.importer_name) {
      orConditions.push({ $text: { $search: postdata.importer_name } });
    }

    if (postdata.importer_country) {
      orConditions.push({ $text: { $search: postdata.importer_country } });
    }

    if (postdata.trade_name) {
      orConditions.push({ $text: { $search: postdata.trade_name } });
    }

    if (postdata.exporter_country) {
      orConditions.push({ $text: { $search: postdata.exporter_country } });
    }

    // Add more OR conditions here for other fields...

    if (orConditions.length > 0) {
      // Combine all OR conditions using $or operator
      query.$or = orConditions;
    }

    // Add more AND conditions here for other fields...
    // Combine all AND conditions using $and operator
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    // Server-side pagination options using $skip and $limit
    const options = {
      skip: (postdata.pagenumber - 1) * postdata.rowscount,
      limit: postdata.rowscount,
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






/****       version 5 with aggregation + match query 55.91 second*/
import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb://your-mongodb-uri';
const dbName = 'your-database-name';

export const GetChemroboticsData = async (req, res) => {
  try {
    const postdata = req.body;

    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    console.log('Connected to GetChemroboticsData MongoDB successfully!');
    const db = client.db(dbName);
    const collectionName = postdata.tablename;
    const collection = db.collection(collectionName);

    // Create an index for the fields used in the query (assuming these fields are frequently searched)
    await collection.createIndex({
      product_name: 'text',
      exporter_name: 'text',
      importer_name: 'text',
      importer_country: 'text',
      trade_name: 'text',
      exporter_country: 'text',
      // Add more fields that are frequently searched...
    });

    const andConditions = [];

    if (postdata.product_name) {
      andConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
    }

    if (postdata.exporter_name) {
      andConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
    }

    if (postdata.importer_name) {
      andConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
    }

    if (postdata.importer_country) {
      andConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
    }

    if (postdata.trade_name) {
      andConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
    }

    if (postdata.exporter_country) {
      andConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
    }

    // Add more AND conditions here for other fields...

    const andQuery = andConditions.length > 0 ? { $and: andConditions } : {};

    // Build the OR conditions for the same field using $or operator
    const orConditions = [];

    if (postdata.product_name) {
      orConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
    }

    if (postdata.exporter_name) {
      orConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
    }

    if (postdata.importer_name) {
      orConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
    }

    if (postdata.importer_country) {
      orConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
    }

    if (postdata.trade_name) {
      orConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
    }

    if (postdata.exporter_country) {
      orConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
    }

    // Add more OR conditions here for other fields...

    // Combine all OR conditions using $or operator
    const orQuery = orConditions.length > 0 ? { $or: orConditions } : {};

    // Server-side pagination options using $skip and $limit
    const options = {
      skip: (postdata.pagenumber - 1) * postdata.rowscount,
      limit: postdata.rowscount,
    };

    // Use the $facet stage to execute separate queries for $and and $or conditions
    const result = await collection
      .aggregate([
        {
          $facet: {
            andResults: [{ $match: andQuery }, { $limit: options.limit }, { $skip: options.skip }],
            orResults: [{ $match: orQuery }, { $limit: options.limit }, { $skip: options.skip }],
          },
        },
        {
          $project: {
            combinedResults: {
              $concatArrays: ['$andResults', '$orResults'],
            },
          },
        },
        {
          $unwind: '$combinedResults',
        },
        {
          $replaceRoot: {
            newRoot: '$combinedResults',
          },
        },
        {
          $limit: options.limit,
        },
        {
          $skip: options.skip,
        },
      ])
      .toArray();

    res.json(result);

    // Close the MongoDB connection
    client.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error querying MongoDB:', err);
    res.status(500).json({ error: 'An error occurred while querying MongoDB' });
  }
};


/**********version 6   */

