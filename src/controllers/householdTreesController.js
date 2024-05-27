import HouseholdTrees from '../models/rtc_household_trees'

class HouseholdTreesController {
  static async getAllHouseholdTrees(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1; 
      const pageSize = parseInt(req.query.pageSize, 10) || 100; 

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allHouseholdTrees } = await HouseholdTrees.findAndCountAll({
        offset,
        limit,
      });

      if (allHouseholdTrees.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'No household trees records found',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Household trees records retrieved successfully',
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          household: allHouseholdTrees,
        },
      });
    
    } catch (error) {
      console.error('Error retrieving household trees records:', error.message);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

}

export default HouseholdTreesController;
