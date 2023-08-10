import db from "../app/config/db/mongodbconnection.mjs";

/*
 * Uplaod data to mongo tables.
 */
export const Fileupload = async (req, res) => {
  try {
    var postdata = req.body;
    var tablename = postdata.tablename;
    var uploaddata = postdata.uploaddata;
    var isTruncateTable = postdata.is_truncatetable ?? false;

    let collection = await db.collection(tablename);
    if (isTruncateTable) {
      await collection.deleteMany({});
    }
    let results = await collection.insertMany(uploaddata);
    res.send(results);
  } catch (error) {
    next(error);
  }
};
