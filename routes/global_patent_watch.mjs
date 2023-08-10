import { Collection, Db } from "mongodb";
import db from "../app/config/db/mongodbconnection.mjs";
import { AddUserActionHistory } from "./user_action_history.mjs";

const collectionname = "GLOBAL_PATENT_WATCH";
const template_name = "TEMPLATE_GLOBAL_PATENT_WATCH";
const template_user_setting = "TEMPLATE_USER_SETTINGS";
//MANAGE GLOBAL PATENT WATCH
export const global_patent_watch_manage = async (req, res, next) => {
  try {
    var postdata = req.body;
    let mode = postdata.mode;
    let search_keyword = postdata.search_keyword;
    let filtercondition = postdata.filtercondition;
    let rowscount = postdata.rowscount;
    let pagenumber = postdata.pagenumber;
    let startrowno = (pagenumber - 1) * rowscount;
    let sortby = postdata.sortby;
    let additional_param = postdata.additional_param;
    let userid = postdata.userid;
    let export_cols=postdata.export_cols;

    let user_search_app_datalog = {
      userid: userid,
      app_name_privilege: "global-patent-watch",
      application_type: "search",
      application_name: "Global Agro Discovery Patent Watch",
      application_function: "global_patentwatchDataSearch",
      application_url: "https://patentwatch.chemrobotics.com/",
      application_query: postdata.application_query,
      search_filters: postdata.search_filters,
      user_ip: postdata.user_ip,
      status: 1,
      address: postdata.address,
    };

    let results = [];
    //Get Collection
    let collection = await db.collection(collectionname);

    //Auto_Suggestion_Search ( default 100 result came)
    switch (mode) {
      case "GET_AUTO_SUGGEST":
        results = await GetAutoSuggest(collection, search_keyword);
        break;
      case "GET_PRODUCTS":
        results = await GetProducts(collection, search_keyword);
        break;
      case "GET_PATENTS":
        results = await GetCommonPatents(db);
        break;
      case "GET_DATA":
        //Add User Search Log and return Data
        results = await GetData(
          db,
          filtercondition,
          sortby,
          rowscount,
          startrowno
        );

        await AddUserActionHistory(req, user_search_app_datalog).then(
          function (result) {
            //console.log("action logged");
          },
          function (err) {
            throw err;
          }
        );
        break;
      case "SAVE_COLUMNS_CONFIG":
        results = await SaveColumnConfig(db, postdata.cols_data, userid);
        break;
      case "GET_COLUMNS_CONFIG":
        results = await GetColumnConfig(db, userid);
        break;
      case "EXPORT_DATA":
        user_search_app_datalog.application_query="download";
        //Add User Search Log and return Data
        results = await ExportData(
          db,
          filtercondition,
          sortby,
          rowscount,
          startrowno,
          export_cols
        );

        await AddUserActionHistory(req, user_search_app_datalog).then(
          function (result) {
            //console.log("action logged");
          },
          function (err) {
            throw err;
          }
        );
        break;
      default:
        break;
    }

    //Send the result response
    res.send(results);
  } catch (error) {
    next(error);
  }
};

//Helper Methods
/**
 * Method to get all auto suggest records
 * @param {Collection<Document>} collection
 * @param { string } search_keyword
 * @returns array of documents
 */
