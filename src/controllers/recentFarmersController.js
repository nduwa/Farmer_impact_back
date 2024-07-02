import Field_farmer from "../models/rtc_field_farmers";

class FarmerController {
  static async getRecentFarmers(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const { count, rows: farmerData } = await Field_farmer.findAndCountAll({
        offset,
        limit,
      });

      if (!farmerData || farmerData.length === 0) {
        return res.status(404).json({
          status: "Failed",
          message: "No new farmer recorded",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "All new farmer retrieved successfully!",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          farmerData: farmerData,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  static async approveFarmer(req, res) {
    try {
      const farmerId = req.query.id;
      const farmer = await Field_farmer.findByPk(farmerId);

      if (!farmer) {
        return res.status(404).json({
          status: "Failed",
          message: "Farmer not found",
        });
      }

      if (farmer.status === "pending") {
        return res.status(400).json({
          status: "Failed",
          message: "Farmer is already approved",
        });
      }

      farmer.status = "pending";
      await farmer.save();

      return res.status(200).json({
        status: "success",
        message: "Farmer approved successfully!",
        data: farmer,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
  static async approveApprovedFarmer(req, res) {
    try {
      const farmerId = req.query.id;
      const farmer = await Field_farmer.findByPk(farmerId);

      if (!farmer) {
        return res.status(404).json({
          status: "Failed",
          message: "Farmer not found",
        });
      }

      if (farmer.status === "approved") {
        return res.status(400).json({
          status: "Failed",
          message: "Farmer is already approved",
        });
      }

      farmer.status = "approved";
      await farmer.save();

      return res.status(200).json({
        status: "success",
        message: "Farmer approved successfully!",
        data: farmer,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
}
export default FarmerController;
