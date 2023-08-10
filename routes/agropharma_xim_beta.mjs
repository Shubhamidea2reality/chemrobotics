// // /*
// //  * GET CHART DATA.
// //  */
// export const GetChartData = (req, res) => {
//     try {
//       var postdata = JSON.parse(JSON.stringify(req.body));

//       //console.log(postdata);

//       req.getConnection(function (err, connection) {
//         let sql_qry=`CALL dbp_AGROPHARM_XIM_ChartData('GET','${postdata.filtercondition}');`;
//         console.log(sql_qry);
//         var query = connection.query(
//           sql_qry,
//           function (err, rows) {
//             if (err) {
//               console.log("Error Selecting : %s ", err);
//               res.send({ status: "error", Message: err.sqlMessage });
//             } else {
//               //console.log(rows);
//               res.send(rows);
//             }
//           }
//         );

//         //console.log(query.sql);
//       });
//     } catch (e) {
//       console.log("Error log: %s ", e);
//       response.status(400).send("Bad Request!");
//     }
//   };



// import { MongoClient } from 'mongodb';

// // Connection URL and database name
// const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
// const dbName = 'chemrobo_db'; // Replace with your database name
// const collectionName = 'AGROPHARM_XMIM_MONGO'; // Replace with your collection name


// export const GetChartData = async (req, res) => {
//   try {
//     const postdata = req.body;
//      console.log(postdata);
//     // Connect to MongoDB
//     const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
//     console.log('Connected to GetChartData MongoDB successfully!');
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     const filterData = JSON.parse(postdata.filtercondition);
//     console.log(filterData);

//     // Build the MongoDB aggregation pipeline based on the provided filter condition

//     // const result = await  collection.find({$text:{$search:{[filterData.searchField]: filterData.searchtext}}}).toArray();
//     console.log(result);
//     // Execute the aggregation pipeline
//     // const result = await collection.aggregate(pipeline).toArray();
//     res.send(result);

//     // Close the MongoDB connection
//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };







import { MongoClient } from 'mongodb';



//   // Connection URL and database name
//   const mongoURI = process.env.MONGODB_CONNECTION_STRING;
//   const dbName = 'chemrobo_db'; // Replace with your database name
//   const collectionName = 'AGROPHARM_XMIM_MONGO'; 
//   // Use connection pooling
//   const clientPromise = MongoClient.connect(mongoURI, { useUnifiedTopology: true });

//   export const GetChartData = async (req, res) => {
//     try {
//       const postdata = req.body;
//       console.log('GetChartData---------------------------------------');
//   console.log(postdata);

//   const client = await clientPromise;
//   const db = client.db(dbName);

//   const collectionName = "AGROPHARM_XMIM_MONGO";
//   const collection = db.collection(collectionName);

//   const fieldsCollectionName = postdata.fieldsTableName;
//   const fieldsCollection = db.collection(fieldsCollectionName);

//    let result = [];

//  //start
//  console.log(postdata);
//  if(filterData.filterType == 'FREETEXT'){
//   filterCriteria[filterData.searchField] = filterData.searchtext;

//  await collection.createIndex({ [filterData.searchField]: "text" });      

// //  const findData = await collection.find(filterCriteria)
// //  .skip((postdata.pagenumber - 1) * postdata.rowscount)
// //  .limit(postdata.rowscount).toArray();

// const findData = await collection.aggregate([
//     { $match: {$text: {$search: filterData.searchtext}}},
//     { $group: { _id:'TYPE', totalCount: { $sum: "$QUANTITY"} }}
//   ]);

// console.log(findData);

//  result.push(findData);
// }else{
//  filterCriteria[filterData.searchField] = { $regex: filterData.searchtext, $options: 'i' };

//  const findData = await collection.find(filterCriteria)
//  .skip((postdata.pagenumber - 1) * postdata.rowscount)
//  .limit(postdata.rowscount).toArray();
//  const totalCount = await collection.countDocuments(filterCriteria);
//  const fieldsData = await fieldsCollection.find({Is_display: 1}).toArray();
//  result.push({TotalRecordsCount: totalCount});
//  result.push(findData);
//  result.push(fieldsData);
// }           


//       res.send(result);

//       // Close the MongoDB connection
//       client.close();
//       console.log('Disconnected from MongoDB');
//     } catch (err) {
//       console.error('Error querying MongoDB:', err);
//       res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//     }
//   };













//import { MongoClient } from 'mongodb';

// Connection URL and database name
const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
const dbName = 'chemrobo_db'; // Replace with your database name
const collectionName = 'AGROPHARM_XMIM_MONGO'; // Replace with your collection name


