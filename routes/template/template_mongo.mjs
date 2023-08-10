import db from "../../app/config/db/mongodbconnection.mjs";
//import db from "../../app/config/db/monogClient.mjs"

/*
 * GET Template Table Details.
 */
export const GetTemplateTableDetails = async (req, res, next) => {
  // console.log("get template hit........");
  try {
    console.log("get template hit........");
    var postdata = req.body;
    //Get Collection
    let collection = await db.collection("AGROPHARM_XMIM_MONGO");
    //Get Template Data
    let results = await collection.findOne({ TableName: postdata.tablename });

    //Send the result response
    res.send(results);
  } catch (error) {
    next(error);
  }
};

/*
 * GET Template Table Column Details.
 */
// export const GettemplateDetails = async (req, res, next) => {
//   try {
//     var postdata = req.body;
//     //Get Collection
//     let collection = await db.collection(postdata.tablename);
//     //Get Template Data
//     let results = await collection.find({}).toArray();
//     //Send the result response
//     res.send(results);
//   } catch (error) {
//     next(error);
//   }
// };


/*
 * GET Template Table Column Details. mongo 
 */

export const GettemplateDetails = async (req, res, next) => {
  try {
    var postdata = req.body;
    //Get Collection
    let collection = await db.collection(postdata.tablename);
    //Get Template Data
    let results = await collection.findOne({});
    let fields = Object.keys(results);
    //Send the result response
    res.send(fields);
  } catch (error) {
    next(error);
  }
};





/*
 * GET ALL Template Table Details.
 */
export const GetTableDetails = async (req, res, next) => {
  try {
    //Get Collection
    let collection = await db.collection("SERVER_UPLOAD_TABLES");
    //Get Template Data
    //let results = await collection.find({}).sort("PriorityNo", 1).toArray();

    let results = await collection.aggregate([
      {$match:{}},
      {$sort:{"PriorityNo":1}},
      { $project:{
        TableID : 1,
        TableName : 1,
        PriorityNo : 1,
        IsMultipleTable : 1,
        Tabledetails : 1,
        CommonColumns : 1,
        IsDeleted : 1,
        TemplateName : 1,
        Stored_Procedure:1,
        orderby_details : 1,
        Default_Grid_RowsCount : 1,
        Default_DownloadRec_Limit : 1,
        is_mongo:{$literal:true}
      }}
    ]).toArray();

    //Send the result response
    res.send(results);
  } catch (error) {
    next(error);
  }
};

/*
 * Empty the Table data for given Table
 */
export const EmptyTableData = async (req, res, next) => {
  try {
    var postdata = req.body;
    //let collection = await db.collection(postdata.tablename);
    //await collection.deleteMany({});
    res.send(`${postdata.tablename} - All data deleted successfully!`);
  } catch (error) {
    next(error);
  }
};

/*
 * UPDATE Template Table Details.
 */
export const UpdateTemplateTableDetails = async (req, res, next) => {
  try {
    var postdata = req.body;
    let collection = await db.collection("SERVER_UPLOAD_TABLES");
    let results = await collection.updateOne(
      { "TableName" : postdata.tablename },
      { $set: { "Default_Grid_RowsCount": Number(postdata.Default_Grid_RowsCount),"Default_DownloadRec_Limit": Number(postdata.Default_DownloadRec_Limit) } }
    );
    res.send(results);
  } catch (error) {
    next(error);
  }
};
