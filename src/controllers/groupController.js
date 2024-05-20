import Group from "../models/rtc_groups";

class GroupsController {
  static async getAllGroups(req, res) {
    try {
      const allGroups = await Group.findAll();
      if (!allGroups) {
        return res.status(404).json({
          status: "fail",
          message: "No allGroups found ",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "All allGroups retrieved successfully !!!",
        data: allGroups,
      });
    } catch (error) {
      console.error("Error retrieving allGroups :", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
export default GroupsController;
