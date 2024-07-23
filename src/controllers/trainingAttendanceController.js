import Training_attendance from "../models/rtc_training_attendance";
import Attandance_sheets from "../models/rtc_attendance_sheets";
const { Op } = require("sequelize");

class TrainingAttendanceController {
  static async getAllTrainingAttendance(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear - 1, 6, 1); // July of last year
      const endDate = new Date(currentYear, 7, 31); // August of this year

      const { count, rows: allAttendance } =
        await Training_attendance.findAndCountAll({
          offset,
          limit,
          where: {
            created_at: {
              [Op.between]: [startDate, endDate],
            },
          },
        });

      if (allAttendance.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No attendance records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Attendance records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          attendance: allAttendance,
        },
      });
    } catch (error) {
      console.error("Error retrieving attendance records:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async getAllTrainingAttendanceSheets(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear - 1, 14, 1); // July of last year
      const endDate = new Date(currentYear, 7, 31); // August of this year

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allAttendanceSheets } =
        await Attandance_sheets.findAndCountAll({
          offset,
          limit,
          where: {
            created_at: {
              [Op.between]: [startDate, endDate],
            },
          },
        });

      if (allAttendanceSheets.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No attendance records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Attendance sheets records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          attendance: allAttendanceSheets,
        },
      });
    } catch (error) {
      console.error(
        "Error retrieving attendance sheets records:",
        error.message
      );
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default TrainingAttendanceController;
