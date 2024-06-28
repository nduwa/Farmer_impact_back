import Inspection_question from "../models/rtc_inspection_questions";

class EvaluationController {
  static async getAllEvaluations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allEvaluations } =
        await Inspection_question.findAndCountAll({
          offset,
          limit,
          // order: [['updated_at', 'DESC']],
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
}

export default EvaluationController;