let GetAutoSuggest = async (collection, search_keyword) => {
  let collectionname = collection.dbName;
  return await collection
    .aggregate([
      //product column search
      {
        $match: {
          product: { $regex: new RegExp(`${search_keyword}`, "i") },
        },
      },
      {
        $addFields: {
          search_value: {
            $regexFind: {
              input: "$product",
              regex: new RegExp(`${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`),
              options: "i",
            },
          },
        },
      },
      { $group: { _id: "$search_value.match" } },
      {
        $project: {
          _id: 0,
          search_value: "$_id",
          columnname: { $literal: "PRODUCT" },
          label: { $literal: "Product" },
        },
      },
      // Publication Number
      {
        $unionWith: {
          coll: collectionname,
          pipeline: [
            {
              $match: {
                publication_number: {
                  $regex: new RegExp(`${search_keyword}`, "i"),
                },
              },
            },
            {
              $addFields: {
                search_value: {
                  $regexFind: {
                    input: "$publication_number",
                    regex: new RegExp(
                      `${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`
                    ),
                    options: "i",
                  },
                },
              },
            },
            { $group: { _id: "$search_value.match" } },
            {
              $project: {
                _id: 0,
                search_value: "$_id",
                columnname: { $literal: "publication_number" },
                label: { $literal: "Publication Number" },
              },
            },
            { $limit: 10 },
          ],
        },
      },
      // Title
      {
        $unionWith: {
          coll: collectionname,
          pipeline: [
            {
              $match: {
                title: {
                  $regex: new RegExp(`${search_keyword}`, "i"),
                },
              },
            },
            {
              $addFields: {
                search_value: {
                  $regexFind: {
                    input: "$title",
                    regex: new RegExp(
                      `${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`
                    ),
                    options: "i",
                  },
                },
              },
            },
            { $group: { _id: "$search_value.match" } },
            {
              $project: {
                _id: 0,
                search_value: "$_id",
                columnname: { $literal: "title" },
                label: { $literal: "Title" },
              },
            },
            { $limit: 10 },
          ],
        },
      },
      // Applicants
      {
        $unionWith: {
          coll: collectionname,
          pipeline: [
            {
              $match: {
                applicants: {
                  $regex: new RegExp(`${search_keyword}`, "i"),
                },
              },
            },
            {
              $addFields: {
                search_value: {
                  $regexFind: {
                    input: "$applicants",
                    regex: new RegExp(
                      `${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`
                    ),
                    options: "i",
                  },
                },
              },
            },
            { $group: { _id: "$search_value.match" } },
            {
              $project: {
                _id: 0,
                search_value: "$_id",
                columnname: { $literal: "applicants" },
                label: { $literal: "Applicants" },
              },
            },
            { $limit: 10 },
          ],
        },
      },
      // Abstract
      {
        $unionWith: {
          coll: collectionname,
          pipeline: [
            {
              $match: {
                abstract: {
                  $regex: new RegExp(`${search_keyword}`, "i"),
                },
              },
            },
            {
              $addFields: {
                search_value: {
                  $regexFind: {
                    input: "$abstract",
                    regex: new RegExp(
                      `${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`
                    ),
                    options: "i",
                  },
                },
              },
            },
            { $group: { _id: "$search_value.match" } },
            {
              $project: {
                _id: 0,
                search_value: "$_id",
                columnname: { $literal: "abstract" },
                label: { $literal: "Abstract" },
              },
            },
            { $limit: 10 },
          ],
        },
      },
      // Inventors
      {
        $unionWith: {
          coll: collectionname,
          pipeline: [
            {
              $match: {
                inventors: {
                  $regex: new RegExp(`${search_keyword}`, "i"),
                },
              },
            },
            {
              $addFields: {
                search_value: {
                  $regexFind: {
                    input: "$inventors",
                    regex: new RegExp(
                      `${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`
                    ),
                    options: "i",
                  },
                },
              },
            },
            { $group: { _id: "$search_value.match" } },
            {
              $project: {
                _id: 0,
                search_value: "$_id",
                columnname: { $literal: "inventors" },
                label: { $literal: "Inventors" },
              },
            },
            { $limit: 10 },
          ],
        },
      },
      // Claims
      {
        $unionWith: {
          coll: collectionname,
          pipeline: [
            {
              $match: {
                claims: {
                  $regex: new RegExp(`${search_keyword}`, "i"),
                },
              },
            },
            {
              $addFields: {
                search_value: {
                  $regexFind: {
                    input: "$claims",
                    regex: new RegExp(
                      `${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`
                    ),
                    options: "i",
                  },
                },
              },
            },
            { $group: { _id: "$search_value.match" } },
            {
              $project: {
                _id: 0,
                search_value: "$_id",
                columnname: { $literal: "claims" },
                label: { $literal: "Claims" },
              },
            },
            { $limit: 10 },
          ],
        },
      },
      { $limit: 100 },
    ])
    .toArray();
};

/**
 * Method to get all auto suggest records
 * @param {Collection<Document>} collection
 * @param { string } search_keyword
 * @returns array of documents
 */
