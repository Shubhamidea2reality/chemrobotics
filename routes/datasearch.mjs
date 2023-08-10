import { MongoClient } from "mongodb";

/*
 * GET Dropdown Values Details.
 */
// export const GetDropDownValues = (req, res) => {
//   try {
//     var postdata = JSON.parse(JSON.stringify(req.body));

//     //console.log(postdata);

//     req.getConnection(function (err, connection) {
//       var query = connection.query(
//         `CALL dbp_Get_Dropdown_Values('${postdata.searchword}','${postdata.tablename}','${postdata.columnname}',${postdata.pagenumber},${postdata.rowscount});`,
//         function (err, rows) {
//           if (err) {
//             console.log("Error Selecting : %s ", err);
//             res.send({ status: "error", Message: err.sqlMessage });
//           } else {
//             //console.log(rows);
//             res.send(rows[0]);
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


/* Get dropdown from mongoDB ---*/

//import { JsonWebTokenError } from "jsonwebtoken";


export const GetDropDownValues = async (req, res) => {
  try {
    const postdata = JSON.parse(JSON.stringify(req.body));

    // Create a MongoDB connection
    const uri = "mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db"; // Change this URI to your MongoDB server URI
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("chemrobo_db"); // Change "your_db_name" to the name of your MongoDB database
    const collection = db.collection(postdata.tablename);

    // Define the filter based on the searchword and columnname
    const filter = {};
    filter[postdata.columnname] = { $regex: new RegExp(postdata.searchword, "i") };

    // Define pagination options
    const options = {
      skip: (postdata.pagenumber - 1) * postdata.rowscount,
      limit: postdata.rowscount,
    };

    // Perform the find operation
    const rows = await collection.find(filter, options).toArray();
    res.send(rows);

    // Close the MongoDB connection
    client.close();
  } catch (e) {
    console.log("Error log: %s ", e);
    res.status(400).send("Bad Request!");
  }  
};


// /*
//  * GET Page Maintanance Details.
//  */
export const GetPagemaintain = (req, res) => {
  try {
    var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    req.getConnection(function (err, connection) {
      var query = connection.query(
        `CALL dbp_MSTR_PAGEMAINTAIN('${postdata.pagename}');`,
        function (err, rows) {
          if (err) {
            console.log("Error Selecting : %s ", err);
            res.send({ status: "error", Message: err.sqlMessage });
          } else {
            //console.log(rows);
            res.send(rows[0]);
          }
        }
      );

      //console.log(query.sql);
    });
  } catch (e) {
    console.log("Error log: %s ", e);
    response.status(400).send("Bad Request!");
  }
};

/*
 * Manage Template Column Details.
 */
export const ManageTemplateColumn = (req, res) => {
  try {
    //var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    req.getConnection(function (err, connection) {
      var query = connection.query(
        `CALL dbp_DatabaseColumn_manage('${JSON.stringify(req.body)}');`,
        function (err, rows) {
          if (err) {
            res.status(500).json({ message: err.toString() });
          } else {
            //console.log(rows);
            res.status(200).json(rows);
          }
        }
      );

      //console.log(query.sql);
    });
  } catch (e) {
    console.log("Error log: %s ", e);
    response.status(400).send("Bad Request!");
  }
};


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


// new mongo 


// Connection URL and database name
//const mongoURI = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db'; // Replace with your MongoDB connection URI
const mongoURI = process.env.MONGODB_CONNECTION_STRING;
const dbName = 'chemrobo_db'; // Replace with your database name

// Use connection pooling
const clientPromise = MongoClient.connect(mongoURI, { useUnifiedTopology: true });

// Create indexes for the fields used in the search criteria
const createIndexes = async () => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collectionName = 'AGROPHARM_XMIM_MONGO'; // Replace with the actual collection name
  const collection = db.collection(collectionName);

  await collection.createIndex({ product_name: 1 });
  await collection.createIndex({ exporter_name: 1 });
  await collection.createIndex({ importer_name: 1 });
  await collection.createIndex({ importer_country: 1 });
  await collection.createIndex({ trade_name: 1 });
  await collection.createIndex({ exporter_country: 1 });
};

