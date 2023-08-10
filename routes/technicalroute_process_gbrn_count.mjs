import * as jobs from "../jobs/common_jobs.mjs";
export const technicalroute_process_gbrn_count = (req, res, next) => {
  jobs.TechnicalRouteGbrnCountExtratJob(req);
  res.status(200).json("Technical Route Gbrn Count Extrat Job Started");
};