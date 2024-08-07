import GroupAssignment from "../models/rtc_farmer_group_assignment";
import Farmers from "../models/rtc_farmers";

class RegistrationsController {
  static async getNewRegistrations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const { count, rows: RegistrationData } =
        await GroupAssignment.findAndCountAll({
          offset,
          limit,
        });

      if (!RegistrationData || RegistrationData.length === 0) {
        return res.status(404).json({
          status: "Failed",
          message: "No new Registration found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "All registrations retrieved successfully!",
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / pageSize),
          currentPage: page,
          RegistrationData: RegistrationData,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
  static async verifyRegistration(req, res) {
    try {
      const id = req.query.id;

      const registration = await GroupAssignment.findOne({
        where: {
          id: id,
        },
      });

      if (!registration) {
        return res.status(404).json({
          status: "Failed",
          message: "Registration not found",
        });
      }

      if (registration.status === "verified") {
        return res.status(400).json({
          status: "Failed",
          message: "Registration is already verified",
        });
      }

      registration.status = "verified";
      await registration.save();

      return res.status(200).json({
        status: "success",
        message: "Registration verified successfully!",
        data: registration,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
  static async ApproveRegistration(req, res) {
    try {
      const id = req.query.id;

      const registration = await GroupAssignment.findOne({
        where: {
          id: id,
        },
      });

      if (!registration) {
        return res.status(404).json({
          status: "Failed",
          message: "Registration not found",
        });
      }

      if (registration.status === "approve") {
        return res.status(400).json({
          status: "Failed",
          message: "Registration is already approved",
        });
      }

      registration.status = "approved";
      await registration.save();

      return res.status(200).json({
        status: "success",
        message: "Registration approved successfully!",
        data: registration,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  static async proceedRegistrations(req, res) {
    try {
      const allRegistrations = await GroupAssignment.findAll({
        where: {
          status: "approved",
        },
      });

      if (!allRegistrations || allRegistrations.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No approved registrations found",
        });
      }

      const updatedFarmers = [];

      for (const registration of allRegistrations) {
        const farmer = await Farmers.findOne({
          where: {
            __kp_Farmer: registration._kf_farmer,
          },
        });

        if (farmer) {
          farmer._kf_Group = registration?.kf_group_new;
          farmer._kf_Supplier = registration?._kf_Supplier;
          farmer._kf_Station = registration?._kf_station;
          await farmer.save();
          updatedFarmers.push(farmer);

          // Change the registration status to deleted  4CC7AE0E-EF8F-4FE8-B165-5C1AA7CA9DF0

          registration.status = "deleted";
          await registration.save();
        }
      }

      return res.status(200).json({
        status: "success",
        message: "Farmers updated successfully!",
        data: updatedFarmers,
      });
    } catch (error) {
      console.log("hehehe", error);
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }
}

export default RegistrationsController;
