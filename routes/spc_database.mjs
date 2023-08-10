//MANAGE SPC DATABASE
export const spc_database_manage = (req, res, next) => {
    req.getConnection(function (err, connection) {
        if (err) {
          return res.status(500).json({ message: err.toString() });
        }
        connection.query(
          `CALL dbp_spc_database_manage('${JSON.stringify(req.body)}');`,
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