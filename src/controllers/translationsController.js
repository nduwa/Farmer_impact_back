import translation from '../models/rtc_translations'

class TranslationsController {
  static async getAllTransalations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1; 
      const pageSize = parseInt(req.query.pageSize, 10) || 100; 

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allTranslations } = await translation.findAndCountAll({
        offset,
        limit,
      });

      if (allTranslations.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'No translation records found',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'translation records retrieved successfully',
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          translations: allTranslations,
        },
      });
    
    } catch (error) {
      console.error('Error retrieving translations records:', error.message);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

  static async deleteTranslation(req, res) {
    try {
      const id = req.query.id;
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
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async editTranslation(req, res) {
    try {
      const { id } = req.query;
      const { phrase, phrasefr, phraserw } = req.body;

      const [updated] = await translation.update(
        { phrase, phrasefr, phraserw },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({
          status: 'fail',
          message: 'No translation record found to update',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Translation updated successfully',
      });
    } catch (error) {
      console.error('Error updating translation record:', error.message);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

  static async addTranslation(req, res) {
    try {
      const { created_by, phrase, phrasefr, phraserw, status } = req.body;

      const lastTranslation = await translation.findOne({
        order: [['code', 'DESC']],
      });

      let newCode = 'GLC001';
      if (lastTranslation) {
        const lastCode = lastTranslation.code;
        const numberPart = parseInt(lastCode.slice(3), 10);
        const newNumberPart = (numberPart + 1).toString().padStart(3, '0');
        newCode = `GLC${newNumberPart}`;
      }

      const newTranslation = await translation.create({
        created_by,
        code: newCode,
        phrase,
        phrasefr,
        phraserw,
        status,
      });

      return res.status(201).json({
        status: 'success',
        message: 'Translation added successfully',
        data: newTranslation,
      });
    } catch (error) {
      console.error('Error adding translation record:', error.message);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

}

export default TranslationsController;
