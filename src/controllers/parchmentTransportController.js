import Delivery_reports from "../models/rtc_delivery_reports";
import Delivery_Reports_Lots from "../models/rtc_delivery_reports_lots";
import loaded_weights from "../models/rtc_loaded_weights";
import Supplier from "../models/rtc_supplier";
import Transaction from "../models/rtc_transaction";
import parchGrade from "../models/rtc_temp_parchment";
import { date } from "joi";
const { Op, Error } = require("sequelize");
class ParchmentTransportController {
  static async deliverParchment(req, res) {
    try {
      const now = new Date();
      const year = now.getUTCFullYear().toString().slice(-2);
      const _kf_Supplier = req.user?.staff._kf_Supplier;
      const UserID = req.user?.user.id;
      const parch_lot_ID = req.body.parch_lot_ID;

      let transactionid;
      const wantedSupplier = await Supplier.findOne({
        where: {
          __Kp_Supplier: _kf_Supplier,
        },
      });

      const maximumId = await Delivery_reports.max("id");
      const maxId = maximumId + 1 || 0;

      const transaction = await Transaction.findOne({
        where: {
          [Op.or]: [
            { parchID_A: parch_lot_ID },
            { parchID_B: parch_lot_ID },
            { parchID_C: parch_lot_ID },
          ],
        },
      });
      if (transaction) {
        transactionid = transaction.id;
      } else {
        transactionid = 0;
      }

      //new delivery report
      const newDeliveryReport = new Delivery_reports({
        id: maxId,
        created_at: Date.now(),
        created_by: UserID,
        deliveryid: `LF-${year}-${wantedSupplier.Supplier_ID_t}-${maxId}`,
        tally_sheet_no: req.body.tally_sheet_no,
        truck_plate: req.body.truck_plate,
        loading_date: Date.now(),
        expected_delivery_date: Date.now(),
        grade: req.body.grade,
        weight: req.body.weight,
        bags: req.body.bags,
        status: "in-transit",
        close: 0,
        closed_by: UserID,
        closed_at: Date.now(),
        loaded_by: req.body.loaded_by,
        inspected_by: req.body.inspected_by,
        accountant_by: req.body.accountant_by,
        driver_name: req.body.driver_name,
        driver_licence_or_national_id: req.body.driver_licence_or_national_id,
      });

      //get parchment with parchment id
      const parchment = await parchGrade.findOne({
        where: {
          parchment_id: parch_lot_ID,
        },
      });

      if (!parchment) {
        return res.status(404).json({
          message: "no such parchment available ",
        });
      }
      const parchweight = parchment.parch_weight;

      const existingDeliveryReport = await Delivery_Reports_Lots.findAll({
        where: {
          parch_lot_ID: parch_lot_ID,
        },
      });
      let weightLeft;
      let totalExistingWeight = 0; // Initialize totalExistingWeight to 0

      if (
        Array.isArray(existingDeliveryReport) &&
        existingDeliveryReport.length > 0
      ) {
        existingDeliveryReport.forEach((report) => {
          totalExistingWeight += report.weight;
        });

        const remainingWeight = parchweight - totalExistingWeight;
        weightLeft = remainingWeight - newDeliveryReport.weight;
      } else {
        weightLeft = parchweight - newDeliveryReport?.weight;
      }

      if (newDeliveryReport?.weight > parchweight) {
        return res.status(400).json({
          status: "fail",
          message: `Weight can not exceed ${parchweight}`,
        });
      }
      const newDeliveryReportLots = new Delivery_Reports_Lots({
        created_by: UserID,
        rtc_transactionid: transactionid,
        weight: newDeliveryReport.weight,
        bags_loaded: newDeliveryReport.bags,
        bags_of_parchment_left: req.body.bags_of_parchment_left,
        status: 0,
        delivery_reportid: maxId,
        final_bags_of_parchment_left: req.body.final_bags_of_parchment_left,
        final_weight_left: weightLeft,
        parch_lot_ID: parch_lot_ID,
        grade: req.body.grade,
      });

      // const existingDeliveryReport = await Delivery_Reports_Lots.findOne({
      //   where: {
      //     parch_lot_ID: parch_lot_ID,
      //   },
      // });

      // no existing delivery report

      if (!existingDeliveryReport) {
        const transactions = await Transaction.findAll({
          where: {
            [Op.or]: [
              { parchID_A: parch_lot_ID },
              { parchID_B: parch_lot_ID },
              { parchID_C: parch_lot_ID },
            ],
          },
        });

        if (transactions) {
          transactions.forEach(async (transaction) => {
            let col = {};
            let loadedWeightCol = {};
            col = {
              loaded: 1,
              state: "in-transit",
            };

            let weight_loaded = 0;
            let weight_left = 0;
            let total_weight_left = 0;

            if (parch_lot_ID === transaction.parchID_A) {
              weight_loaded =
                (newDeliveryReport.weight *
                  parseFloat(transaction.parchID_A_Weight)) /
                parchweight;
              weight_left = transaction.parchID_A_Weight - weight_loaded;
              total_weight_left = transaction.parchID_A_Weight - weight_loaded;
            } else if (parch_lot_ID === transaction.parchID_B) {
              weight_loaded =
                (newDeliveryReport.weight *
                  parseFloat(transaction.parchID_B_Weight)) /
                parchweight;
              weight_left = transaction.parchID_B_Weight - weight_loaded;
              total_weight_left = transaction.parchID_B_Weight - weight_loaded;
            } else {
              weight_loaded =
                (newDeliveryReport.weight *
                  parseFloat(transaction.parchID_C_Weight)) /
                parchweight;
              weight_left = transaction.parchID_C_Weight - weight_loaded;
              total_weight_left = transaction.parchID_C_Weight - weight_loaded;
            }

            loadedWeightCol = {
              created_by: UserID,
              rtc_delivery_reports_id: maxId,
              rtc_transaction_id: transaction.id,
              weight_loaded: weight_loaded,
              weight_left: weight_left,
              total_weight_left: total_weight_left,
              status: 0,
            };

            try {
              await Transaction.update(col, {
                where: { id: transaction.id },
              });
              await loaded_weights.create(loadedWeightCol);
            } catch (error) {
              console.error(
                `Error updating transaction ${transaction.id}:`,
                error.message
              );
              return res.status(400).json({
                message: `an error occured ${error.message}`,
              });
            }
          });
        }

        await newDeliveryReport.save();

        await newDeliveryReportLots.save();
        res.status(200).json({
          success: true,
          message: "Parchment delivery report added successfully",
          data: newDeliveryReportLots,
        });
      }

      // if (existingDeliveryReport) {
      let totalWeight = 0;
      existingDeliveryReport.forEach((report) => {
        totalWeight += report.weight;
      });
      // const existingWeight = existingDeliveryReport?.weight;

      if (totalWeight >= parchweight) {
        return res.status(400).json({
          status: "fail",
          message: "you have already delivered all weight of this parchment",
        });
      }

      const remainingWeight = parchweight - totalWeight;

      if (newDeliveryReport?.weight > remainingWeight) {
        return res.status(400).json({
          message: `the remaining weight should be ${remainingWeight}`,
        });
      } else {
        const transactions = await Transaction.findAll({
          where: {
            [Op.or]: [
              { parchID_A: parch_lot_ID },
              { parchID_B: parch_lot_ID },
              { parchID_C: parch_lot_ID },
            ],
          },
        });

        if (transactions) {
          transactions.forEach(async (transaction) => {
            let loadedWeightCol = {};

            let weight_loaded = 0;
            let weight_left = 0;
            let total_weight_left = 0;

            if (parch_lot_ID === transaction.parchID_A) {
              weight_loaded =
                (newDeliveryReport.weight *
                  parseFloat(transaction.parchID_A_Weight)) /
                remainingWeight;
              weight_left = transaction.parchID_A_Weight - weight_loaded;
              total_weight_left = transaction.parchID_A_Weight - weight_loaded;
            } else if (parch_lot_ID === transaction.parchID_B) {
              weight_loaded =
                (newDeliveryReport.weight *
                  parseFloat(transaction.parchID_B_Weight)) /
                remainingWeight;
              weight_left = transaction.parchID_B_Weight - weight_loaded;
              total_weight_left = transaction.parchID_B_Weight - weight_loaded;
            } else {
              weight_loaded =
                (newDeliveryReport.weight *
                  parseFloat(transaction.parchID_C_Weight)) /
                remainingWeight;
              weight_left = transaction.parchID_C_Weight - weight_loaded;
              total_weight_left = transaction.parchID_C_Weight - weight_loaded;
            }

            loadedWeightCol = {
              created_by: UserID,
              rtc_delivery_reports_id: maxId,
              rtc_transaction_id: transaction.id,
              weight_loaded: weight_loaded,
              weight_left: weight_left,
              total_weight_left: total_weight_left,
              status: 0,
            };

            try {
              const newLoadedWeight = await loaded_weights.create(
                loadedWeightCol
              );
            } catch (error) {
              console.error("Error creating new loaded weight:", error.message);
              return res.status(400).json({
                message: `An error occurred: ${error.message}`,
              });
            }
          });
        }
        await newDeliveryReport.save();
        await newDeliveryReportLots.save();

        return res.status(200).json({
          message: "reports updated successfully",
          data: newDeliveryReport,
          data3: newDeliveryReportLots,
        });
      }
    } catch (error) {
      console.log("Something went wrong ", error);
      res.status(500).json({
        success: false,
        message: `Internal server error`,
      });
    }
  }

