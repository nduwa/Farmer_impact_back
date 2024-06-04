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
        where: { _kf_Station: stationId },
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
      console.log(req.body);

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
