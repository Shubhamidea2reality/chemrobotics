//MANAGE DYNAMIC TABLE
export const dyn_table_manage = (req, res, next) => {
    req.getConnection(function (err, connection) {
        if (err) {
          return res.status(500).json({ message: err.toString() });
        }
        connection.query(
          `CALL dbp_dyn_table_manage('${JSON.stringify(req.body)}');`,
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

 //MANAGE DYNAMIC PUBLIC
export const dyn_table_manage_public = (req, res, next) => {
  let postdata={
    mode:"GET_TABLE_DYNDATA",
    table_id: req.body.table_id,
    filter_condition:req.body.filter_condition,
    sortby:req.body.sortby,
    rowscount:req.body.rowscount,
    pagenumber:req.body.pagenumber
  }
  req.getConnection(function (err, connection) {
      if (err) {
        return res.status(500).json({ message: err.toString() });
      }
      connection.query(
        `CALL dbp_dyn_table_manage('${JSON.stringify(postdata)}');`,
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