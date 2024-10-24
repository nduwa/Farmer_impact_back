import TreeServey from "../models/rtc_tree_servey";
import Trees_Survey from "../models/rtc_tree_survey";
import Tree_details_Survey from "../models/rtc_tree_details_survey";
const { Op } = require("sequelize");

class HouseholdTreeServey {
  static async getAllHouseholdTrees(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allHouseholdTrees } =
        await TreeServey.findAndCountAll({
          offset,
          limit,
        });

      if (allHouseholdTrees.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No household trees records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Household trees records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          household: allHouseholdTrees,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async approveHouseholdTree(req, res) {
    try {
      const id = req.query.id;
      const station = req.user.staff._kf_Station;
      const kp_station = req.user?.staff?._kf_Station;

      const householdTree = await Trees_Survey.findOne({
        where: {
          ...(kp_station &&
            kp_station.length > 0 && { _kf_station: kp_station }),
          id: id,
        },
      });

      if (!householdTree) {
        return res.status(404).json({
          status: "Failed",
          message: "No houseold trees found",
        });
      }

      if (householdTree.status === "Approved") {
        return res.status(400).json({
          status: "Failed",
          message: "Household tree is already approved",
        });
      }
      if (householdTree._kf_Station !== station || "") {
        return res.status(400).json({
          status: "Fail",
          message: "You can not approve trees which are not from your station",
        });
      }

      householdTree.status = "Approved";
      await householdTree.save();

      return res.status(200).json({
        status: "success",
        message: "Household tree approved successfully!",
        data: householdTree,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  static async deleteHouseholdTree(req, res) {
    try {
      const id = req.query.id;
      // const station = req.user.staff._kf_Station;
      // console.log("sfhjbffasfderfgerfser",req.user.staff)
      const householdTree = await Trees_Survey.findOne({
        where: { id: id },
      });
      if (!householdTree) {
        return res.status(404).json({
          status: "Failed",
          message: "Household tree survey not found",
        });
      }

      // if (householdTree._kf_Station !== station || "") {
      //   return res.status(400).json({
      //     status: "Fail",
      //     message: "You can not delete trees which are not from your station",
      //   });
      // }

      await householdTree.destroy();

      return res.status(200).json({
        status: "success",
        message: "Household tree survey deleted successfully",
      });
    } catch (error) {
      console.log("errr", error);
      return res.status(500).json({
        status: "Failed",
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async verifyHouseholdTree(req, res) {
    try {
      const id = req.query.id;
      const station = req.user.staff._kf_Station;
      const householdTree = await Trees_Survey.findOne({
        where: {
          id: id,
        },
      });

      if (!householdTree) {
        return res.status(404).json({
          status: "Failed",
          message: "No houseold trees found",
        });
      }

      if (householdTree.status === "verified") {
        return res.status(400).json({
          status: "Failed",
          message: "Household tree is already verified",
        });
      }
      if (householdTree._kf_Station !== station || "") {
        return res.status(400).json({
          status: "Fail",
          message: "You can not approve trees which are not from your station",
        });
      }
      householdTree.status = "verified";
      await householdTree.save();

      return res.status(200).json({
        status: "success",
        message: "Household tree verified successfully!",
        data: householdTree,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
  // static async insertRecord() {
  //   try {
  //     const newRecord = await TreeServey.create(
  //       {
  //         created_at: new Date(),
  //         __kp_house_trees: "DFF32029-405F-BD06-F24C-524157B66281",
  //         _kf_Staff: "644072CF-DE4C-1F4F-A6E5-373A2AF0D071",
  //         _kf_User: "83A06EBA-E5D7-0B4A-99E6-9C5674B83A7B",
  //         full_name: "Nubuhoro Emmanuel",
  //         _kf_Station: "F9642FF7-694C-4B99-A5B4-0FA1028C4AEC",
  //         _kf_Supplier: "07463891-1754-4912-B22B-FA01835012D8",
  //         CW_Name: "Muhura",
  //         Group_ID: "MM004",
  //         farmer_ID: "F2315A",
  //         farmer_name: "Sibomana Theoneste",
  //         national_ID: "11995856665656",
  //         Phone: "1234567890",
  //         Year_Birth: 1980,
  //         Gender: "Male",
  //         child_year_1_20: 2,
  //         child_year_20_30: 3,
  //         source_income: "coffee",
  //         Trees: 10,
  //         Trees_Producing: 5,
  //         Trees_year_less_10: 3,
  //         Trees_year_10_20: 4,
  //         Trees_year_greater_20: 7,
  //         coffee_plot: 2.5,
  //         last_season: 2023,
  //         last_season_production: 1000,
  //         current_season: 2024,
  //         current_season_production: 1200,
  //         nitrogen: "8",
  //         natural_shade: "12",
  //         shade_trees: "20",
  //         other_crops_coffee_farm: "Value",
  //         other_crops_farm: "Value",
  //         longitude: 34.123456,
  //         latitude: -0.123456,
  //         seedling_last_3_year: 2021,
  //         received_tree_3_y: 20,
  //         seedling_last_2_year: 2022,
  //         received_tree_2_y: 15,
  //         seedling_last_year: 2023,
  //         received_tree_l_y: 10,
  //         rejuvenation_last_year: 2023,
  //         rejuvenated_l_tree: 7,
  //         rejuvenation_current_year: 2024,
  //         rejuvenated_c_tree: 12,
  //         status: "new",
  //         Mulching: "Value",
  //         compost_heap: "Value",
  //         pruning: "Value",
  //         trenches: "Value",
  //         rejuvenation: "Value",
  //         weed_control: "Value",
  //         traps: "Value",
  //         contour_grass: "Value",
  //         inorganic_waste: "Value",
  //         leaf_rust: "Value",
  //         berry_borer: "Value",
  //         berry_desease: "Value",
  //         white_stem_borer: "Value",
  //         scare_mealy_bug: "Value",
  //         antestia: "Value",
  //         leaf_miner: "Value",
  //       },
  //       {
  //         created_at: new Date(),
  //         __kp_house_trees: "DFF32029-405F-BD06-F24C-524157B66281",
  //         _kf_Staff: "644072CF-DE4C-1F4F-A6E5-373A2AF0D071",
  //         _kf_User: "83A06EBA-E5D7-0B4A-99E6-9C5674B83A7B",
  //         full_name: "Nubuhoro Emmanuel",
  //         _kf_Station: "F9642FF7-694C-4B99-A5B4-0FA1028C4AEC",
  //         _kf_Supplier: "07463891-1754-4912-B22B-FA01835012D8",
  //         CW_Name: "Muhura",
  //         Group_ID: "MM004",
  //         farmer_ID: "F2315A",
  //         farmer_name: "Sibomana Theoneste",
  //         national_ID: "11995856665656",
  //         Phone: "1234567890",
  //         Year_Birth: 1980,
  //         Gender: "Male",
  //         child_year_1_20: 2,
  //         child_year_20_30: 3,
  //         source_income: "coffee",
  //         Trees: 10,
  //         Trees_Producing: 5,
  //         Trees_year_less_10: 3,
  //         Trees_year_10_20: 4,
  //         Trees_year_greater_20: 7,
  //         coffee_plot: 2.5,
  //         last_season: 2023,
  //         last_season_production: 1000,
  //         current_season: 2024,
  //         current_season_production: 1200,
  //         nitrogen: "8",
  //         natural_shade: "12",
  //         shade_trees: "20",
  //         other_crops_coffee_farm: "Value",
  //         other_crops_farm: "Value",
  //         longitude: 34.123456,
  //         latitude: -0.123456,
  //         seedling_last_3_year: 2021,
  //         received_tree_3_y: 20,
  //         seedling_last_2_year: 2022,
  //         received_tree_2_y: 15,
  //         seedling_last_year: 2023,
  //         received_tree_l_y: 10,
  //         rejuvenation_last_year: 2023,
  //         rejuvenated_l_tree: 7,
  //         rejuvenation_current_year: 2024,
  //         rejuvenated_c_tree: 12,
  //         status: "new",
  //         Mulching: "Value",
  //         compost_heap: "Value",
  //         pruning: "Value",
  //         trenches: "Value",
  //         rejuvenation: "Value",
  //         weed_control: "Value",
  //         traps: "Value",
  //         contour_grass: "Value",
  //         inorganic_waste: "Value",
  //         leaf_rust: "Value",
  //         berry_borer: "Value",
  //         berry_desease: "Value",
  //         white_stem_borer: "Value",
  //         scare_mealy_bug: "Value",
  //         antestia: "Value",
  //         leaf_miner: "Value",
  //       }
  //     );

  //     console.log("Record inserted successfully:", newRecord);
  //   } catch (error) {
  //     console.error("Error inserting record:", error);
  //   }
  // }

  static async getAllNewTreeSurveys(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;
      const kp_station = req.user?.staff?._kf_Station;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allHouseholdTrees } =
        await Trees_Survey.findAndCountAll({
          where: {
            ...(kp_station &&
              kp_station.length > 0 && { _kf_station: kp_station }),
            status: "new",
          },
          offset,
          limit,
        });

      if (allHouseholdTrees.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No recent household trees records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: " Recent Household trees records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          household: allHouseholdTrees,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async getAllApprovedTreeSurveys(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;
      const kp_station = req.user?.staff?._kf_Station;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allHouseholdTrees } =
        await Trees_Survey.findAndCountAll({
          where: {
            ...(kp_station &&
              kp_station.length > 0 && { _kf_station: kp_station }),
            status: "Approved",
          },
          offset,
          limit,
        });

      if (allHouseholdTrees.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No approved household trees records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: " Approved Household trees records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          household: allHouseholdTrees,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async getAllVerifiedTreeSurveys(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;
      const kp_station = req.user?.staff?._kf_Station;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: allHouseholdTrees } =
        await Trees_Survey.findAndCountAll({
          where: {
            ...(kp_station &&
              kp_station.length > 0 && { _kf_station: kp_station }),
            status: "verified",
          },
          offset,
          limit,
        });

      if (allHouseholdTrees.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No verified household trees records found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: " Verified Household trees records retrieved successfully",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          household: allHouseholdTrees,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static async getTreeSurveyDetails(req, res) {
    const kpTreesSurvey = req.query.kpTreesSurvey;
    const treeDetails = await Tree_details_Survey.findOne({
      where: {
        _kf_trees_survey: kpTreesSurvey,
      },
    });
    if (!treeDetails || treeDetails.length === 0) {
      return res.status(404).json({
        status: "Fail",
        message: "No details for that tree available",
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Details retrieved successfully",
      data: treeDetails,
    });
  }
  static async getTreeSurveysByDate(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const kp_station = req.user?.staff?._kf_Station;

      if (!startDate || !endDate) {
        return res.status(400).json({
          status: "fail",
          message: "Please provide both startDate and endDate",
        });
      }

      if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({
          status: "fail",
          message: "endDate should be greater than or equal to startDate",
        });
      }

      const allHouseholdTrees = await Trees_Survey.findAll({
        where: {
          ...(kp_station &&
            kp_station.length > 0 && { _kf_station: kp_station }),
          created_at: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      });
      if (allHouseholdTrees.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No household trees records found for the given date range",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Household trees records retrieved successfully",
        data: allHouseholdTrees,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default HouseholdTreeServey;
