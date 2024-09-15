import Field_reports from '../models/rtc_field_weekly_reports'

class FieldReportController {
  static async getFieldReport(req, res) {
    try {
      const fieldWeeklyReport = await Field_reports.findAll();
      if (!fieldWeeklyReport) {
        return res.status(404).json({
          status: "fail",
          message: "There is no information about weekly report",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Weekly field report retrieved successfully !!!",
        data: fieldWeeklyReport,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
export default FieldReportController;
