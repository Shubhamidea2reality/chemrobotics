//GET CLIENT MASTER FORM DETAILS
export const getFormFields_vendor = (req, res, next) => {
  let postdata = { mode: "GET_FIELD_DETAILS", table_id: 3 };
  req.getConnection(function (err, connection) {
    if (err) {
      return res.status(500).json({ message: err.toString() });
    }
    connection.query(
      `CALL dbp_dyn_master_manage('${JSON.stringify(postdata)}');`,
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

//GET DYNAMIC MASTER DETAILS - VENDOR ONLY
export const Manage_VendorData = (req, res, next) => {
  let postdata = {
    mode: req.body.mode,
    userid: 1,
    role_id: 1,
    table_id: 3,
    form_action: "ADD",
    form_data: req.body.form_data,
    approveid: 0,
  };
  req.getConnection(function (err, connection) {
    if (err) {
      return res.status(500).json({ message: err.toString() });
    }
    connection.query(
      `CALL dbp_dyn_master_manage('${JSON.stringify(postdata)}');`,
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
