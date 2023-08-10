/*
 * GET SERVAR TABLE DATA WITH FILTER AND SERVER SIDE PAGINATION.
 */

// export const GetChemroboticsData = (req, res) => {
//   try {
//     var postdata = JSON.parse(JSON.stringify(req.body));

//     //console.log(postdata);

//     req.getConnection(function (err, connection) {
//       let sql_qry=`CALL dbp_Get_Chemrobotics_Data('${postdata.tablename}','${postdata.filtercondition}',${postdata.pagenumber},${postdata.rowscount},'${postdata.sortby}','${postdata.additional_param}');`;
//       console.log(sql_qry);
//       var query = connection.query(
//         sql_qry,
//         function (err, rows) {
//           if (err) {
//             console.log("Error Selecting : %s ", err);
//             res.send({ status: "error", Message: err.sqlMessage });
//           } else {
//             //console.log(rows);
//             res.send(rows);
//           }
//         }
//       );

//       //console.log(query.sql);
//     });
//   } catch (e) {
//     console.log("Error log: %s ", e);
//     response.status(400).send("Bad Request!");
//   }
// };












/*-----------First monogoDB client connection code -----------------------------------------------------------------------------------------------------------------------*/
// import { MongoClient } from 'mongodb';

// // Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name
// const collectionName = 'AGROPHARM_XMIM_MONGO'; // Replace with your collection name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter condition
//     const query = {
//       product_name: {
//         $regex: new RegExp(postdata.filtercondition, 'i'),
//       },
//     };

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//       sort: { [postdata.sortby]: 1 }, // Replace 'postdata.sortby' with the actual field name for sorting
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(query, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };
















//------Version 1.0----------------------This is start for new one only for product search--------------------------------------------------------------------------------------/
//This is fastest comtroller to fetch data from mongoDB get data in 2seconds
// import { MongoClient } from 'mongodb';

// // Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter condition
//     const query = {
//       product_name: {
//         $regex: new RegExp(postdata.product_name, 'i'),
//       },
//     };

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(query, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

//----------------------------This is end for new one------------------/





















//-----Version 2.0-----This is with start new AND  conditional -------------------------------------------------------------------------------------------------------------/
//import { MongoClient } from 'mongodb';

// Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const filterConditions = [];
//     if (postdata.product_name) {
//       filterConditions.push({
//         product_name: { $regex: new RegExp(postdata.product_name, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       filterConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     if (postdata.importer_name) {
//       filterConditions.push({
//         importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
//       });
//     }

//     if (postdata.importer_country) {
//       filterConditions.push({
//         importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
//       });
//     }

//     if (postdata.trade_name) {
//       filterConditions.push({
//         trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
//       });
//     }

//     if (postdata.exporter_country) {
//       filterConditions.push({
//         exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       filterConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     // Combine filter conditions using $and and $or operators
//     const query = filterConditions.length > 0 ? { $and: filterConditions } : {};

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(query, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

//----------This is with end new AND  conditional -------------------------/

























//-******---Version 3.0------This is with start new AND  and OR conditional ---*****--------------------------------------------------------------------------------------/
import { MongoClient } from 'mongodb';

//Connection URL and database name
const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
const dbName = 'chemrobo_db'; // Replace with your database name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;
 
//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const andConditions = [];

//     if (postdata.product_name) {
//       andConditions.push({
//         product_name: { $regex: new RegExp(postdata.product_name, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       andConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     if (postdata.importer_name) {
//       andConditions.push({
//         importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
//       });
//     }

//     if (postdata.importer_country) {
//       andConditions.push({
//         importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
//       });
//     }

//     if (postdata.trade_name) {
//       andConditions.push({
//         trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
//       });
//     }

//     if (postdata.exporter_country) {
//       andConditions.push({
//         exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
//       });
//     }
//     //suplier name
//     if (postdata.exporter_name) {
//       andConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }
//     // Add more AND conditions here for other fields

//     // Combine all AND conditions using $and operator
//     const andQuery = andConditions.length > 0 ? { $and: andConditions } : {};

//     // Build the OR conditions for the same field using $or operator
//     const orConditions = [];

//     if (postdata.product_name) {
//       orConditions.push({
//         product_name: { $regex: new RegExp(postdata.product_name, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       orConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     if (postdata.importer_name) {
//       orConditions.push({
//         importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
//       });
//     }

//     if (postdata.importer_country) {
//       orConditions.push({
//         importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
//       });
//     }

//     if (postdata.trade_name) {
//       orConditions.push({
//         trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
//       });
//     }

//     if (postdata.exporter_country) {
//       orConditions.push({
//         exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       orConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     // Add more OR conditions here for other fields

//     // Combine all OR conditions using $or operator
//     const orQuery = orConditions.length > 0 ? { $or: orConditions } : {};

//     // Combine the AND and OR queries using $and operator
//     const finalQuery = {};
//     if (andConditions.length > 0) {
//       finalQuery.$and = [andQuery, orQuery];
//     } else {
//       finalQuery.$or = [orQuery];
//     }

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(finalQuery, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

















/**************************new after learn */
// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const queryConditions = [];

//     if (postdata.product_name) {
//       queryConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       queryConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       queryConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       queryConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       queryConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       queryConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Combine all query conditions using $and operator
//     const finalQuery = queryConditions.length > 0 ? { $and: queryConditions } : {};

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Create a compound index on the relevant fields for better performance
//     await collection.createIndex({ product_name: 1, exporter_name: 1, importer_name: 1 });

//     // Fetch the data from MongoDB with pagination and compound index
//     const result = await collection.find(finalQuery, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };












// async function GetChemroboticsData(req, res) {
//   try {
//     const postdata = req.body;
//     const pageSize = postdata.rowscount;
//     const pageNumber = postdata.pagenumber > 0 ? postdata.pagenumber : 1;
//     const skipCount = (pageNumber - 1) * pageSize;

//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const andConditions = [];
//     const orConditions = [];

//     if (postdata.product_name) {
//       andConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//       orConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       andConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//       orConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       andConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//       orConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       andConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//       orConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       andConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//       orConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       andConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//       orConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Add more AND conditions here for other fields

//     // Combine all AND conditions using $and operator
//     const andQuery = andConditions.length > 0 ? { $and: andConditions } : {};

//     // Combine all OR conditions using $or operator
//     const orQuery = orConditions.length > 0 ? { $or: orConditions } : {};

//     // Combine the AND and OR queries using $or operator when no AND conditions are provided
//     const finalQuery = andConditions.length > 0 ? { $and: [andQuery, orQuery] } : orQuery;

//     // Create compound indexes on the relevant fields for better performance
//     await collection.createIndex({ product_name: 1, exporter_name: 1, importer_name: 1, importer_country: 1, trade_name: 1, exporter_country: 1 });

//     // Server-side pagination options
//     const options = {
//       skip: skipCount,
//       limit: pageSize,
//     };

//     // Fetch the data from MongoDB using aggregation for better performance
//     const pipeline = [
//       { $match: finalQuery },
//       { $skip: skipCount },
//       { $limit: pageSize },
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// }

// // Export the advanced controller function
// export { GetChemroboticsData };



















/*------------Advanced version-----------------------------------------------------------------------*/

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const filterConditions = [];

//     if (postdata.product_name) {
//       filterConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       filterConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       filterConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       filterConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       filterConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       filterConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Add more filter conditions here for other fields

//     // Combine all filter conditions using $or operator
//     const finalQuery = filterConditions.length > 0 ? { $or: filterConditions } : {};

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(finalQuery, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

//-******---------This is with end with new AND  and OR conditional ---*****----------------------/


//-******------Version 4.0---This is with end with new AND  and OR indexing code conditional ---*****-------------------------------------------------------------------/
// import { MongoClient } from 'mongodb';

// //Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// // Use connection pooling
// const clientPromise = MongoClient.connect(mongoURI, { useUnifiedTopology: true });

// // Create indexes for the fields used in the search criteria
// const createIndexes = async () => {
//   const client = await clientPromise;
//   const db = client.db(dbName);
//   const collectionName = 'AGROPHARM_XMIM_MONGO'; // Replace with the actual collection name
//   const collection = db.collection(collectionName);

//   await collection.createIndex({ product_name: 1 });
//   await collection.createIndex({ exporter_name: 1 });
//   await collection.createIndex({ importer_name: 1 });
//   await collection.createIndex({ importer_country: 1 });
//   await collection.createIndex({ trade_name: 1 });
//   await collection.createIndex({ exporter_country: 1 });
// };

// // Apply indexes
// createIndexes();

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     const client = await clientPromise;
//     const db = client.db(dbName);

//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     const andConditions = [];
//     const orConditions = [];

//     if (postdata.product_name) {
//       const productNameRegex = new RegExp(postdata.product_name, 'i');
//       andConditions.push({ product_name: productNameRegex });
//       orConditions.push({ product_name: productNameRegex });
//     }

//     if (postdata.exporter_name) {
//       const exporterNameRegex = new RegExp(postdata.exporter_name, 'i');
//       andConditions.push({ exporter_name: exporterNameRegex });
//       orConditions.push({ exporter_name: exporterNameRegex });
//     }

//     if (postdata.importer_name) {
//       const importerNameRegex = new RegExp(postdata.importer_name, 'i');
//       andConditions.push({ importer_name: importerNameRegex });
//       orConditions.push({ importer_name: importerNameRegex });
//     }

//     if (postdata.importer_country) {
//       const importerCountryRegex = new RegExp(postdata.importer_country, 'i');
//       andConditions.push({ importer_country: importerCountryRegex });
//       orConditions.push({ importer_country: importerCountryRegex });
//     }

//     if (postdata.trade_name) {
//       const tradeNameRegex = new RegExp(postdata.trade_name, 'i');
//       andConditions.push({ trade_name: tradeNameRegex });
//       orConditions.push({ trade_name: tradeNameRegex });
//     }

//     if (postdata.exporter_country) {
//       const exporterCountryRegex = new RegExp(postdata.exporter_country, 'i');
//       andConditions.push({ exporter_country: exporterCountryRegex });
//       orConditions.push({ exporter_country: exporterCountryRegex });
//     }

//     // Add more AND conditions here for other fields

//     const finalQuery = {};

//     if (andConditions.length > 0) {
//       finalQuery.$and = andConditions;
//     }

//     if (orConditions.length > 0) {
//       finalQuery.$or = orConditions;
//     }

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Use projection to fetch only the necessary fields
//     const projection = {
//       _id: 0, // Exclude the _id field from the results
//       // Include other fields that you need in the result
//       //For example:
//       product_name: 1,
//       exporter_name: 1,
//       importer_name: 1,
//       importer_country: 1,
//       trade_name: 1,
//       exporter_country: 1,
//     };

//     // Fetch the data from MongoDB using aggregation pipeline
//     const result = await collection
//       .aggregate([
//         { $match: finalQuery },
//         { $project: projection },
//         { $skip: options.skip },
//         { $limit: options.limit },
//       ])
//       .toArray();

//     res.json(result);
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };




/***----------Version 5.0-------------------------------------------------------------------------------agregation pipeline */

// import { MongoClient } from 'mongodb';

// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB aggregation pipeline based on the provided filter conditions
//     const pipeline = [];

//     // Match stage for AND conditions
//     const andConditions = [];
//     if (postdata.product_name) {
//       andConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       andConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       andConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       andConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       andConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       andConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Add more AND conditions here for other fields...

//     if (andConditions.length > 0) {
//       pipeline.push({ $match: { $and: andConditions } });
//     }

//     // Match stage for OR conditions
//     const orConditions = [];
//     if (postdata.product_name) {
//       orConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       orConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       orConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       orConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       orConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       orConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Add more OR conditions here for other fields...

//     if (orConditions.length > 0) {
//       pipeline.push({ $match: { $or: orConditions } });
//     }

//     // Server-side pagination options using $skip and $limit
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Add pagination to the pipeline
//     pipeline.push({ $skip: options.skip }, { $limit: options.limit });

//     // Fetch the data from MongoDB using aggregation pipeline
//     const result = await collection.aggregate(pipeline).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };



/**--------------version6.0 aggregation pipleine with match query ------------------------------------------------------------------------------------------- */

// // Import required modules
// import { MongoClient } from 'mongodb';

// // MongoDB connection URI and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// // Use connection pooling
// const clientPromise = MongoClient.connect(mongoURI, { useUnifiedTopology: true });

// // API endpoint to get data using optimized query
// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     const client = await clientPromise;
//     const db = client.db(dbName);

//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the aggregation pipeline based on the provided filter conditions
//     const pipeline = [];

//     // AND conditions
//     const andConditions = [];

//     if (postdata.product_name) {
//       andConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       andConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       andConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       andConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       andConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       andConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Combine all AND conditions using $and operator
//     if (andConditions.length > 0) {
//       pipeline.push({ $match: { $and: andConditions } });
//     }

//     // OR conditions
//     const orConditions = [];

//     if (postdata.product_name) {
//       orConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       orConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Combine all OR conditions using $or operator
//     if (orConditions.length > 0) {
//       pipeline.push({ $match: { $or: orConditions } });
//     }

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Use projection to fetch only the necessary fields
//     const projection = {
//       _id: 0, // Exclude the _id field from the results
//       // Include other fields that you need in the result
//       // For example:
//       product_name: 1,
//       exporter_name: 1,
//       importer_name: 1,
//       importer_country: 1,
//       trade_name: 1,
//       exporter_country: 1,
//     };

//     pipeline.push({ $project: projection });

//     // Fetch the data from MongoDB using the aggregation pipeline
//     const result = await collection.aggregate(pipeline).toArray();
//     res.json(result);

//     // Close the MongoDB connection (Note: The connection pool will manage connections automatically)
//     console.log('Disconnected from MongoDB');
//   } catch (error) {
//     console.error('Error querying MongoDB:', error);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };



/****version7.0 --------------------------- reduce duplicate condiions */
// Import required modules
// import { MongoClient } from 'mongodb';

// // MongoDB connection URI and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// // Use connection pooling
// const clientPromise = MongoClient.connect(mongoURI, { useUnifiedTopology: true });

// // API endpoint to get data using optimized query
// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     const client = await clientPromise;
//     const db = client.db(dbName);

//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const conditions = [];

//     if (postdata.product_name) {
//       conditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       conditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       conditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       conditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       conditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       conditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Add more conditions here for other fields

//     // Combine all conditions using $and operator
//     const finalQuery = conditions.length > 0 ? { $and: conditions } : {};

//     // Server-side pagination options
//     const pageSize = postdata.rowscount;
//     const pageNumber = postdata.pagenumber > 0 ? postdata.pagenumber : 1;
//     const skipCount = (pageNumber - 1) * pageSize;

//     // Fetch the data from MongoDB using the cursor method for pagination
//     const cursor = collection.find(finalQuery).skip(skipCount).limit(pageSize);

//     // Convert the cursor to an array of documents
//     const result = await cursor.toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };


/****version 8.0 ---------------------------regex improved indexing  */

// import { MongoClient } from 'mongodb';

// // MongoDB connection URI and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// // Utility function to create case-insensitive regex
// function createCaseInsensitiveRegex(str) {
//   return new RegExp(str, "i");
// }

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     const client = await MongoClient.connect(mongoURI);
//     const db = client.db(dbName);

//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     const filters = {};

//     if (postdata.product_name) {
//       filters.product_name = createCaseInsensitiveRegex(postdata.product_name);
//     }

//     if (postdata.exporter_name) {
//       filters.exporter_name = createCaseInsensitiveRegex(postdata.exporter_name);
//     }

//     if (postdata.importer_name) {
//       filters.importer_name = createCaseInsensitiveRegex(postdata.importer_name);
//     }

//     if (postdata.importer_country) {
//       filters.importer_country = createCaseInsensitiveRegex(postdata.importer_country);
//     }

//     if (postdata.trade_name) {
//       filters.trade_name = createCaseInsensitiveRegex(postdata.trade_name);
//     }

//     if (postdata.exporter_country) {
//       filters.exporter_country = createCaseInsensitiveRegex(postdata.exporter_country);
//     }

//     // Add more filters here for other fields

//     // Ensure that the fields used in search conditions are indexed properly
//     await collection.createIndex({ product_name: 1 });
//     await collection.createIndex({ exporter_name: 1 });
//     await collection.createIndex({ importer_name: 1 });
//     await collection.createIndex({ importer_country: 1 });
//     await collection.createIndex({ trade_name: 1 });
//     await collection.createIndex({ exporter_country: 1 });

//     // Server-side cursor-based pagination options
//     const pageSize = postdata.rowscount || 10;
//     const pageNumber = postdata.pagenumber > 0 ? postdata.pagenumber : 1;
//     const skipCount = (pageNumber - 1) * pageSize;

//     // Perform the MongoDB search using the optimized filters
//     const cursor = collection.find(filters).skip(skipCount).limit(pageSize);

//     // Convert the cursor to an array of documents
//     const result = await cursor.toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };




















































// backup up code


/*-----------First monogoDB client connection code -----------------------------------------------------------------------------------------------------------------------*/
// import { MongoClient } from 'mongodb';

// // Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name
// const collectionName = 'AGROPHARM_XMIM_MONGO'; // Replace with your collection name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter condition
//     const query = {
//       product_name: {
//         $regex: new RegExp(postdata.filtercondition, 'i'),
//       },
//     };

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//       sort: { [postdata.sortby]: 1 }, // Replace 'postdata.sortby' with the actual field name for sorting
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(query, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

//------Version 1.0----------------------This is start for new one only for product search--------------------------------------------------------------------------------------/
//This is fastest comtroller to fetch data from mongoDB get data in 2seconds
// import { MongoClient } from 'mongodb';

// // Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter condition
//     const query = {
//       product_name: {
//         $regex: new RegExp(postdata.product_name, 'i'),
//       },
//     };

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(query, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

//----------------------------This is end for new one------------------/


//-----Version 2.0-----This is with start new AND  conditional -------------------------------------------------------------------------------------------------------------/
//import { MongoClient } from 'mongodb';

// Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const filterConditions = [];
//     if (postdata.product_name) {
//       filterConditions.push({
//         product_name: { $regex: new RegExp(postdata.product_name, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       filterConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     if (postdata.importer_name) {
//       filterConditions.push({
//         importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
//       });
//     }

//     if (postdata.importer_country) {
//       filterConditions.push({
//         importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
//       });
//     }

//     if (postdata.trade_name) {
//       filterConditions.push({
//         trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
//       });
//     }

//     if (postdata.exporter_country) {
//       filterConditions.push({
//         exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       filterConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     // Combine filter conditions using $and and $or operators
//     const query = filterConditions.length > 0 ? { $and: filterConditions } : {};

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(query, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

//----------This is with end new AND  conditional -------------------------/

//-******---Version 3.0------This is with start new AND  and OR conditional ---*****--------------------------------------------------------------------------------------/
// import { MongoClient } from 'mongodb';

// //Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name

// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;
 
//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const andConditions = [];

//     if (postdata.product_name) {
//       andConditions.push({
//         product_name: { $regex: new RegExp(postdata.product_name, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       andConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     if (postdata.importer_name) {
//       andConditions.push({
//         importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
//       });
//     }

//     if (postdata.importer_country) {
//       andConditions.push({
//         importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
//       });
//     }

//     if (postdata.trade_name) {
//       andConditions.push({
//         trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
//       });
//     }

//     if (postdata.exporter_country) {
//       andConditions.push({
//         exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
//       });
//     }
//     //suplier name
//     if (postdata.exporter_name) {
//       andConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }
//     // Add more AND conditions here for other fields

//     // Combine all AND conditions using $and operator
//     const andQuery = andConditions.length > 0 ? { $and: andConditions } : {};

//     // Build the OR conditions for the same field using $or operator
//     const orConditions = [];

//     if (postdata.product_name) {
//       orConditions.push({
//         product_name: { $regex: new RegExp(postdata.product_name, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       orConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     if (postdata.importer_name) {
//       orConditions.push({
//         importer_name: { $regex: new RegExp(postdata.importer_name, 'i') },
//       });
//     }

//     if (postdata.importer_country) {
//       orConditions.push({
//         importer_country: { $regex: new RegExp(postdata.importer_country, 'i') },
//       });
//     }

//     if (postdata.trade_name) {
//       orConditions.push({
//         trade_name: { $regex: new RegExp(postdata.trade_name, 'i') },
//       });
//     }

//     if (postdata.exporter_country) {
//       orConditions.push({
//         exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') },
//       });
//     }

//     if (postdata.exporter_name) {
//       orConditions.push({
//         exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') },
//       });
//     }

//     // Add more OR conditions here for other fields

//     // Combine all OR conditions using $or operator
//     const orQuery = orConditions.length > 0 ? { $or: orConditions } : {};

//     // Combine the AND and OR queries using $and operator
//     const finalQuery = {};
//     if (andConditions.length > 0) {
//       finalQuery.$and = [andQuery, orQuery];
//     } else {
//       finalQuery.$or = [orQuery];
//     }

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Fetch the data from MongoDB
//     const result = await collection.find(finalQuery, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };

/**************************new after learn */
// export const GetChemroboticsData = async (req, res) => {
//   try {
//     const postdata = req.body;

//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);

//     // Get the collection based on the provided tablename
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const queryConditions = [];

//     if (postdata.product_name) {
//       queryConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       queryConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       queryConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       queryConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       queryConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       queryConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Combine all query conditions using $and operator
//     const finalQuery = queryConditions.length > 0 ? { $and: queryConditions } : {};

//     // Server-side pagination options
//     const options = {
//       skip: (postdata.pagenumber - 1) * postdata.rowscount,
//       limit: postdata.rowscount,
//     };

//     // Create a compound index on the relevant fields for better performance
//     await collection.createIndex({ product_name: 1, exporter_name: 1, importer_name: 1 });

//     // Fetch the data from MongoDB with pagination and compound index
//     const result = await collection.find(finalQuery, options).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };


// async function GetChemroboticsData(req, res) {
//   try {
//     const postdata = req.body;
//     const pageSize = postdata.rowscount;
//     const pageNumber = postdata.pagenumber > 0 ? postdata.pagenumber : 1;
//     const skipCount = (pageNumber - 1) * pageSize;

//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChemroboticsData MongoDB successfully!');
//     const db = client.db(dbName);
//     const collectionName = postdata.tablename;
//     const collection = db.collection(collectionName);

//     // Build the MongoDB query based on the provided filter conditions
//     const andConditions = [];
//     const orConditions = [];

//     if (postdata.product_name) {
//       andConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//       orConditions.push({ product_name: { $regex: new RegExp(postdata.product_name, 'i') } });
//     }

//     if (postdata.exporter_name) {
//       andConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//       orConditions.push({ exporter_name: { $regex: new RegExp(postdata.exporter_name, 'i') } });
//     }

//     if (postdata.importer_name) {
//       andConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//       orConditions.push({ importer_name: { $regex: new RegExp(postdata.importer_name, 'i') } });
//     }

//     if (postdata.importer_country) {
//       andConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//       orConditions.push({ importer_country: { $regex: new RegExp(postdata.importer_country, 'i') } });
//     }

//     if (postdata.trade_name) {
//       andConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//       orConditions.push({ trade_name: { $regex: new RegExp(postdata.trade_name, 'i') } });
//     }

//     if (postdata.exporter_country) {
//       andConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//       orConditions.push({ exporter_country: { $regex: new RegExp(postdata.exporter_country, 'i') } });
//     }

//     // Add more AND conditions here for other fields

//     // Combine all AND conditions using $and operator
//     const andQuery = andConditions.length > 0 ? { $and: andConditions } : {};

//     // Combine all OR conditions using $or operator
//     const orQuery = orConditions.length > 0 ? { $or: orConditions } : {};

//     // Combine the AND and OR queries using $or operator when no AND conditions are provided
//     const finalQuery = andConditions.length > 0 ? { $and: [andQuery, orQuery] } : orQuery;

//     // Create compound indexes on the relevant fields for better performance
//     await collection.createIndex({ product_name: 1, exporter_name: 1, importer_name: 1, importer_country: 1, trade_name: 1, exporter_country: 1 });

//     // Server-side pagination options
//     const options = {
//       skip: skipCount,
//       limit: pageSize,
//     };

//     // Fetch the data from MongoDB using aggregation for better performance
//     const pipeline = [
//       { $match: finalQuery },
//       { $skip: skipCount },
//       { $limit: pageSize },
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     res.json(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// }

// // Export the advanced controller function
// export { GetChemroboticsData };