let GetProducts = async (collection, search_keyword) => {
  return await collection
    .aggregate([
      //product column search
      {
        $match: {
          product: { $regex: new RegExp(`${search_keyword}`, "i") },
        },
      },
      {
        $addFields: {
          search_value: {
            $regexFind: {
              input: "$product",
              regex: new RegExp(`${search_keyword}[a-z]*(?=;|\s|\n|\r\n|)`),
              options: "i",
            },
          },
        },
      },
      { $group: { _id: "$search_value.match" } },
      {
        $project: {
          _id: 0,
          product_name: "$_id",
        },
      },
    ])
    .toArray();
};
/**
 * Method to get all common patent type
 * @param {Db} db
 * @returns
 */
let GetCommonPatents = async (db) => {
  return await db
    .collection("COMMON_PATENT_TYPES")
    .aggregate([
      { $group: { _id: "$patent_type" } },
      {
        $project: {
          _id: 0,
          patent_type: "$_id",
        },
      },
      { $sort: { patent_type: 1 } },
    ])
    .toArray();
};

/**
 *
 * @param {Db} db
 * @param {any} filtercondition
 * @param {any} sortby
 * @param {number} rowscount
 * @param {number} startrowno
 * @returns
 */
let GetData = async (db, filtercondition, sortby, rowscount, startrowno) => {
  let result = [];
  let collection = await db.collection("GLOBAL_PATENT_WATCH");
  //#region  Match Stage
  let match_stage = {
    $or: [{ $and: [] }],
    // if any not condition
    $and: [],
  };
  //AND CONDITIONS
  filtercondition.and_condition.forEach((x) => {
    let and_condition = {};
    if (x.condition_type == "contains") {
      and_condition[x.field] = { $regex: new RegExp(`${x.search_key}`, "i") };
    } else {
      and_condition[x.field] = x.search_key;
    }
    match_stage.$or[0].$and.push(and_condition);
  });
  //OR CONDITIONS
  filtercondition.or_condition.forEach((x) => {
    let or_condition = {};
    if (x.condition_type == "contains") {
      or_condition[x.field] = { $regex: new RegExp(`${x.search_key}`, "i") };
    } else {
      or_condition[x.field] = x.search_key;
    }
    match_stage.$or.push(or_condition);
  });
  //NOT CONDITIONS
  filtercondition.not_condition.forEach((x) => {
    let not_condition = {};
    if (x.condition_type == "contains") {
      not_condition[x.field] = {
        $regex: new RegExp(`^((?!${x.search_key}).)*$`, "i"),
      };
    } else {
      not_condition[x.field] = { $ne: x.search_key };
    }
    match_stage.$and.push(not_condition);
  });
  //Delete Property if no condition exists
  if (match_stage.$or[0].$and.length == 0) {
    delete match_stage.$or[0].$and;
    match_stage.$or = match_stage.$or.filter(
      (obj) => Object.keys(obj).length !== 0
    );
  }
  if (match_stage.$or.length == 0) {
    delete match_stage.$or;
  }
  if (match_stage.$and.length == 0) {
    delete match_stage.$and;
  }
  //#endregion
  let sort_stage = sortby;
  let skip_stage = startrowno;
  let limit_stage = rowscount;
  let project_stage = {
    _id: 0,
    S_NO: { $toInt: { $add: ["$index_of_document", 1] } },
  };

  //GET TOTAL COUNT
    let total_record_count_data = await collection.countDocuments(match_stage);
    result.push([{ TotalRecordsCount: total_record_count_data }]);

  //#region GET DATA
  //generate dynamic project stage
  let dbcolumns = await db
    .collection("TEMPLATE_GLOBAL_PATENT_WATCH")
    .aggregate([
      //MATCH STAGE
      { $match: { Is_display: 1 } },
      //SORT STAGE
      { $sort: { display_order: 1 } },
      //PROJECT STAGE
      {
        $project: {
          _id: 0,
          TableColumnName: 1,
        },
      },
    ])
    .toArray();
  dbcolumns.forEach((col) => {
    project_stage[col.TableColumnName] = `$documents.${col.TableColumnName}`;
  });
  let data = await collection
    .aggregate([
      //MATCH STAGE
      {
        $match: match_stage,
      },
      // SORT STAGE
      { $sort: sort_stage },
      // SKIP STAGE
      { $skip: skip_stage },
      // LIMIT STAGE
      { $limit: limit_stage },
      // GROUP STAGE
      {
        $group: {
          _id: null,
          documents: { $push: "$$ROOT" },
        },
      },
      //UNWIND STAGE
      {
        $unwind: {
          path: "$documents",
          includeArrayIndex: "index_of_document",
        },
      },
      //PROJECT STAGE
      {
        $project: project_stage,
      },
    ])
    .toArray();

  result.push(data);
  //#endregion

  return result;
};

