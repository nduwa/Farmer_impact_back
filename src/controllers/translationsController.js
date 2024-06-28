import translation from "../models/rtc_translations";

class TranslationsController {
  static async getAllTransalations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allTranslations } =
        await translation.findAndCountAll({
          offset,
          limit,
          order: [["created_at", "DESC"]],
        });

      if (allTranslations.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No translation records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "translation records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          translations: allTranslations,
        },
      });
    } catch (error) {
      console.error("Error retrieving translations records:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async deleteTranslation(req, res) {
    try {
      const id = req.query.id;
      const translatin = await translation.findOne({
        where: { id: id },
      });
      const deletedTranslation = await translation.destroy({
        where: { id: id },
      });

      if (!deletedTranslation) {
        return res.status(404).json({
          status: "fail",
          message: "No translation found to delete",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Translation deleted successfully",
        data: translatin,
      });
    } catch (error) {
      console.log("errrr", error);

      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async editTranslation(req, res) {
    try {
      const id = parseInt(req.query.id, 10);
      const { phrase, phrasefr, phraserw } = req.body;

      const updated = await translation.update(
        { phrase, phrasefr, phraserw },
        { where: { id } }
      );
      console.log("updates", updated);
      if (!updated) {
        return res.status(404).json({
          status: "fail",
          message: "No translation record found to update",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Translation updated successfully",
        data: updated,
      });
    } catch (error) {
      console.error("Error updating translation record:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async addTranslation(req, res) {
    try {
      const { phrase, phrasefr, phraserw } = req.body;
      const UserID = req.user?.user.id;

      const maximumId = await translation.max("id");
      const newMaximum = maximumId + 1;

      console.log("translation", maximumId, newMaximum);
      const newTranslation = await translation.create({
        created_by: UserID,
        code: `GLC${newMaximum}`,
        phrase,
        phrasefr,
        phraserw,
        status: 0,
        created_at: Date.now(),
      });

      return res.status(201).json({
        status: "success",
        message: "Translation added successfully",
        data: newTranslation,
      });
    } catch (error) {
      console.error("Error adding translation record:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default TranslationsController;