  //get delivery repots
  static async getDeliveryReports(req, res) {
    try {
      const allDeliveryReports = await Delivery_reports.findAll();
      if (!allDeliveryReports) {
        return res.status(404).json({
          status: "fail",
          message: "no delivery report found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "all delivery report retireved successfully",
        data: allDeliveryReports,
      });
    } catch (error) {
      console.log("some thing went wrong", error.message);
      return res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  }

  //get the lastest report by parch id

  static async getDeliveryReportLots(req, res) {
    try {
      // let parch_lot_ID = req.query.parch_lot_ID;
      // const maximumId = await Delivery_reports.max("id");
      const reportsLots = await Delivery_Reports_Lots.findAll({});
      if (!reportsLots) {
        return res.status(404).json({
          status: "fail",
          message: "no delivery report found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "all delivery report retireved successfully",
        data: reportsLots,
      });
    } catch (error) {}
  }

  //derivery report lot by id

  static async getDeliveryReportLotById(req, res) {
    try {
      const id = req.params.id;

      const deliveryReportLot = await Delivery_Reports_Lots.findAll({
        where: {
          delivery_reportid: id,
        },
      });
      if (!deliveryReportLot) {
        return res.status(404).json({
          status: "fail",
          message: "no delivery report lot found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Delivery report lot retrieved successfully !!!",
        data: deliveryReportLot,
      });
    } catch (error) {
      console.log("some thing went wrong", error);
      return res.status(500).json({
        status: "fail",
        message: `Internal server error ${error.message}`,
      });
    }
  }

  //delivery report by id

  static async getDeliveryReportById(req, res) {
    try {
      const id = req.params.id;
      const deliveryReport = await Delivery_reports.findOne({
        where: {
          id: id,
        },
      });
      if (!deliveryReport) {
        return res.status(404).json({
          status: "fail",
          message: "no delivery report lot found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Delivery report  retrieved successfully !!!",
        data: deliveryReport,
      });
    } catch (error) {
      console.log("some thing went wrong", error);
      return res.status(500).json({
        status: "fail",
        message: `Internal server error ${error.message}`,
      });
    }
  }

  //update delivery report
  static async updateDeliveryReport(req, res) {
    try {
      const id = req.params.id;
      const UserID = req.user?.user.id;
      const total_bags_received = req.body.total_bags_received;

      const weight_parch_received = req.body.weight_parch_received;

      const reportToUpdate = Delivery_reports.findOne({
        where: {
          id: id,
        },
      });
      if (!reportToUpdate) {
        return res.status(404).json({
          status: "fail",
          message: "Report you want to update does not exist !!!",
        });
      }
      const bag_weigth = total_bags_received * parseFloat(0.166666);
      const gross_weight = bag_weigth + parseInt(weight_parch_received);

      const deliveryReportLot = await Delivery_Reports_Lots.findOne({
        where: {
          delivery_reportid: id,
        },
      });

      const columnToUpdate = {
        receiving_form_id: req.body.receiving_form_id,
        bag_type: req.body.bag_type,
        total_bags_received: total_bags_received,
        weight_received_bags: bag_weigth,
        weight_parch_received: weight_parch_received,
        gross_weight_parch_received: gross_weight,
        moisture: req.body.moisture,
        received: 1,
        received_by: UserID,
        received_at: Date.now(),
        status: "delivered",
      };

      const transactions = await Transaction.findAll({
        where: {
          [Op.or]: [
            { parchID_A: deliveryReportLot.parch_lot_ID },
            { parchID_B: deliveryReportLot.parch_lot_ID },
            { parchID_C: deliveryReportLot.parch_lot_ID },
          ],
        },
      });

      if (transactions) {
        transactions.forEach(async (transaction) => {
          let updatedState = { state: "delivered" };

          await Transaction.update(updatedState, {
            where: { id: transaction.id },
          });
        });
      }

      await Delivery_reports.update(columnToUpdate, { where: { id: id } });
      return res.status(200).json({
        status: "success",
        message: "Delivery report updated successfully",
        data: columnToUpdate,
      });
    } catch (error) {
      console.log("some thing went wrong", error);
      return res.status(500).json({
        Message: `internal server error `,
      });
    }
  }
}

export default ParchmentTransportController;
