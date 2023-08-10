import CronJob from "cron";

////// ----- TechnicalRouteGbrnCountExtrat ---////

export const TechnicalRouteGbrnCountExtratJob = (req) => {

  //Logic Implementation
  console.log("TechnicalRouteGbrnCountExtrat Job Started");

  req.getConnection(function (err, connection) {
    if (err) {
      return res.status(500).json({ message: err.toString() });
    }
    connection.query(
      `CALL dbp_technicalroutes_gbrnstatus;`,
      function (err, rows) {
        if (err) {
          console.log(err.toString());
          return;
        }
        console.log("TechnicalRouteGbrnCountExtrat Job Stopped");
      }
    );
  });

  // var job = new CronJob(
  //   "0 0 0 1 1 *", //Yearly
  //   function () {
    
  //     // add logic here id schedule job
      
  //   },
  //   null,
  //   false,
  //   null,
  //   this,
  //   false
  // );
  // job.start();
};
////// ----- END OF TechnicalRouteGbrnCountExtrat ---////
