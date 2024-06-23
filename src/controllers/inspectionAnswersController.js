import Inspection_Answer from "../models/rtc_inspection_answers";
import Inspection_question from "../models/rtc_inspection_questions";

class InspectionAnswersController {
  static async getAnswerByID(req, res) {
    try {
      const { id } = req.params;
      const answer = await Inspection_Answer.findAll({
        where: { question_id: id },
        order: [["created_at", "DESC"]],
      });
      const question = await Inspection_question.findOne({
        where: { id: id },
      });

      const wantedQuestion = question?.Eng_phrase;

      if (!answer) {
        return res.status(404).json({
          status: "fail",
          message: "Answer not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Answer retrieved successfully",
        data: answer,
        question: wantedQuestion,
      });
    } catch (error) {
      console.error("Error retrieving answer record:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async deleteInspectionAnswer(req, res) {
    try {
      const id = req.query.id;
      const answer = await Inspection_Answer.findOne({
        where: { id: id },
      });
      const deletedAnswer = await Inspection_Answer.destroy({
        where: { id: id },
      });

      if (!deletedAnswer) {
        return res.status(404).json({
          status: "fail",
          message: "No answer found to delete",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Answer deleted successfully",
        data: answer,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async editInspectionAnswer(req, res) {
    try {
      const id = parseInt(req.query.id, 10);

      const { english, kinyarwanda, priority, score } = req.body;

      const updated = await Inspection_Answer.update(
        { Eng_answer: english, Kiny_answer: kinyarwanda, priority, score },
        { where: { id } }
      );
      console.log("updates", updated);
      if (!updated) {
        return res.status(404).json({
          status: "fail",
          message: "No inpection answer record found to update",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "inspection answer updated successfully",
      });
    } catch (error) {
      console.error("Error updating inspection answer record:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async addNewInspectionAnswer(req, res) {
    try {
      const { id } = req.params;
      const { english, kinyarwanda, priority, score } = req.body;
      const UserID = req.user?.user.id;

      const newInspectionAnswer = await Inspection_Answer.create({
        created_by: UserID,
        created_at: Date.now(),
        question_id: parseInt(id, 10), // Convert question_id to an integer
        Eng_answer: english,
        Kiny_answer: kinyarwanda,
        priority,
        score: parseInt(score, 10), // Convert score to an integer
        status: 0,
        __kp_Option: 0,
        _kf_Evaluation: 0,
      });

      return res.status(201).json({
        status: "success",
        message: "Inspection Answer added successfully",
        data: newInspectionAnswer,
      });
    } catch (error) {
      console.error("Error adding inspection answer record:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
export default InspectionAnswersController;