/**
 *
 * @param {Db} db
 * @param {any} cols_data
 * @param {any} userid
 * @returns
 */
let SaveColumnConfig = async (db, cols_data, userid) => {
  let collection = await db.collection("TEMPLATE_USER_SETTINGS");
  //DELETE OLD DATA
  await collection.deleteMany({
    tus_tablename: template_name,
    tus_userid: userid,
  });

  //ADD UPDATED DATA
  let sanatizedColData = cols_data.map((x) => {
    return {
      tus_userid: userid,
      tus_tablename: template_name,
      tusTableColumnName: x.field,
      tusExcelColumnName: x.header,
      tusIs_display: x.Is_display,
      tusdisplay_order: x.display_order,
      tusui_width: x.column_width,
      tusfield_data_type: x.field_data_type,
      tusfield_format: x.field_format,
      tus_created_date: new Date(),
    };
  });
  await collection.insertMany(sanatizedColData);

  return "Field(s) configuration Saved!";
};

/**
 *
 * @param {Db} db
 * @param {any} userid
 * @returns
 */
let GetColumnConfig = async (db, userid) => {
  let collection_template_usersetting = await db.collection(
    template_user_setting
  );
  let collection_template = await db.collection(template_name);
  //COLUMN DETAILS
  //USER SAVED COUNT , -1 for S.NO added Additinally
  let currenrcnt =
    (await collection_template_usersetting.countDocuments({
      tus_userid: userid,
      tus_tablename: template_user_setting,
    })) - 1;
  //ACTUAL COUNT
  let actualcnt = await collection_template.estimatedDocumentCount();

  //IF COLUMN COUNT MISMATCH DELETE OLD DATA
  let existColConfigCount =
    await collection_template_usersetting.countDocuments({
      tus_userid: userid,
      tus_tablename: template_user_setting,
    });
  if (existColConfigCount > 0 && actualcnt > currenrcnt) {
    //DELETE OLD DATA
    await collection_template_usersetting.deleteMany({
      tus_tablename: template_name,
      tus_userid: userid,
    });

    //Add New user Setting default
    await collection_template_usersetting.insertMany([
      {
        tus_userid: userid,
        tus_tablename: template_name,
        tusTableColumnName: "S_NO",
        tusExcelColumnName: "S.NO",
        tusIs_display: 1,
        tusdisplay_order: 0,
        tusui_width: "100px",
        tusfield_data_type: "text",
        tusfield_format: "",
        tus_created_date: new Date(),
      },
    ]);
    await collection_template.aggregate([
      { $match: { Is_display: 1 } },
      {
        $project: {
          _id: 0,
          tus_userid: userid,
          tus_tablename: template_name,
          tusTableColumnName: "$TableColumnName",
          tusExcelColumnName: "$DisplayColumnName",
          tusIs_display: "$Is_display",
          tusdisplay_order: "$display_order",
          tusui_width: "$ui_width",
          tusfield_data_type: "$field_data_type",
          tusfield_format: "$field_format",
          tus_created_date: new Date(),
        },
      },
      { $merge: `$${collection_template_usersetting}` },
    ]);
  } else {
    //Update field(s)
    await collection_template_usersetting.aggregate([
      {
        $lookup: {
          from: "TEMPLATE_GLOBAL_PATENT_WATCH",
          localField: "tusTableColumnName",
          foreignField: "TableColumnName",
          as: "UserTemplateData",
        },
      },
      {
        $set: {
          tusExcelColumnName: {
            $cond: [
              {
                $ne: [
                  { $arrayElemAt: ["$UserTemplateData.DisplayColumnName", 0] },
                  undefined,
                ],
              },
              { $arrayElemAt: ["$UserTemplateData.DisplayColumnName", 0] },
              "$tusExcelColumnName",
            ],
          },
          tusfield_data_type: {
            $cond: [
              {
                $ne: [
                  { $arrayElemAt: ["$UserTemplateData.field_data_type", 0] },
                  undefined,
                ],
              },
              { $arrayElemAt: ["$UserTemplateData.field_data_type", 0] },
              "$tusfield_data_type",
            ],
          },
          tusfield_format: {
            $cond: [
              {
                $ne: [
                  { $arrayElemAt: ["$UserTemplateData.field_format", 0] },
                  undefined,
                ],
              },
              { $arrayElemAt: ["$UserTemplateData.field_format", 0] },
              "$tusfield_format",
            ],
          },
        },
      },
      {
        $unset: "UserTemplateData",
      },
      {
        $merge: {
          into: "TEMPLATE_USER_SETTINGS",
          on: ["tus_userid", "tus_tablename", "tusTableColumnName"],
          whenMatched: "replace",
        },
      },
    ]);
  }

  return await collection_template_usersetting
    .aggregate([
      {
        $match: { tus_tablename: template_name, tus_userid: userid },
      },
      {
        $sort: {
          tusdisplay_order: 1,
        },
      },
      {
        $project: {
          _id: 0,
          field: "$tusTableColumnName",
          header: "$tusExcelColumnName",
          column_width: {
            $replaceOne: { input: "$tusui_width", find: "px", replacement: "" },
          },
          field_data_type: "$tusfield_data_type",
          field_format: "$tusfield_format",
          display_order: "$tusdisplay_order",
          Is_display: "$tusIs_display",
        },
      },
    ])
    .toArray();
};

