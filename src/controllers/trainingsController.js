import Training from "../models/rtc_training";

class TrainingController {
  static async getAllTraining(req, res) {
    try {
      const allTrainings = await Training.findAll();
      if (!allTrainings || allTrainings.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No trainings found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "All trainings retrieved successfully",
        data: allTrainings,
      });
    } catch (error) {
      console.error("Error retrieving trainings:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async editCourse(req, res) {
    try {
      const courseId = req.params.courseId;
      const existingCourse = await Training.findOne({
        where: { ID_COURSE: courseId },
      });

      if (!existingCourse) {
        return res.status(404).json({
          status: "fail",
          message: "No course found",
        });
      }

      const col = {
        Name: req.body.Name,
        Name_rw: req.body.Name_rw,
        Name_fr: req.body.Name_fr,
      };

      const updatedCourse = await existingCourse.update(col);

      return res.status(200).json({
        status: "success",
        data: updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async deleteCourse(req, res) {
    try {
      const courseId = req.params.courseId;
      const deletedCourse = await Training.destroy({
        where: { ID_COURSE: courseId },
      });

      if (!deletedCourse) {
        return res.status(404).json({
          status: "fail",
          message: "No course found to delete",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Course deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default TrainingController;
