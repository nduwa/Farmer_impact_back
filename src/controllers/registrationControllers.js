import GroupAssignment from "../models/rtc_farmer_group_assignment";
import Farmers from "../models/rtc_farmers";
import Households from "../models/rtc_households";
import Groups from "../models/rtc_groups";
import { getCurrentDate } from "../helpers/getCurrentDate";

class RegistrationsController {
  static async getNewRegistrations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const kp_station = req.user?.staff?._kf_Station;

      const { count, rows: RegistrationData } =
        await GroupAssignment.findAndCountAll({
          where: {
            ...(kp_station &&
              kp_station.length > 0 && { _kf_station: kp_station }),
            status: "new",
          },
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

  static async getVerifiedRegistrations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const kp_station = req.user?.staff?._kf_Station;

      const { count, rows: RegistrationData } =
        await GroupAssignment.findAndCountAll({
          where: {
            ...(kp_station &&
              kp_station.length > 0 && { _kf_station: kp_station }),
            status: "verified",
          },
          offset,
          limit,
        });
      if (!RegistrationData || RegistrationData.length === 0) {
        return res.status(404).json({
          status: "Failed",
          message: "No verified Registration found",
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

  static async ApproveRegistration(req, res) {
    try {
      const id = req.query.id;
      const currentUserNames = req.user.staff.Name || req.user.Name_User;

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

      await registration.update({
        approved_by: currentUserNames,
        approved_at: getCurrentDate(),
        status: "approved",
      });

      return res.status(200).json({
        status: "success",
        message: "Registration approved successfully!",
        data: registration,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  static async getApprovedRegistrations(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 100;
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const kp_station = req.user?.staff?._kf_Station;

      const { count, rows: RegistrationData } =
        await GroupAssignment.findAndCountAll({
          where: {
            ...(kp_station &&
              kp_station.length > 0 && { _kf_station: kp_station }),
            status: "approved",
          },
          offset,
          limit,
        });
      if (!RegistrationData || RegistrationData.length === 0) {
        return res.status(404).json({
          status: "Failed",
          message: "No approved Registration found",
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
          await Farmers.update(
            {
              _kf_Group: registration.kf_group_new,
              _kf_Supplier: registration._kf_Supplier,
              _kf_Station: registration._kf_station,
              type: "online",
              updated_at: Date.now(),
            },
            {
              where: { __kp_Farmer: farmer.__kp_Farmer },
            }
          );

          const household = await Households.findOne({
            where: {
              farmerid: farmer.farmerid,
            },
          });

          if (household) {
            await Households.update(
              {
                _kf_Group: registration.kf_group_new,
                group_id: registration.group_id_new,
                _kf_Supplier: registration._kf_Supplier,
                _kf_Station: registration._kf_station,
                type: "online",
                status: "Active",
              },
              {
                where: { id: household.id },
              }
            );
          }

          const group = await Groups.findOne({
            where: {
              __kp_Group: registration.kf_group_new,
            },
          });

          if (group) {
            await Groups.update(
              {
                sync_farmers: "1",
                last_update_at: Date.now(),
                active: 1,
              },
              {
                where: { id: group.id },
              }
            );
          }

          updatedFarmers.push(farmer);

          await GroupAssignment.update(
            { status: "deleted" },
            { where: { id: registration.id } }
          );
        }
      }

      return res.status(200).json({
        status: "success",
        message: "Farmers and registrations updated successfully!",
        data: updatedFarmers,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  static async deleteRegistration(req, res) {
    try {
      const { id } = req.params;

      await GroupAssignment.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "record deleted",
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }
}

export default RegistrationsController;
