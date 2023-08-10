import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import multipart from "connect-multiparty";
const multipartMiddleware = multipart({ uploadDir: "./uploadfiles" });
import dotenv from "dotenv";
dotenv.config();
import CryptoJS from "crypto-js";

const __dirname = path.resolve();
import {
  signIn,
  verify,
  refresh,
  welcome,
  auto_login,
  user_login,
  usermaster_manage,
} from "./app/config/auth.mjs";

//mongoConection 
//import connectDB from "./app/config/mongo.mjs/monoconnection.mjs";
//connectDB();

//For DB Connection
import mysql from "mysql";
import myconnection from "express-myconnection";
var dbOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());
app.use(myconnection(mysql, dbOptions, "pool"));
app.use(express.static(__dirname));
app.use(express.static(__dirname + "/empdocs"));
app.use(function (req, res, next) {
  //console.log("Middleware");
  //Decrypt the Request Body before processing
  let appname = req.get("appname");
  //console.log(`Application name : ${appname}`);

  //console.log(req.url);
  //console.log(req.body);
  //&& req.url.includes('uploadfiles')==false
  if (appname == "adminpanel" && req.url.includes("uploadfiles") == false) {
    let requestbody = req.body;
    if (
      requestbody != null &&
      requestbody != undefined &&
      requestbody != "" &&
      Object.keys(requestbody).length > 0
    ) {
      let bytes = CryptoJS.AES.decrypt(
        requestbody.data,
        process.env.ENCRYPTION_SECRECT_KEY
      );
      //console.log(bytes.toString());
      if (bytes.toString()) {
        req.body = JSON.parse(bytes.toString(CryptoJS.enc.Utf8).trim());
      }
    }
    //console.log(req.body);
  }

  res.setHeader("Content-Type", "application/json");
  next();
});
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = [
    "https://www.chemrobotics.com",
    "https://www.chemroboticspharma.com",
    "https://chemrobotics.net",
    "http://localhost:4200",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-Type", "application/json");

  // Pass to next layer of middleware
  next();
});


//All API Routes
import {
  testroute,
  uploadfileroute,
  templateroute,
  mongodb_templateroute,
  uploadbulkroute,
  uploadmongoroute,
  role_accessroute,
  dyn_table_manageroute,
  invoice_manageroute,
  technicalroute_process_gbrn_countroute,
  common_configroute,
  dataserachroute,
  agropharm_xim_route,
  company_directory_route,
  vendorroute,
  agro_jarvis_route,
  pharma_jarvis_route,
  spc_database_route,
  ipd_database_route,
  technical_supplier_route,
  global_patent_watch_route,
  email_accessroute,
  imageftp_route
} from "./routes/routes.mjs";

// import connectDB from "./app/config/mongo.mjs/monoconnection.mjs";
// connectDB();

//mongoDB connection
import connectToMongoDB from './app/config/db/mongoDbconn.mjs';

connectToMongoDB();

// async function fetchDataFromCollection() {
//   try {
//     const db = await connectToMongoDB();
//     const collection = db.collection('COMMON_PATENT_TYPES'); // Replace with the name of your collection
//     const result = await collection.find({}).toArray();
//     console.log(result);
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle errors as needed
//   }
// }

// fetchDataFromCollection();
// import { getData } from './app/config/db/mongoDbconn.mjs';

// async function main() {
//   try {
//     // Call the getData() function to fetch data from MongoDB
//     const data = await getData();
//     // Do something with the retrieved data (e.g., process it, render it, etc.)
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//     // Handle errors as needed
//   }
// }

// // Call the main function to execute your application logic
// main();


app.get("/", function (req, res) {
  res.send("Chemrobo API");
});
app.post("/signin", signIn);
app.post("/auto_login", auto_login);
app.post("/user_login", user_login);
app.get("/welcome", verify, welcome);
app.post("/refresh-token", refresh);
app.post("/usermaster_manage", verify, usermaster_manage);

////// ------- COMMON ------ ///////
//Send Mail
app.post("/sendmail", verify, email_accessroute.sendMail);
app.post("/sendmail_vendor", email_accessroute.sendMail_VendorRegInfo);

//Upload File
app.post(
  "/uploadfile",
  [verify, multipartMiddleware],
  uploadfileroute.UploadFile
);

app.post(
  "/uploadfile_vendor",
  [multipartMiddleware],
  uploadfileroute.UploadFile_Vendorpublic
);
app.post(
  "/uploadfiles",
  [verify, multipartMiddleware],
  uploadfileroute.UploadFiles
);

//Image Base64
app.post("/get_imagebase64", verify, imageftp_route.GetBase64Image);
//////----- END COMMON ------ ////////

///// ------ CHEMROBOTIS DATABSES APPS -----/////