/**
 *
 * @param {Db} db
 * @param {any} filtercondition
 * @param {any} sortby
 * @param {number} rowscount
 * @param {number} startrowno
 * @param {number} filtercolumns
 * @returns
 */
let ExportData = async (db, filtercondition, sortby, rowscount, startrowno,export_cols) => {
  let result = [];
  let collection = await db.collection("GLOBAL_PATENT_WATCH");
  //#region  Match Stage
  let match_stage = {
    $or: [{ $and: [] }],
    // if any not condition
    $and: [],
  };
  //AND CONDITIONS
  filtercondition.and_condition.forEach((x) => {
    let and_condition = {};
    if (x.condition_type == "contains") {
      and_condition[x.field] = { $regex: new RegExp(`${x.search_key}`, "i") };
    } else {
      and_condition[x.field] = x.search_key;
    }
    match_stage.$or[0].$and.push(and_condition);
  });
  //OR CONDITIONS
  filtercondition.or_condition.forEach((x) => {
    let or_condition = {};
    if (x.condition_type == "contains") {
      or_condition[x.field] = { $regex: new RegExp(`${x.search_key}`, "i") };
    } else {
      or_condition[x.field] = x.search_key;
    }
    match_stage.$or.push(or_condition);
  });
  //NOT CONDITIONS
  filtercondition.not_condition.forEach((x) => {
    let not_condition = {};
    if (x.condition_type == "contains") {
      not_condition[x.field] = {
        $regex: new RegExp(`^((?!${x.search_key}).)*$`, "i"),
      };
    } else {
      not_condition[x.field] = { $ne: x.search_key };
    }
    match_stage.$and.push(not_condition);
  });
  //Delete Property if no condition exists
  if (match_stage.$or[0].$and.length == 0) {
    delete match_stage.$or[0].$and;
    match_stage.$or = match_stage.$or.filter(
      (obj) => Object.keys(obj).length !== 0
    );
  }
  if (match_stage.$or.length == 0) {
    delete match_stage.$or;
  }
  if (match_stage.$and.length == 0) {
    delete match_stage.$and;
  }
  //#endregion
  let sort_stage = sortby;
  let skip_stage = startrowno;
  let limit_stage = rowscount;
  let project_stage = {
    _id: 0,
    S_NO: { $toInt: { $add: ["$index_of_document", 1] } },
  };
  project_stage={...project_stage,...export_cols};

  //#region GET DATA
  
  result = await collection
    .aggregate([
      //MATCH STAGE
      {
        $match: match_stage,
      },
      // SORT STAGE
      { $sort: sort_stage },
      // SKIP STAGE
      { $skip: skip_stage },
      // LIMIT STAGE
      { $limit: limit_stage },
      // GROUP STAGE
      {
        $group: {
          _id: null,
          documents: { $push: "$$ROOT" },
        },
      },
      //UNWIND STAGE
      {
        $unwind: {
          path: "$documents",
          includeArrayIndex: "index_of_document",
        },
      },
      //PROJECT STAGE
      {
        $project: project_stage,
      },
    ])
    .toArray();

  //#endregion

  return result;
};