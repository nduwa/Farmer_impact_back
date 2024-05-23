import { Op } from "sequelize";
import Mobile_App from "../models/rtc_mobile_app_access_control";
import Mobile_App_Modules from "../models/rtc_mobile_app_modules";

class AccessControlController {
  static async getAllAccessControl(req, res) {
    try {
      const allAccessControl = await Mobile_App_Modules.findAll();
      if (!allAccessControl || allAccessControl.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "no access control found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all access control retieved successfullt",
        data: allAccessControl,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async assignPermissionsToUser(req, res) {
    try {
      const permissionsArray = req.body; // Assuming the array is sent directly in the body
  
      // Validate that permissionsArray is an array
      if (!Array.isArray(permissionsArray)) {
        return res.status(400).json({
          success: false,
          message: "Permissions should be an array of objects",
        });
      }
  
      const savedPermissions = [];
  
      // Loop through the array and save each permission
      for (const permissionData of permissionsArray) {
        const permission = Mobile_App.build({
          userid: permissionData.userid,
          moduleid: permissionData.moduleid,
          view_record: permissionData.view_record,
          add_record: permissionData.add_record,
          delete_record: permissionData.delete_record,
          edit_record: permissionData.edit_record,
          platform: permissionData.platform,
        });
  
        const savedPermission = await permission.save();
        savedPermissions.push(savedPermission);
      }
  
      res.status(200).json({
        success: true,
        message: "Permissions assigned successfully",
        data: savedPermissions,
      });
    } catch (error) {
      console.error("Error assigning permissions:", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  
  static async editModule(req, res) {
    try {
      const id = req.query.id;
      const module = await Mobile_App_Modules.findByPk(id);
      if (!module) {
        return res.status(404).json({
          status: "Failed",
          message: "module not found",
        });
      }
      module.module_name = req.body.module_name;
      await module.save();
      return res.status(200).json({
        status: "success",
        message: "module updated successfully!",
        data: module,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
}

export default AccessControlController;
