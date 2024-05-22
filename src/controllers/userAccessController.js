import User_access from "../models/rtc_temp_user_access";
import Staff from "../models/rtc_staff";
import User from "../models/rtc_users";
import generateUUID from "../helpers/randomStringGenerator";
class UserAccessController {
  static async addUser(req, res) {
    try {
      const id = req.query.id;
      const wantedStaff = await Staff.findOne({
        where: {
          id: id,
        },
      });
      if (!wantedStaff) {
        return res.status(404).json({
          status: "fail",
          message: "Staff not found ",
        });
      }
      console.log("wanted", wantedStaff);
      const wantedUser = await User.findOne({
        where: {
          __Kp_User: wantedStaff._kf_User,
        },
      });
      const newUserAccess = new User_access({
        __kp_access: generateUUID(),
        _kf_User: wantedStaff?._kf_User,
        _kf_Staff: wantedStaff?.__kp_Staff,
        staff_ID: wantedStaff?.userID,
        user_ID: wantedUser?.id || "",
      });
      await newUserAccess.save();

      return res.status(200).json({
        status: "success",
        message: "User access added successfully",
        data: newUserAccess,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
  static async getAllUserAccess(req, res) {
    try {
      const allUserAccess = await User_access.findAll();
      if (!allUserAccess || allUserAccess.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No user access found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all user access retieved successfullt",
        data: allUserAccess,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async activateUser(req, res) {
    try {
      const id = req.query.id;
      console.log("iddd", id);
      const user = await User_access.findOne({
        where: {
          staff_ID: id,
        },
      });

      if (!user) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }

      if (user.state === "active") {
        return res.status(400).json({
          status: "Failed",
          message: "User is already active",
        });
      }

      user.state = "active";
      await user.save();

      return res.status(200).json({
        status: "success",
        message: "User activated successfully!",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
}
export default UserAccessController;
