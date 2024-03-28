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
}

export default mobileSyncController;
