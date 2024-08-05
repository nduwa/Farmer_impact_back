import stations from "../models/rtc_station";
import staff from "../models/rtc_staff";
import groups from "../models/rtc_groups";
import farmers from "../models/rtc_farmers";
import households from "../models/rtc_households";
import training from "../models/rtc_training";
import inspectionQns from "../models/rtc_inspection_questions";
import seasons from "../models/rtc_seasons";
import suppliers from "../models/rtc_supplier";
import transactions from "../models/rtc_transaction";
import answers from "../models/rtc_inspection_answers";
import inspection from "../models/rtc_inspections";
import inspections_responses from "../models/rtc_inspection_responses";
import training_attendance from "../models/rtc_training_attendance";
import training_attendance_sheet from "../models/rtc_attendance_sheets";
import farmer_group_assignment from "../models/rtc_farmer_group_assignment";
import field_farmers from "../models/rtc_field_farmers";
import weekly_reports from "../models/rtc_field_weekly_reports";
import household_trees from "../models/rtc_household_trees";
import Farm_coordinations from "../models/rtc_farm_coordinations";
import Farm_coordinates from "../models/rtc_farm_coordinates";

import { Op } from "sequelize";
import { getCurrentDate } from "../helpers/getCurrentDate";

class mobileSyncController {
  static async retrieveSupplier(req, res) {
    try {
      let allSuppliers = [];

      const { stationId } = req.params;

      let stationData = await stations.findOne({
        where: { __kp_Station: stationId },
      });

      if (!stationData || stationData.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "station not found" });
      }

      let supplier = await suppliers.findOne({
        where: { __kp_Supplier: stationData._kf_Supplier },
      });

