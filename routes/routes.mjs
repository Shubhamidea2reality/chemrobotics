//--Test route
export * as testroute from "./test.mjs";

//#region //-------------- ADMIN PANEL API ROUTE -------//
//File Upload - images,documents
export * as uploadfileroute from "./uplaodfile.mjs";
//--Template route
export * as templateroute from "./template.mjs";
//--Mongo DB Template route
export * as mongodb_templateroute from "./template/template_mongo.mjs";
//--Uploadbul route
export * as uploadbulkroute from "./uploadbulk.mjs";
//--Upload bulk mongo
export * as uploadmongoroute from "./uploadmongo.mjs";
//--role access route
export * as role_accessroute from "./role_access.mjs";
//-- Dynamic Table Management route
export * as dyn_table_manageroute from "./dyn_table_manage.mjs";
//-- Invoice Management route
export * as invoice_manageroute from "./invoice_manage.mjs";
//-- Invoice Management route
export * as technicalroute_process_gbrn_countroute from "./technicalroute_process_gbrn_count.mjs";
//-- Common Config
export * as common_configroute from "./common_config.mjs";
//-------------- END OF ADMIN PANEL API ROUTE ---//
//#endregion

//#region -------------- CHEMROBOTICS API ROUTE -------//
//--common data search route
export * as dataserachroute from "./datasearch.mjs";
//--agropharm_xim route
export * as agropharm_xim_route from "./agropharma_xim.mjs";
//--Company Directory
export * as company_directory_route from "./company_directory.mjs";
//--Vendor Registration data route
export * as vendorroute from "./vendor_reg.mjs";
//--agro jarvis
export * as agro_jarvis_route from "./agro_jarvis.mjs";
//--pharma jarvis
export * as pharma_jarvis_route from "./pharma_jarvis.mjs";
//--spc
export * as spc_database_route from "./spc_database.mjs";
//--indian pesticide database
export * as ipd_database_route from "./indian_pesticide_database.mjs";
//--technical supplier
export * as technical_supplier_route from "./technical_supplier.mjs";
//--global patent watch
export * as global_patent_watch_route from "./global_patent_watch.mjs";
//#endregion -------------- END CHEMROBOTICS API ROUTE ---//

//#region -------------- COMMON HELPER API ROUTE -------//
//--email route
export * as email_accessroute from "./email.mjs";
//--Image Base64
export * as imageftp_route from "./imageftp.mjs";

//#endregion -------------- END COMMON HELPER API ROUTE ---//