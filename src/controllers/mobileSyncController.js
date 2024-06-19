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
import { nextChar } from "../helpers/nextChar";
import { getHouseholdid } from "../helpers/getHouseholdid";
import { Op } from "sequelize";

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

      let uploadedDate = new Date();

      const restOfTheData = {
        id: nextId,
        username: additionalCols.username,
        password: additionalCols.password,
        DayLotNumber: additionalCols.DayLotNumber,
        uploaded_at: uploadedDate,
        recordid: "",
        uploaded: 1,
        status: 0,
        approved: 0,
        approved_at: "1111-11-11 11:11:11",
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
        closed_at: "1111-11-11 11:11:11",
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
        adjusted_at: "1111-11-11 11:11:11",
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
        let tmpObj = { ...tr, ...restOfTheData };
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

      let uploadedDate = new Date();

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
          uploaded_at: new Date(),
          _kf_training,
          lo,
          la,
        };

        newid++;
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

      let newSheetid = lastSheetId.id;

      const addedAttendanceSheet = await training_attendance_sheet.create({
        id: newSheetid + 1,
        created_at,
        uuid,
        filepath,
        status: 1,
        uploaded_at: new Date(),
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
      const submittedFarmers = req.body;

      if (submittedFarmers.length < 1)
        return res.status(400).json({
          status: "fail",
          message: `incomplete data`,
        });

      const farmers_lastRecords = await farmers.findAll({
        limit: 10,
        order: [["id", "DESC"]],
      });

      const farmers_last_recordid = await farmers.findOne({
        order: [["recordid", "DESC"]],
      });

      const hh_lastRecords = await households.findAll({
        limit: 10,
        order: [["id", "DESC"]],
      });

      const hh_last_recordid = await farmers.findOne({
        order: [["recordid", "DESC"]],
      });

      let last_hhids = [];
      let lastOtherhhIds = {
        id: hh_lastRecords[0].dataValues.id,
      };

      let last_farmerids = [];
      let lastOtherFarmerIds = {
        id: farmers_lastRecords[0].dataValues.id,
      };

      for (const record of farmers_lastRecords) {
        let tmp_farmerid = record.dataValues.farmerid;
        if (tmp_farmerid.length < 1) continue;
        last_farmerids.push(+tmp_farmerid.slice(1, -1));
      }
      for (const hhrecord of hh_lastRecords) {
        let tmp_hhid = hhrecord.dataValues.householdid;
        if (tmp_hhid.length < 1) continue;
        last_hhids.push(+tmp_hhid.slice(1));
      }

      let current_farmerid = last_farmerids.sort()[last_farmerids.length - 1];
      let current_hhid = last_hhids.sort()[last_hhids.length - 1];
      let processed_hh = [];
      let processed_farmerids = [];
      let farmerArray = [];
      let hhArray = [];

      let newhhId = +lastOtherhhIds.id;
      let newhhRecordid = +hh_last_recordid.recordid;

      let newFarmerId = +lastOtherFarmerIds.id;
      let newFarmerRecordid = +farmers_last_recordid.recordid;

      for (const newFarmer of submittedFarmers) {
        let tmpFarmerObj = {};
        let tmphhObj = {};
        let farmerid = "";
        let householdid = "";
        let zprimary = "";
        let hh_level = "A";

        if (newFarmer.farmerid === "1") {
          current_farmerid += 1;
          current_hhid += 1;
          farmerid = `F${current_farmerid}A`;
          householdid = `H${current_hhid}`;
          zprimary = `${farmerid} ${newFarmer.Name}`;
          processed_hh.push({ KF: newFarmer._kf_Household, ID: householdid });
          processed_farmerids.push(farmerid);

          newhhId += 1;
          newhhRecordid += 1;

          let actualHouseholdData = {
            __kp_Household: newFarmer.__kp_Household,
            _kf_Group: newFarmer._kf_Group,
            _kf_Location: newFarmer._kf_Location,
            _kf_Station: newFarmer._kf_Station,
            _kf_Supplier: newFarmer._kf_Supplier,
            Area_Small: newFarmer.Area_Small,
            Area_Smallest: newFarmer.Area_Smallest,
            created_at: newFarmer.created_at,
            type: newFarmer.type,
            group_id: newFarmer.group_id,
            STP_Weight: newFarmer.STP_Weight,
            number_of_plots_with_coffee: newFarmer.number_of_plots_with_coffee,
            Trees_Producing: newFarmer.Trees_Producing,
            Trees: newFarmer.Trees,
            Longitude: newFarmer.Longitude,
            Latitude: newFarmer.Latitude,
            Children: newFarmer.Children,
            Childen_gender: newFarmer.Childen_gender,
            Childen_below_18: newFarmer.Childen_below_18,
            status: newFarmer.status,
            inspectionId: newFarmer.inspectionId,
            cafeId: newFarmer.cafeId,
            InspectionStatus: newFarmer.InspectionStatus,
          };

          tmphhObj = {
            id: newhhId,
            _kf_Location: "3658935C-18C5-49D0-9AD8-64F763570186",
            z_Farmer_Primary: zprimary,
            householdid,
            recordid: newhhRecordid,
            farmerid,
          };

          hhArray.push({ ...actualHouseholdData, ...tmphhObj });
        } else if (newFarmer.farmerid === "2") {
          for (const hh of processed_hh) {
            if (hh.KF === newFarmer._kf_Household)
              hh_level = nextChar(hh_level);
          }
          farmerid = `F${current_farmerid}${hh_level}`;
          processed_hh.push(newFarmer._kf_Household);
          processed_farmerids.push(farmerid);
        }

        newFarmerId += 1;
        newFarmerRecordid += 1;

        let actualFarmerData = {
          __kp_Farmer: newFarmer.__kp_Farmer,
          _kf_Group: newFarmer._kf_Group,
          _kf_Household: newFarmer._kf_Household,
          _kf_Location: newFarmer._kf_Location,
          _kf_Supplier: newFarmer._kf_Supplier,
          _kf_Station: newFarmer._kf_Station,
          Year_Birth: newFarmer.Year_Birth,
          Gender: newFarmer.Gender,
          farmerid: newFarmer.farmerid,
          Name: newFarmer.Name,
          National_ID_t: newFarmer.National_ID_t,
          Phone: newFarmer.Phone,
          Position: newFarmer.Position,
          CAFE_ID: newFarmer.CAFE_ID,
          SAN_ID: newFarmer.SAN_ID,
          UTZ_ID: newFarmer.UTZ_ID,
          Marital_Status: newFarmer.Marital_Status,
          Reading_Skills: newFarmer.Reading_Skills,
          Math_Skills: newFarmer.Math_Skills,
          created_at: newFarmer.created_at,
          created_by: newFarmer.created_by,
          registered_at: newFarmer.registered_at,
          updated_at: newFarmer.updated_at,
          type: newFarmer.type,
          sync_farmers: newFarmer.sync_farmers,
          uploaded: newFarmer.uploaded,
          uploaded_at: new Date(),
          Area_Small: newFarmer.Area_Small,
          Area_Smallest: newFarmer.Area_Smallest,
          Trees: newFarmer.Trees,
          Trees_Producing: newFarmer.Trees_Producing,
          number_of_plots_with_coffee: newFarmer.number_of_plots_with_coffee,
          STP_Weight: newFarmer.STP_Weight,
          education_level: newFarmer.education_level,
          latitude: newFarmer.latitude,
          longitude: newFarmer.longitude,
          seasonal_goal: newFarmer.seasonal_goal,
        };

        tmpFarmerObj = {
          id: newFarmerId,
          _kf_Location: "3658935C-18C5-49D0-9AD8-64F763570186",
          farmerid,
          recordid: newFarmerRecordid,
          householdid: getHouseholdid(newFarmer._kf_Household, processed_hh),
        };

        farmerArray.push({ ...actualFarmerData, ...tmpFarmerObj });
      }

      const newFarmers = await farmers.bulkCreate(farmerArray);

      if (!newFarmers)
        return res.status(500).json({
          status: "fail",
          message: `inserting farmers failed`,
        });

      const newHouseholds = await households.bulkCreate(hhArray);

      if (!newHouseholds)
        return res.status(500).json({
          status: "fail",
          message: `inserting households failed`,
        });

      return res.status(200).json({
        status: "success",
        uploadedFarmers: farmerArray,
        uploadedHH: hhArray,
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
}

export default mobileSyncController;