// Apply indexes
createIndexes();

export const GetChemroboticsData = async (req, res) => {
  try {
    const postdata = req.body;
    console.log(JSON.parse(postdata.filtercondition).filterData);
    

    const client = await clientPromise;
    const db = client.db(dbName);
    
    const collectionName = postdata.tablename;
    const collection = db.collection(collectionName);
    
    
    const fieldsCollectionName = postdata.fieldsTableName;
    const fieldsCollection = db.collection(fieldsCollectionName);
     let result = [];
    
   //start


    //simple filter
   if(postdata.additional_param.search_filters.SeachType == 'Simple Filter'){

    

    let filterData = JSON.parse(postdata.filtercondition).filterData;
    let filterCriteria = {};      
     

    if(filterData.filterType == 'FREETEXT'){
      filterCriteria[filterData.searchField] = filterData.searchtext;
      
     await collection.createIndex({ [filterData.searchField]: "text" });      

    //  const findData = await collection.find(filterCriteria)
    //  .skip((postdata.pagenumber - 1) * postdata.rowscount)
    //  .limit(postdata.rowscount).toArray();
    // let findData;
    //   if(filterData.colFilters && filterData.colFilters.length>0){
    //     console.log('inside.....');
    //     findData = await collection.find({$and: [
    //       {$text: {$search: filterData.searchtext}},
    //       // {'product_name': /^bi/i}
    //       ...filterData.colFilters
    //     ]})
    //      .skip((postdata.pagenumber - 1) * postdata.rowscount)
    //      .limit(postdata.rowscount).toArray();
        
    //   }else{
    //     findData = await collection.find({$text: {$search: filterData.searchtext}})
    //      .skip((postdata.pagenumber - 1) * postdata.rowscount)
    //      .limit(postdata.rowscount).toArray();
    //   }

      // const findData = await collection.find({$and: [
      //     {$text: {$search: filterData.searchtext}}
      //   ]})
      //    .skip((postdata.pagenumber - 1) * postdata.rowscount)
      //    .limit(postdata.rowscount).toArray();

      const findData = await collection.find({$and: [
        {$text: {$search: filterData.searchtext}},
        // {'product_name': /^bi/i}
        ...filterData.colFilters
      ]})
       .skip((postdata.pagenumber - 1) * postdata.rowscount)
       .limit(postdata.rowscount).toArray();    


     const totalCount = await collection.find({ $text: {$search: filterData.searchtext}}).count();
     const fieldsData = await fieldsCollection.find({Is_display: 1}).toArray();

     result.push({TotalRecordsCount: totalCount});
     result.push(findData);
     result.push(fieldsData);
    }else{
     filterCriteria[filterData.searchField] = { $regex: filterData.searchtext, $options: 'i' };
     
     const findData = await collection.find(filterCriteria)
     .skip((postdata.pagenumber - 1) * postdata.rowscount)
     .limit(postdata.rowscount).toArray();
     const totalCount = await collection.countDocuments(filterCriteria);
     const fieldsData = await fieldsCollection.find({Is_display: 1}).toArray();
     result.push({TotalRecordsCount: totalCount});
     result.push(findData);
     result.push(fieldsData);
    }              
       
}
//advance filter
    else{
      let filterData = JSON.parse(postdata.filtercondition).filterData;

  
    // const andConditions = [];
    // const orConditions = [];


    // if (postdata.product_name) {
    //   const productNameRegex = new RegExp(postdata.product_name, 'i');
    //   andConditions.push({ product_name: productNameRegex });
    //   orConditions.push({ product_name: productNameRegex });
    // }

    // if (postdata.exporter_name) {
    //   const exporterNameRegex = new RegExp(postdata.exporter_name, 'i');
    //   andConditions.push({ exporter_name: exporterNameRegex });
    //   orConditions.push({ exporter_name: exporterNameRegex });
    // }

    // if (postdata.importer_name) {
    //   const importerNameRegex = new RegExp(postdata.importer_name, 'i');
    //   andConditions.push({ importer_name: importerNameRegex });
    //   orConditions.push({ importer_name: importerNameRegex });
    // }

    // if (postdata.importer_country) {
    //   const importerCountryRegex = new RegExp(postdata.importer_country, 'i');
    //   andConditions.push({ importer_country: importerCountryRegex });
    //   orConditions.push({ importer_country: importerCountryRegex });
    // }

    // if (postdata.trade_name) {
    //   const tradeNameRegex = new RegExp(postdata.trade_name, 'i');
    //   andConditions.push({ trade_name: tradeNameRegex });
    //   orConditions.push({ trade_name: tradeNameRegex });
    // }

    // if (postdata.exporter_country) {
    //   const exporterCountryRegex = new RegExp(postdata.exporter_country, 'i');
    //   andConditions.push({ exporter_country: exporterCountryRegex });
    //   orConditions.push({ exporter_country: exporterCountryRegex });
    // }

    // Add more AND conditions here for other fields

    const finalQuery = {};

    // if (andConditions.length > 0) {
    //   finalQuery.$and = andConditions;
    // }

    // if (orConditions.length > 0) {
    //   finalQuery.$or = orConditions;
    // }

    // Server-side pagination options
    const options = {
      skip: (postdata.pagenumber - 1) * postdata.rowscount,
      limit: postdata.rowscount,
    };

    // Use projection to fetch only the necessary fields
    // const projection = {
    //   id: 0, // Exclude the id field from the results
    //   // Include other fields that you need in the result
    //   // For example:
    //   // product_name: 1,
    //   // exporter_name: 1,
    //   // importer_name: 1,
    //   // importer_country: 1,
    //   // trade_name: 1,
    //   // exporter_country: 1,
    // };

   // Fetch the data from MongoDB using a covered query with projection
   const findData = await collection
      .find(filterData)
      .skip(options.skip)
      .limit(options.limit)
      .toArray();
      const totalCount = await collection.countDocuments(filterData);
      result.push({TotalRecordsCount: totalCount});
      result.push(findData);
      result.push(fieldsData);
    }    
    const fieldsData = await fieldsCollection.find({Is_display: 1}).sort({ display_order: 1}).toArray();
    res.send(result);
  } catch (err) {
    console.error('Error querying MongoDB:', err);
    res.status(500).json({ error: 'An error occurred while querying MongoDB' });
  }
};




