import Inspection from "../models/rtc_inspections";
import Household from "../models/rtc_households";
import Station from "../models/rtc_station";
import InspectionQuestion from "../models/rtc_inspection_questions";
import InspectionAnswer from "../models/rtc_inspection_answers";
import InspectionResponse from "../models/rtc_inspection_responses";
import { Sequelize } from "../models";
const { Op } = require('sequelize');
class InspectionsController {
  static async getAllUserInspections(req, res) {
    try {
      const { from, to } = req.query;
      const currentYear = new Date().getFullYear();
      const defaultStartDate = new Date(currentYear - 1, 6, 1); // July of last year
      const defaultEndDate = new Date(currentYear, 7, 31); // August of this year
      const startDate = from ? new Date(from) : defaultStartDate;
      const endDate = to ? new Date(to) : defaultEndDate;

      if (startDate > endDate) {
        return res.status(400).json({
          status: "fail",
          message: "'from' date should be earlier than 'to' date",
        });
      }
  
      const allInspections = await Inspection.findAll({
        where: {
          created_at: {
            [Op.between]: [startDate, endDate]
          }
        }
      });
  
      if (!allInspections || allInspections.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No inspections found in the given date range",
        });
      }
  
      return res.status(200).json({
        status: "success",
        message: "Inspections retrieved successfully",
        data: allInspections,
      });
    } catch (error) {
      console.error("Error fetching inspections:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async getInspectionDetails(req, res) {
    try {
      const inspectionDetails = await Sequelize?.query(
        `SELECT 
          rtc_station.Name,
          rtc_households.group_id, 
          rtc_households.z_Farmer_Primary,
          inspection_questions.Eng_phrase,
          inspection_answers.Eng_answer,
          inspection_questions.Kiny_phrase,
          inspection_answers.Kiny_answer,
          inspection_answers.priority,
          concat(round((100/inspection_answers.priority), 2), '%') as 'Percentage',
          rtc_inspections.created_at, 
          rtc_inspections.created_by 
        FROM rtc_inspections
        JOIN rtc_households ON rtc_inspections._kf_Household = rtc_households.__kp_Household 
        JOIN rtc_station ON rtc_inspections._kf_Station = rtc_station.__kp_Station 
        JOIN inspection_responses ON rtc_inspections.id = inspection_responses.rtc_inspections_id
        JOIN inspection_answers ON inspection_responses.inspection_answer_id = inspection_answers.id
        JOIN inspection_questions ON inspection_answers.question_id = inspection_questions.id
        WHERE rtc_inspections.created_at BETWEEN '2022-08-05' AND '2024-06-27'
        ORDER BY rtc_inspections.created_at ASC`,
        {
          type: Sequelize?.QueryTypes.SELECT,
        }
      );

      if (!inspectionDetails?.length) {
        return res.status(404).json({
          status: "fail",
          message: "No inspection details found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Inspection details retrieved successfully",
        data: inspectionDetails,
      });
    } catch (error) {
      console.log("hehe", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default InspectionsController;