// MyGet Common Data
app.post("/get_chemroboticsdata",  dataserachroute.GetChemroboticsData);

// Get Common Data
app.post("/get_chemroboticsdata", verify, dataserachroute.GetChemroboticsData);

// my agropharm_xim_route test
app.post(
  "/get_agropharm_xim_chartdata",
  
  agropharm_xim_route.GetChartData
);


//agropharm_xim
app.post(
  "/get_agropharm_xim_chartdata",
  verify,
  agropharm_xim_route.GetChartData
);

//Company Directory
app.post(
  "/company_directory",
  verify,
  company_directory_route.company_directory_manage
);

//Agro Jarvis
app.post("/agro_jarvis", verify, agro_jarvis_route.agro_jarvis_manage);

//Pharma Jarvis
app.post("/pharma_jarvis", verify, pharma_jarvis_route.pharma_jarvis_manage);

//SPC DATABASE
app.post("/spc_database", verify, spc_database_route.spc_database_manage);

//INDIAN_PESTICIDE_DATABASE
app.post(
  "/indian_pesticide_database",
  verify,
  ipd_database_route.indian_pesticide_database_manage
);

//technical_supplier Combination
app.post(
  "/technical_supplier",
  verify,
  technical_supplier_route.technical_supplier_manage
);

// Global Patent Watch
app.post(
  "/global_patent_watch",
  verify,
  global_patent_watch_route.global_patent_watch_manage
);


/// ------ END CHEMROBOTIS DATABSES APPS -----/////

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





//Get Data From db
app.get("/getdata", verify, testroute.getdata);

//Get Template Table Details
app.post("/get_tables", verify, templateroute.GetTableDetails);

//Get Template Table Details
app.post("/get_tables_mongo", verify, mongodb_templateroute.GetTableDetails);

//Update Template Specific Table Details
app.post("/update_tables", verify, templateroute.UpdateTemplateTableDetails);

//Update Template Specific Table Details - mongo
app.post("/update_tables_mongo", verify, mongodb_templateroute.UpdateTemplateTableDetails);

//Get Template Specific Table Details
app.post("/get_tabledtls", verify, templateroute.GetTemplateTableDetails);

//Get Template Specific Table Details - Mongo
app.post("/get_tabledtls_mongo", verify, mongodb_templateroute.GetTemplateTableDetails);

//Get Template Column Details
app.post("/get_template", verify, templateroute.GettemplateDetails);

//Get Template Column Details - mongo
app.post("/get_template_mongo", verify, mongodb_templateroute.GettemplateDetails);

//Empty the Table data
app.post("/table_empty", verify, templateroute.EmptyTableData);

//Empty the Table data - mongo
app.post("/table_empty_mongo", verify, mongodb_templateroute.EmptyTableData);

//Run the fileupload procedure
app.post(
  "/run_fileupload_procedure",
  verify,
  templateroute.RunFileUploadProcedure
);

//Upload Bulk data
app.post("/fileupload", verify, uploadbulkroute.Fileupload);

//Upload data - Mongo
app.post("/fileupload_mongo", verify, uploadmongoroute.Fileupload);

//Get Dropdown Values
app.post("/get_dropdownvalues", verify, dataserachroute.GetDropDownValues);

//Get Dynamic Master Data
app.post("/dyn_master", verify, dataserachroute.dynMaster);

//Get Page Maintanace Data
app.post("/getpagemaintain", verify, dataserachroute.GetPagemaintain);

//Get Dynamic Master Data -- Employee doc manage
app.post("/dynemp_doc_manage", verify, dataserachroute.dynEmpDocMaster);

//manage role access
app.post("/role_access", verify, role_accessroute.role_access);

//vendor get details
app.get("/get_vendorformfields", vendorroute.getFormFields_vendor);
app.post("/manage_vendordetails", vendorroute.Manage_VendorData);

//Dynamic Table Management
app.post("/dyn_table_manage", verify, dyn_table_manageroute.dyn_table_manage);
app.post(
  "/dyn_table_manage_public",
  dyn_table_manageroute.dyn_table_manage_public
);

//Database Column Manage
app.post("/managetemplatecolumn", verify, dataserachroute.ManageTemplateColumn);

//Invoice Manage
app.post("/invoice_manage", verify, invoice_manageroute.invoice_manage);

//Technical Route GBRN Count Statistics
app.post(
  "/technicalroute_process_gbrn_count",
  verify,
  technicalroute_process_gbrn_countroute.technicalroute_process_gbrn_count
);

//Common Config
app.post("/common_config", verify, common_configroute.dbp_master_configs);



// Global Error Handling
app.use((err, _req, res, next) => {
  console.log(err);
  res.status(500).send("An unexpected error occured.");
});


var server = app.listen(5000);

console.log("api.checmrobotic.com nodejs server started!");
