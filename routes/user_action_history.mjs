export const AddUserActionHistory = async (req, user_search_app_datalog) => {
  return new Promise(function (resolve, reject) {
    req.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(
        `CALL dbp_userprivilege_manage('${JSON.stringify(
          user_search_app_datalog
        )}');`,
        function (err, rows) {
          if (err) {
            reject(err);
          }
          else{
            resolve(rows);
          }
        }
      );
    });
  });
};