      if (!supplier || supplier.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "no suppliers found" });
      }

      allSuppliers.push(supplier);

      return res
        .status(200)
        .json({ status: "success", table: "rtc_supplier", data: allSuppliers });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async retrieveSeason(req, res) {
    try {
      let allSeasons = [];

      const season = await seasons.findOne({
        order: [["z_recCreateTimestamp", "DESC"]],
      });

      if (!season || season.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "no season found" });
      }

      allSeasons.push(season);

      return res
        .status(200)
        .json({ status: "success", table: "rtc_seasons", data: allSeasons });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
  static async retrieveStations(req, res) {
    try {
      let allStations = [];

      const { userId } = req.params;

      const staffData = await staff.findOne({
        where: { _kf_User: userId },
      });

      if (!staffData || staffData.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "staff user not found" });
      }

      const userStation = await stations.findOne({
        where: { __kp_Station: staffData._kf_Station },
      });

      if (!userStation || userStation.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No station found" });
      }

      allStations.push(userStation);
      return res
        .status(200)
        .json({ status: "success", table: "rtc_stations", data: allStations });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async retrieveGroups(req, res) {
    try {
      let allGroups = [];

      const { stationId } = req.params;

      allGroups = await groups.findAll({
        where: { _kf_Station: stationId },
      });

      if (!allGroups || allGroups.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No groups found" });
      }

      return res
        .status(200)
        .json({ status: "success", table: "rtc_groups", data: allGroups });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async retrieveFarmers(req, res) {
    try {
      let allFarmers = [];

      const { stationId } = req.params;

      allFarmers = await farmers.findAll({
        where: { _kf_Station: stationId, type: { [Op.ne]: "deleted" } }, // retrieve all except deleted records
      });

      if (!allFarmers || allFarmers.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No farmers found" });
      }

      return res
        .status(200)
        .json({ status: "success", table: "rtc_farmers", data: allFarmers });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async retrieveHouseholds(req, res) {
    try {
      let allHouseholds = [];

      const { stationId } = req.params;

      allHouseholds = await households.findAll({
        where: { _kf_Station: stationId },
      });

      if (!allHouseholds || allHouseholds.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No households found" });
      }

      return res.status(200).json({
        status: "success",
        table: "rtc_households",
        data: allHouseholds,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async retrieveTrainingModules(req, res) {
    try {
      let allModules = [];

      allModules = await training.findAll();

      if (!allModules || allModules.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No training modules found" });
      }

      return res.status(200).json({
        status: "success",
        table: "rtc_trainingModules",
        data: allModules,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async retrieveInspectionQuestions(req, res) {
    try {
      let allQns = [];

      allQns = await inspectionQns.findAll();

      if (!allQns || allQns.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No inspection questions found" });
      }

      return res.status(200).json({
        status: "success",
        table: "inspection_questions",
        data: allQns,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async retrieveAnswers(req, res) {
    try {
      let allAnswers = [];

      allAnswers = await answers.findAll();

      if (!allAnswers || allAnswers.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "no answers found" });
      }

      return res.status(200).json({
        status: "success",
        table: "inspection_answers",
        data: allAnswers,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async submitJournal(req, res) {
    try {
      const transactionsReceived = req.body.transactions;
      const additionalCols = req.body.additional;

      if (!transactionsReceived)
        return res.status(400).json({
          status: "fail",
          message: `server received 0 transactions`,
        });

      const lastRecord = await transactions.findOne({
        order: [["id", "DESC"]],
      });

      let nextId;
      if (lastRecord) {
        nextId = lastRecord.id + 1; // Increment the ID
      } else {
        nextId = 1; // Set initial ID if no records exist
      }

      const restOfTheData = {
        id: nextId,
        username: additionalCols.username,
        password: additionalCols.password,
        DayLotNumber: additionalCols.DayLotNumber,
        uploaded_at: getCurrentDate(),
        recordid: 0,
        uploaded: 1,
        status: 0,
        approved: 0,
        approved_at: null,
        approved_by: "",
        transaction_type: "",
        __kp_Log: "",
        average_dollar_price: 0,
        green_kgs: 0,
        weigh_note_kgs: 0,
        day_lotid: 0,
        paper_receipt_image_uploaded: 0,
        balance_owed: 0,
        c_grade_merged: 0,
        loaded: 0,
        state: "created",
        fm_approval: 0,
        closed_by: 0,
        closed_at: null,
        cherry_lot_id_kf_log: "",
        cherry_lot_id_recordID: 0,
        gradeA: 0,
        gradeB: 0,
        gradeC: 0,
        parch_ratioA: 0,
        parch_ratioB: 0,
        parch_ratioC: 0,
        bad_gradeC: 0,
        bad_parch_ratioC: 0,
        adjusted_at: null,
        parchID_A: "",
        parchID_B: "",
        parchID_C: "",
        parchID_A_Weight: 0,
        parchID_B_Weight: 0,
        parchID_C_Weight: 0,
        parchIDA_ratio: 0,
        parchIDB_ratio: 0,
        parchIDC_ratio: 0,
        Parch_Contr_A_status: 0,
        Parch_Contr_B_status: 0,
        Parch_Contr_C_status: 0,
        floaters_sent: 0,
      };

      let processedTransactions = [];

      for (const tr of transactionsReceived) {
        let tmpObj = { ...tr, ...restOfTheData, ...{ id: nextId++ } };
        processedTransactions.push(tmpObj);
      }

      const addedTransactions = await transactions.bulkCreate(
        processedTransactions
      );

      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async submitInspection(req, res) {
    try {
      const inspectionData = req.body.inspection;
      const responses = req.body.responses;

      if (!inspectionData || !responses) {
        return res.status(400).json({
          status: "fail",
          message: `incomplete data`,
        });
      }

      if (!inspectionData._kf_Household) {
        return res.status(400).json({
          status: "fail",
          message: `incomplete data: household id not provided`,
        });
      }

      const lastRecord = await inspection.findOne({
        order: [["id", "DESC"]],
      });

      let nextId;
      if (lastRecord) {
        nextId = lastRecord.id + 1; // Increment the ID
      } else {
        nextId = 1; // Set initial ID if no records exist
      }

      let uploadedDate = getCurrentDate();

      const newInspection = await inspection.create({
        ...inspectionData,
        ...{ id: nextId, uploaded_at: uploadedDate },
      });

      if (!newInspection) {
        return res.status(500).json({
          status: "fail",
          message: `inspections failed`,
        });
      }

      let lastResponseId = await inspections_responses.findOne({
        order: [["id", "DESC"]],
      });

      let processedResponses = [];

      let newid = lastResponseId.id;
      for (const resp of responses) {
        let tmpObj = {
          ...resp,
          ...{ id: newid + 1, rtc_inspections_id: newInspection.id },
        };
        newid++;
        processedResponses.push(tmpObj);
      }

      const addedResponses = await inspections_responses.bulkCreate(
        processedResponses
      );

      if (!addedResponses)
        return res.status(500).json({
          status: "fail",
          message: `inspection done, responses failed`,
        });

      const currentHousehold = await households.findOne({
        where: { __kp_Household: inspectionData._kf_Household },
      });

      if (!currentHousehold)
        return res.status(500).json({
          status: "fail",
          message: `responses done, household update failed`,
        });

      const currentDate = new Date();
      const fourDigitYear = currentDate.getFullYear().toString().slice(-4);
      const twoDigitMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const twoDigitDay = ("0" + currentDate.getDate()).slice(-2);

      let inspectionID = `${fourDigitYear}${twoDigitMonth}${currentHousehold.householdid}`;

      const updatedHoushold = await currentHousehold.update({
        inspectionId: inspectionID,
        inspectionStatus: "Active",
      });

      if (!updatedHoushold)
        return res.status(500).json({
          status: "fail",
          message: `responses done, household update failed`,
        });

      return res.status(200).json({
        status: "success",
        inspectionId: newInspection.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async submitTraining(req, res) {
    try {
      const {
        id,
        created_at,
        training_course_id,
        __kf_farmer,
        __kf_group,
        status,
        __kf_attendance,
        username,
        password,
        uuid,
        uploaded_at,
        _kf_training,
        lo,
        la,
        __kp_Course,
        Duration,
        ID_COURSE,
        Name,
        Name_rw,
        Name_fr,
        filepath,
        ID_GROUP,
        participants,
      } = req.body;

      let attendances = [];
      let allParticipants = req.body.__kf_farmer;
      let allGroups = req.body.__kf_group;

      let lastSessionId = await training_attendance.findOne({
        order: [["id", "DESC"]],
      });

      let newid = lastSessionId.id;

      if (+participants > 1) {
        for (const farmer of allParticipants) {
          let tmpObj = {
            id: newid + 1,
            created_at,
            training_course_id,
            __kf_farmer: farmer,
            __kf_group: allGroups[allParticipants.indexOf(farmer)],
            status: 1,
            __kf_attendance,
            username,
            password,
            uuid,
            uploaded_at: getCurrentDate(),
            _kf_training,
            lo,
            la,
          };

          newid++;
          attendances.push(tmpObj);
        }
      } else if (+participants == 1) {
        let tmpObj = {
          id: newid + 1,
          created_at,
          training_course_id,
          __kf_farmer,
          __kf_group,
          status: 1,
          __kf_attendance,
          username,
          password,
          uuid,
          uploaded_at: getCurrentDate(),
          _kf_training,
          lo,
          la,
        };

        attendances.push(tmpObj);
      }

      const addedAttendances = await training_attendance.bulkCreate(
        attendances
      );

      if (!addedAttendances)
        return res.status(500).json({
          status: "fail",
          message: `attendance sessions failed`,
        });

      let lastSheetId = await training_attendance_sheet.findOne({
        order: [["id", "DESC"]],
      });

      let newSheetid = lastSheetId ? lastSheetId.id : 0;

      const addedAttendanceSheet = await training_attendance_sheet.create({
        id: newSheetid + 1,
        created_at,
        uuid,
        filepath,
        status: 1,
        uploaded_at: getCurrentDate(),
      });

      if (!addedAttendanceSheet)
        return res.status(500).json({
          status: "fail",
          message: `attendance sessions done, sheets failed`,
        });

      return res.status(200).json({
        status: "success",
        _kf_training,
        uuid,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async submitFarmer(req, res) {
    try {
      const newFarmers = req.body;

      if (!newFarmers)
        return res.status(400).json({
          status: "fail",
          message: `no data received`,
        });

      const lastRecord = await field_farmers.findOne({
        order: [["id", "DESC"]],
      });

      let nextId;
      if (lastRecord) {
        nextId = lastRecord.id + 1; // Increment the ID
      } else {
        nextId = 1; // Set initial ID if no records exist
      }

      let processedFarmers = [];

      for (const farmer of newFarmers) {
        let tmpObj = { ...farmer, ...{ id: nextId++, status: "new" } };
        processedFarmers.push(tmpObj);
      }

      const addedFarmers = await field_farmers.bulkCreate(processedFarmers);

      if (!addedFarmers)
        return res
          .status(500)
          .json({ status: "fail", message: "could not store new farmers" });

      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async farmerSoftDelete(req, res) {
    try {
      const { farmersToDelete } = req.body;
      let processedData = [];

      if (farmersToDelete.length < 1)
        return res.status(400).json({
          status: "fail",
          message: `incomplete data`,
        });

      for (const farmer of farmersToDelete) {
        let tmpFarmer = await farmers.findOne({
          where: { __kp_Farmer: farmer.__kp_Farmer },
        });

        if (!tmpFarmer)
          return res.status(404).json({
            status: "fail",
            message: `Farmer ${farmer.Name} was not fully registered yet`,
          });

        await tmpFarmer.update({
          type: "deleted",
        });

        processedData.push(farmer.__kp_Farmer);
      }

      res.status(200).json({
        status: "success",
        processedData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async groupStatusChanges(req, res) {
    try {
      const { groupChanges } = req.body;

      let idsToEnable = [];
      let idsToDisable = [];

      for (const change of groupChanges) {
        if (change.active == 1) {
          idsToEnable.push(change._kf_Group);
        } else {
          idsToDisable.push(change._kf_Group);
        }
      }
      let updateStatus_enable;
      let updateStatus_disable;

      if (idsToEnable.length > 0) {
        updateStatus_enable = await groups.update(
          { active: "1" },
          { where: { __kp_Group: { [Op.in]: idsToEnable } } }
        );

        if (!updateStatus_enable) {
          return res
            .status(500)
            .json({ status: "fail", message: "activating groups failed" });
        }
      }

      if (idsToDisable.length > 0) {
        updateStatus_disable = await groups.update(
          { active: "0" },
          { where: { __kp_Group: { [Op.in]: idsToDisable } } }
        );

        if (!updateStatus_disable) {
          return res
            .status(500)
            .json({ status: "fail", message: "deactivating groups failed" });
        }
      }

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async groupAssignChanges(req, res) {
    try {
      const { groupChanges } = req.body;
      let allAssignChanges = [];

      for (let change of groupChanges) {
        const { id, ...changeMod } = change;
        let tmpObj = {
          ...changeMod,
          ...{
            uploaded_at: getCurrentDate(),
            _kf_Supplier: change._kf_supplier,
          },
        };

        allAssignChanges.push(tmpObj);
      }

      const addedChanges = await farmer_group_assignment.bulkCreate(
        allAssignChanges
      );

      if (!addedChanges)
        return res.status(500).json({
          status: "fail",
          message: `submitting group changes failed`,
        });

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async submitFieldWeeklyReports(req, res) {
    try {
      const { reports } = req.body;

      if (reports.length < 1) {
        return res.status(400).json({
          status: "fail",
          message: `incomplete data`,
        });
      }

      const lastRecord = await weekly_reports.findOne({
        order: [["ID", "DESC"]],
      });

      let nextId;
      if (lastRecord) {
        nextId = lastRecord.ID + 1; // Increment the ID
      } else {
        nextId = 1; // Set initial ID if no records exist
      }

      let processedReports = [];

      for (const report of reports) {
        let tmpObj = { ...report, ...{ ID: nextId++ } };
        let { id, ...filteredObj } = tmpObj;
        processedReports.push(filteredObj);
      }

      const addedReports = await weekly_reports.bulkCreate(processedReports);

      if (!addedReports)
        return res
          .status(500)
          .json({ status: "fail", message: "could not store reports" });

      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async submitFarmerTrees(req, res) {
    try {
      const { trees } = req.body;

      if (trees.length < 1) {
        return res.status(400).json({
          status: "fail",
          message: `incomplete data`,
        });
      }

      const lastRecord = await household_trees.findOne({
        order: [["ID", "DESC"]],
      });

      let nextId;
      if (lastRecord) {
        nextId = lastRecord.ID + 1; // Increment the ID
      } else {
        nextId = 1; // Set initial ID if no records exist
      }

      let processedRecords = [];

      for (const tree of trees) {
        let tmpObj = { ...tree, ...{ ID: nextId++ } };
        let { id, ...filteredObj } = tmpObj;
        processedRecords.push(filteredObj);
      }

      const addedRecords = await household_trees.bulkCreate(processedRecords);

      if (!addedRecords)
        return res
          .status(500)
          .json({ status: "fail", message: "could not store tree details" });

      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }

  static async submitFarms(req, res) {
    try {
      const { farms } = req.body;

      if (farms.length < 1) {
        return res.status(400).json({
          status: "fail",
          message: `incomplete data`,
        });
      }

      const lastRecord_coordinations = await Farm_coordinations.findOne({
        order: [["id", "DESC"]],
      });

      const lastRecord_coordinates = await Farm_coordinates.findOne({
        order: [["id", "DESC"]],
      });

      let nextId_coordinations = 1;
      let nextId_coordinates = 1;
      let coordinates = [];
      let coordinations = [];

      if (lastRecord_coordinations) {
        nextId_coordinations = lastRecord_coordinations.id + 1; // Increment the id
      }
      if (lastRecord_coordinates) {
        nextId_coordinates = lastRecord_coordinates.id + 1; // Increment the id
      }

      for (const record of farms) {
        let {
          created_by,
          farmerid,
          latitude,
          longitude,
          status,
          uploaded_at,
          cropNameId,
          farm_unit_area,
          soil_slope,
          uuid,
          _kf_Supplier,
          _kf_Staff,
          _kf_User,
          user_code,
          _kf_Station,
          CW_Name,
          farmer_name,
          national_ID,
          farmer_ID,
          full_name,
          farm_GPS,
          created_at,
        } = record;

        let farmCoordinates = {
          id: nextId_coordinates++,
          created_at,
          created_by: 0,
          farmerid: farmer_ID,
          latitude,
          longitude,
          status,
          uploaded_at: getCurrentDate(),
          cropNameId,
          farm_unit_area,
          soil_slope,
          uuid,
          username: created_by,
        };

        coordinates.push(farmCoordinates);

        let farmCoordinations = {
          id: nextId_coordinations++,
          _kf_Supplier,
          _kf_Staff,
          _kf_User,
          user_code,
          _kf_Station,
          CW_Name,
          farmer_name,
          national_ID,
          farmer_ID,
          full_name,
          farm_GPS: `${latitude},${longitude}`,
          created_at,
        };

        coordinations.push(farmCoordinations);
      }

      const addedCoordinates = await Farm_coordinates.bulkCreate(coordinates);

      if (!addedCoordinates)
        return res.status(500).json({
          status: "fail",
          message: "could not store to rtc_farm_coordinates",
        });

      const addedCoordinations = await Farm_coordinations.bulkCreate(
        coordinations
      );

      if (!addedCoordinations)
        return res.status(500).json({
          status: "fail",
          message: "could not store to rtc_farm_coordinations",
        });

      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", error });
    }
  }
}

export default mobileSyncController;