// //import { MongoClient } from 'mongodb';

// // Connection URL and database name
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
    
//     console.log(postdata);

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
//       id: 0, // Exclude the id field from the results
//       // Include other fields that you need in the result
//       // For example:
//       // product_name: 1,
//       // exporter_name: 1,
//       // importer_name: 1,
//       // importer_country: 1,
//       // trade_name: 1,
//       // exporter_country: 1,
//     };

//     // Fetch the data from MongoDB using a covered query with projection
//     const result = await collection
//       .find(finalQuery, projection)
//       .skip(options.skip)
//       .limit(options.limit)
//       .toArray();

//     res.json(result);
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'An error occurred while querying MongoDB' });
//   }
// };




//GET DYNAMIC MASTER DETAILS
export const dynMaster = (req, res, next) => {
  req.getConnection(function (err, connection) {
      if (err) {
        return res.status(500).json({ message: err.toString() });
      }
      connection.query(
        `CALL dbp_dyn_master_manage('${JSON.stringify(req.body)}');`,
        function (err, rows) {
          if (err) {
            res.status(500).json({ message: err.toString() });
          } else {
            res.status(200).json(rows);
          }
        }
      );
    });
};

//GET DYNAMIC MASTER DETAILS -- MANAGE EMPLOYEE DOCUMNETS
export const dynEmpDocMaster = (req, res, next) => {
  req.getConnection(function (err, connection) {
      if (err) {
        return res.status(500).json({ message: err.toString() });
      }
      connection.query(
        `CALL dbp_user_master_doc_manage('${JSON.stringify(req.body)}');`,
        function (err, rows) {
          if (err) {
            res.status(500).json({ message: err.toString() });
          } else {
            res.status(200).json(rows);
          }
        }
      );
    });
};


