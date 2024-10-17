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

  static async mobileAccessControl(req, res) {
    try {
      const loggedinUser = req.user.staff.id;

      const mobileModules = await Mobile_App_Modules.findAll({
        where: { platform: "mobile" },
      });

      if (!mobileModules || mobileModules.length < 1) {
        return res.status(404).json({
          status: "fail",
          message: "no access control found",
        });
      }

      const allAssignedModules = await Mobile_App.findAll({
        where: {
          userId: loggedinUser,
          platform: "mobile",
        },
      });

      return res.status(200).json({
        status: "success",
        message: "all access control retieved successfully",
        mobileModules,
        allAssignedModules,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async assignPermissionsToUser(req, res) {
    try {
      const permissionsArray = req.body;

      if (!Array.isArray(permissionsArray)) {
        return res.status(400).json({
          success: false,
          message: "Permissions should be an array of objects",
        });
      }

      if (permissionsArray.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Permissions array should not be empty",
        });
      }

      const userId = permissionsArray[0].userid;
      const platform = permissionsArray[0].platform;

      // Fetch existing permissions for the user
      const existingPermissions = await Mobile_App.findAll({
        where: {
          userid: `${userId}`,
          platform: platform,
        },
      });

      // Map existing permissions to easily compare
      const existingPermissionsMap = new Map();
      existingPermissions.forEach((permission) => {
        existingPermissionsMap.set(permission.moduleid, permission);
      });
      
      // Determine removed permissions before deletion
      const removedPermissions = existingPermissions.filter(
        (permission) =>
          !permissionsArray.some(
            (newPermission) => newPermission.moduleid === permission.moduleid
          )
      );

      // Delete existing permissions for the user
      await Mobile_App.destroy({
        where: {
          userid: `${userId}`,
          platform: platform,
        },
      });

      // Save new permissions
      const savedPermissions = await Promise.all(
        permissionsArray.map((permissionData) => {
          const permission = Mobile_App.build({
            userid: `${permissionData.userid}`,
            moduleid: permissionData.moduleid,
            view_record: permissionData.view_record,
            add_record: permissionData.add_record,
            delete_record: permissionData.delete_record,
            edit_record: permissionData.edit_record,
            platform: permissionData.platform,
          });

          return permission.save();
        })
      );

      // Determine added permissions
      const addedPermissions = permissionsArray.filter(
        (permissionData) => !existingPermissionsMap.has(permissionData.moduleid)
      );

      console.log("removed", removedPermissions, removedPermissions.length);
      console.log("saved", savedPermissions, savedPermissions.length);

      res.status(200).json({
        success: true,
        message: "Permissions assigned successfully",
        addedPermissions: addedPermissions,
        removedPermissions: removedPermissions,
        data: savedPermissions,
      });
    } catch (error) {
      console.error("Error assigning permissions:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async createModule(req, res) {
    try {
      const newModule = await Mobile_App_Modules.create({
        module_name: req.body.module_name,
        platform: req.body.platform,
      });

      return res.status(201).json({
        status: "success",
        message: "module created successfully",
        data: newModule,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
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

  static async getAssignedModules(req, res) {
    try {
      const loggedinUser = req.user.staff.id;
      const allAssignedModules = await Mobile_App.findAll({
        where: {
          userId: loggedinUser,
        },
      });
      if (!allAssignedModules || allAssignedModules.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "no assigned module found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all assigned modules retieved successfully",
        data: allAssignedModules,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
  static async getAssignedModulesToSingleUser(req, res) {
    try {
      const id = req.query.id;
      const allAssignedModules = await Mobile_App.findAll({
        where: {
          userId: id,
        },
      });
      if (!allAssignedModules || allAssignedModules.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "no assigned module found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all assigned modules retieved successfully",
        data: allAssignedModules,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}

export default AccessControlController;
