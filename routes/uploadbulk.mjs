/*
 * Uplaod data to basic_product_details.
 */
export const Fileupload = (req, res) => {
  //var postdata=JSON.parse(JSON.stringify(req.body));
  var postdata = req.body;
  var tablename = postdata.tablename;
  var insertcols = postdata.insertcols;
  var uploaddata = postdata.uploaddata;
  var isTruncateTable = postdata.is_truncatetable ?? false;
  let truncateScript = "";
  if (isTruncateTable == true) {
    truncateScript = " TRUNCATE TABLE " + tablename + "; ";
  }

  //console.log(postdata);

  req.getConnection(function (err, connection) {
    //var sql="INSERT INTO basic_product_details_test (`GBRN`,`ACTIVE_INGREDIENT`,`CHEMICAL_STRUCTURE`,`API_AGROCHEMICAL`,`IUPAC`,`CAS_RN`,`CAS_NAME`,`PUBCHEM_ID`,`EC_NO`,`ANATO_THERAP_CHEM_ATC_CLS_CODE`,`UNIQUE_INGRE_IDENTI_UNII`,`CHEMICAL_CLASS`,`NAME_OF_GENERIC_CHEM_CLASS`,`MECHANISM_OF_ACTION_MOA`,`DEVELOPMENT_STAGE`,`SYNONYMSCOMMON_NAME`,`TRADE_NAMEPROPRIETARY_NAME`,`DESCRIPTION`,`YEAR_OF_DISCOVERY`,`LAUNCHING_YEAR`,`CANONICAL_SMILES`,`SMILES_CODE`,`INCHI`,`INCHIKEY`,`SUMMARY_PHYSICOCHEM_PROP_COMP`,`SUMMARY_PHYSICOCHEM_PROP_EXPERI`,`INDICATION`,`USES`,`HIST_DEV_LICN_COMM`,`INVENT_INFO`,`GENERIC_CONSTRAINING_DATE`,`YEAR_WISE_OFF_PATENT_MOLECULES`,`GENERIC_PROP_DEV_CADATE_WDRW`,`EUROPE_SUP_PROT_CERTIFI_SPC`,`OTHER_COUNTRIES_SUP_PROT_CERTIFI_SPC`,`DATA_PROTECTION`,`LITIGATION_OPP_IPR_MH_REEXAM`,`EXCLUSIVITY_NEW_CHEMICAL_ENTITY`,`ORPHAN_DRUG_EXCLUSIVITY_ODE`,`PEDIATRIC_DRUG_EXCLUSIVITY_PDE`,`NCE_MINUS_OR_QIDP_MINUS`,`EUROPE_EXCLUSIVITY`,`CANADA_EXCLUSIVITY`,`OTHER_COUNTRIES_EXCLUSIVITIES`,`INNOVATOR_ORIGINATOR`,`INVENTOR_LOGO`,`COMMENTRY`,`NOTES`,`REMARKS`,`LITERATURE`,`INFORMATION_SOURCES`,`PDF_MULTIPLE_PDF`,`ORANGE_BOOK_PATENTS`,`USDMF_HOLDER`,`EP_DMF_HOLDER`,`OTHER_DMF_HOLDER`,`LINK_1`,`LINK_2`,`LINK_3`,`LINK_4`,`LINK_5`,`LINK_6`) VALUES ?";
    var sql =
      truncateScript +
      "INSERT INTO " +
      tablename +
      " " +
      insertcols +
      " VALUES ? ;";
    var query = connection.query(sql, [uploaddata], function (err, rows) {
      if (err) {
        console.log("Upload failed : %s ", err.sqlMessage);
        res.send({ status: "error", Message: err.sqlMessage });
      } else {
        res.send({ status: "success", Message: "File uploaded successfully" });
      }
    });
  });
};
