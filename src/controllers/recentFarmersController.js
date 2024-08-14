import Field_farmer from "../models/rtc_field_farmers";
import Farmers from '../models/rtc_farmers'
import Household from '../models/rtc_households'
import { v4 as uuidv4 } from 'uuid';
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
  static async addApprovedFarmers(req, res) {
    try {
      const latestFarmer = await Farmers.findOne({
        order: [['id', 'DESC']],
      });
      const startingFarmerId = latestFarmer ? latestFarmer.id + 1 : 1;
      const startingRecordId = latestFarmer ? latestFarmer.recordid + 1 : 1;
      const latestFarmerIDNumber = latestFarmer 
        ? parseInt(latestFarmer.farmerid.slice(1, -1)) + 1 
        : 1;
console.log("hehe",latestFarmer.recordid)
      const formattedFarmerIDNumber = latestFarmerIDNumber.toString().padStart(5, '0'); 

      const latestHousehold = await Household.findOne({
        order: [['id', 'DESC']],
      });
      const startingHouseholdId = latestHousehold ? latestHousehold.id + 1 : 1;
      const startingHouseholdRecordId = latestHousehold ? latestHousehold.recordid + 1 : 1;
      const latestHouseholdIDNumber = latestHousehold 
      ? parseInt(latestHousehold.householdid.slice(1, -1)) + 1
      : 1;
  
      const approvedFarmers = await Field_farmer.findAll({
        where: { status: "approved" },
      });

      if (!approvedFarmers || approvedFarmers.length === 0) {
        return res.status(404).json({
          status: "Failed",
          message: "No approved farmers found",
        });
      }

     
      const newFarmers = approvedFarmers.map((farmer, index) => ({
        id: startingFarmerId + index, 
        __kp_Farmer: uuidv4().toUpperCase(), 
        farmerid: `F${(latestFarmerIDNumber + index).toString().padStart(5, '0')}A`, 
        _kf_Group: farmer._kf_Group || "",
        _kf_Household: farmer._kf_Household || "",
        _kf_Location: farmer._kf_Location || "",
        _kf_Supplier: farmer._kf_Supplier || "",
        _kf_Station: farmer._kf_Station || "",
        Year_Birth: farmer.Year_Birth || "",
        Gender: farmer.Gender || "",
        Name: farmer.farmer_name || "",
        National_ID_t: farmer.National_ID || "",
        Phone: farmer.Phone || "",
        Position: farmer.Position || "",
        CAFE_ID: "",
        SAN_ID: "",
        UTZ_ID: "",
        Marital_Status: farmer.Marital_Status || "",
        Reading_Skills: farmer.Reading_Skills || "",
        Math_Skills: farmer.Math_Skills || "",
        // created_at:  Date.now(),
        created_by: farmer.full_name,
        registered_at: farmer.registered_at,
        updated_at: farmer.updated_at,
        type: farmer.type,
        sync_farmers: 0,
        uploaded: 0,
        // uploaded_at: '0000-00-00 00:00:00',
        Area_Small: farmer.Area_Small || "",
        Area_Smallest: farmer.Area_Smallest || "",
        Trees: farmer.Trees,
        Trees_Producing: farmer.Trees_Producing,
        number_of_plots_with_coffee: farmer.number_of_plots_with_coffee || 0, 
        STP_Weight: farmer.STP_Weight || 0,
        education_level: farmer.education_level || "",
        latitude: 0,
        longitude: 0,
        householdid: `H${(latestHouseholdIDNumber + index).toString().padStart(5, '0')}`,
        seasonal_goal: 0,
        recordid: startingRecordId + index,
      }));

      const newHouseholds = approvedFarmers.map((farmer, index) => ({
        id: startingHouseholdId + index, 
        __kp_Household: uuidv4().toUpperCase(),
        _kf_Group: farmer._kf_Group || "",
        _kf_Location: farmer._kf_Location || "",
        _kf_Station: farmer._kf_Station || "",
        _kf_Supplier: farmer._kf_Supplier || "",
        Area_Small: farmer.Area_Small || "",
        Area_Smallest: farmer.Area_Smallest || "",
        householdid: `H${(latestHouseholdIDNumber + index).toString().padStart(5, '0')}`,
        z_Farmer_Primary: `F${(latestFarmerIDNumber + index).toString().padStart(5, '0')}A  ${farmer.farmer_name}`,
        created_at: farmer.created_at,
        type: farmer.type,
        farmerid: `F${(latestFarmerIDNumber + index).toString().padStart(5, '0')}A`, // Keep the farmerid consistent
        group_id: farmer._kf_Group || "",
        STP_Weight: farmer.STP_Weight || 0,
        number_of_plots_with_coffee: farmer.number_of_plots_with_coffee || "",
        Trees_Producing: farmer.Trees_Producing || "",
        Trees: farmer.Trees,
        Longitude: farmer.longitude || 0,
        Latitude: farmer.latitude || 0,
        Children: farmer.Children || 0, 
        Childen_gender: farmer.Childen_gender || "0", 
        Childen_below_18: farmer.Childen_below_18 || "0", 
        recordid: startingHouseholdRecordId + index,
        status: "active",
        inspectionId: farmer.inspectionId || "", 
        cafeId: 0,
        InspectionStatus: farmer.InspectionStatus || "inactive", 
      
      }));

      await Farmers.bulkCreate(newFarmers);
      await Household.bulkCreate(newHouseholds);
      await Field_farmer.update(
        { status: 'uploaded' }, 
        { where: { status: 'approved' } }
      );

      return res.status(200).json({
        status: "success",
        message: "Approved farmers and households added successfully, and statuses updated to 'uploaded'!",
        data: {
          newFarmers,
          newHouseholds,
        },
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
