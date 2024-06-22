import Inspection_Answer from "../models/rtc_inspection_answers";
import Inspection_question from "../models/rtc_inspection_questions";

class InspectionAnswersController {
  static async getAnswerByID(req, res) {
    try {
      const { id } = req.params;
      const answer = await Inspection_Answer.findAll({
        where: { question_id: id },
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
}
export default InspectionAnswersController;