export const GetChartData = async (req, res) => {
  try {
    const postdata = req.body;
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    console.log('Connected to GetChartData MongoDB successfully!');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let result = [];
    let filterData = JSON.parse(postdata.filtercondition).filterData;
    //start
    console.log(filterData);
    console.log(filterData.filterType);

    if (filterData.filterType == 'FREETEXT') {
      await collection.createIndex({ [filterData.searchField]: "text" });
      const quantitySum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { TYPE: { $in: [/^IMPORT$/i, /^EXPORT$/i] } },
              { UNIT: { $regex: /^KGS$/i } }
            ]
          }
        },

        {
          $group: {
            "_id": "$TYPE",
            "Quantity(kg)": {
              $sum: { $toDouble: "$QUANTITY" }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();

      const exportSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { TYPE: { $regex: /^EXPORT$/i } }
            ]
          }
        },
        {
          $project: {
            UNIT: { $trim: { input: "$UNIT", chars: " " } },
            QUANTITY: 1
          }
        },

        {
          $group: {
            "_id": "$UNIT",
            "Quantity(kg)": {
              $sum: { $toDouble: "$QUANTITY" }
            }
          }
        }]).sort({ "_id": 1 }).toArray();


      const importSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { TYPE: { $regex: /^IMPORT$/i } }
            ]
          }
        },
        {
          $project: {
            UNIT: { $trim: { input: "$UNIT", chars: " " } },
            QUANTITY: 1
          }
        },

        {
          $group: {
            "_id": "$UNIT",
            "Quantity(kg)": {
              $sum: { $toDouble: "$QUANTITY" }
            }
          }
        }]).sort({ "_id": 1 }).toArray();

      const amountSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { TYPE: { $in: [/^IMPORT$/i, /^EXPORT$/i] } },
            ]
          }
        },

        {
          $group: {
            "_id": "$TYPE",
            "USD_VALUE": {
              $sum: {
                $cond: {
                  if: { $eq: ["$TYPE", "IMPORT"] },
                  then: { $toDouble: "$TOTAL_ASS_VALUE" },
                  else: { $toDouble: "$total_fob_value_in_inr" }
                }
              }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();

      const exportAmountSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { TYPE: /^EXPORT$/i},
            ]
          }
        },        
        {
          $group: {
            "_id":  "$COUNTRY_OF_ORIGIN",
            "USD_VALUE (TOTAL FOB VALUE IN INR)": {
              $sum: {
                $toDouble: "$total_fob_value_in_inr"
              }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();
     
 

      const importAmountSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { TYPE: /^IMPORT$/i},
            ]
          }
        },       
        {
          $group: {
            "_id": "$COUNTRY_OF_ORIGIN",
            "USD_VALUE (TOTAL_ASS_VALUE)": {
              $sum: {
                $toDouble: "$TOTAL_ASS_VALUE" 
              }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();

      result.push(quantitySum);
      result.push(exportSum);
      result.push(importSum);
      result.push(amountSum);
      result.push(exportAmountSum);
      result.push(importAmountSum);

    } else {
      // await collection.createIndex({ [filterData.searchField]: "text" });
      const quantitySum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { [filterData.searchField]: { $regex: filterData.searchtext, $options: 'i' } },
              { TYPE: { $in: [/^IMPORT$/i, /^EXPORT$/i] } },
              { UNIT: { $regex: /^KGS$/i } }
            ]
          }
        },

        {
          $group: {
            "_id": "$TYPE",
            "Quantity(kg)": {
              $sum: { $toDouble: "$QUANTITY" }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();

      const exportSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { [filterData.searchField]: { $regex: filterData.searchtext, $options: 'i' } },
              { TYPE: { $regex: /^EXPORT$/i } }
            ]
          }
        },
        {
          $project: {
            UNIT: { $trim: { input: "$UNIT", chars: " " } },
            QUANTITY: 1
          }
        },

        {
          $group: {
            "_id": "$UNIT",
            "Quantity(kg)": {
              $sum: { $toDouble: "$QUANTITY" }
            }
          }
        }]).sort({ "_id": 1 }).toArray();


      const importSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { [filterData.searchField]: { $regex: filterData.searchtext, $options: 'i' } },
              { TYPE: { $regex: /^IMPORT$/i } }
            ]
          }
        },
        {
          $project: {
            UNIT: { $trim: { input: "$UNIT", chars: " " } },
            QUANTITY: 1
          }
        },

        {
          $group: {
            "_id": "$UNIT",
            "Quantity(kg)": {
              $sum: { $toDouble: "$QUANTITY" }
            }
          }
        }]).sort({ "_id": 1 }).toArray();

      const amountSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { [filterData.searchField]: { $regex: filterData.searchtext, $options: 'i' } },
              { TYPE: { $in: [/^IMPORT$/i, /^EXPORT$/i] } },
            ]
          }
        },

        {
          $group: {
            "_id": "$TYPE",
            "USD_VALUE": {
              $sum: {
                $cond: {
                  if: { $eq: ["$TYPE", "IMPORT"] },
                  then: { $toDouble: "$TOTAL_ASS_VALUE" },
                  else: { $toDouble: "$total_fob_value_in_inr" }
                }
              }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();

      const exportAmountSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { [filterData.searchField]: { $regex: filterData.searchtext, $options: 'i' } },
              { TYPE: /^EXPORT$/i},
            ]
          }
        },        
        {
          $group: {
            "_id":  "$COUNTRY_OF_ORIGIN",
            "USD_VALUE (TOTAL FOB VALUE IN INR)": {
              $sum: {
                $toDouble: "$total_fob_value_in_inr"
              }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();
     
 

      const importAmountSum = await collection.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: filterData.searchtext } },
              { [filterData.searchField]: { $regex: filterData.searchtext, $options: 'i' } },
              { TYPE: /^IMPORT$/i},
            ]
          }
        },       
        {
          $group: {
            "_id": "$COUNTRY_OF_ORIGIN",
            "USD_VALUE (TOTAL_ASS_VALUE)": {
              $sum: {
                $toDouble: "$TOTAL_ASS_VALUE" 
              }
            }
          }
        }
      ]).sort({ "_id": 1 }).toArray();

      result.push(quantitySum);
      result.push(exportSum);
      result.push(importSum);
      result.push(amountSum);
      result.push(exportAmountSum);
      result.push(importAmountSum);
    }
    res.send(result);
    // Close the MongoDB connection
    client.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error querying MongoDB:', err);
    res.status(500).json({ error: 'An error occurred while querying MongoDB' });
  }
};