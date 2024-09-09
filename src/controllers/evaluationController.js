import Inspection_question from "../models/rtc_inspection_questions";
import generateUUID from "../helpers/randomStringGenerator";

class EvaluationController {
  static async getAllEvaluations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      // Add the order clause to fetch the latest evaluations first
      const { count, rows: allEvaluations } = await Inspection_question.findAndCountAll({
        offset,
        limit,
        order: [['updated_at', 'DESC']], // Sorting by 'updated_at' in descending order
      });

      if (allEvaluations.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No evaluation records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Evaluation records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          evaluations: allEvaluations,
        },
      });
    } catch (error) {
      console.error("Error retrieving evaluation records:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async AddInspectionQuestion(req, res) {
    try {
      const { EngPhrase, KinyPhrase, award, evaluationMode, priority } = req.body;
  
      // Retrieve the last inspection question sorted by createdAt or updatedAt to get the latest entry
      const lastInspection = await Inspection_question.findOne({
        order: [['updated_at', 'DESC']], // Fetch the most recent inspection by createdAt
      });
  
      let newEvaluationId;
  
      if (lastInspection && lastInspection.evaluation_id) {
        // Extract the numeric part from evaluation_id using regex and increment it
        const lastIdNumber = parseInt(lastInspection.evaluation_id.match(/\d+/)[0], 10);
        console.log("Last evaluation ID number:", lastIdNumber);
        newEvaluationId = `Observation${lastIdNumber + 1}`;
      } else {
        // If no previous evaluation exists, start from "Observation1"
        newEvaluationId = "Observation1";
      }
  
      // Create a new inspection question with the new evaluation_id
      const newInspectionQuestion = await Inspection_question.create({
        updated_at: new Date(), // Set the updated_at timestamp
        __kp_Evaluation: generateUUID(),
        evaluation_id: newEvaluationId,
        evaluation_mode: evaluationMode,
        Eng_phrase: EngPhrase,
        Kiny_phrase: KinyPhrase,
        award,
        priority,
        _kf_Course: "",
        Answer: "",
        status: 0,
      });
  
      return res.status(201).json({
        status: "success",
        message: "Inspection question added successfully",
        data: newInspectionQuestion,
      });
    } catch (error) {
      console.error("Error adding inspection question:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default EvaluationController;
