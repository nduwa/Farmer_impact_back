import Delivery_reports from "../models/rtc_delivery_reports";
import Delivery_Reports_Lots from "../models/rtc_delivery_reports_lots";
import loaded_weights from "../models/rtc_loaded_weights";
import Supplier from "../models/rtc_supplier";
import Transaction from "../models/rtc_transaction";
import parchGrade from "../models/rtc_temp_parchment";
const { Op } = require("sequelize");

class deliveryReportController {
  static async report_delivery(req, res) {
    let new_delivery_report;
    let createdReports;
    try {
      const now = new Date();
      const year = now.getUTCFullYear().toString().slice(-2);
      const _kf_Supplier = req.user?.staff._kf_Supplier;
      const UserID = req.user?.user.id;

      const wantedSupplier = await Supplier.findOne({
        where: {
          __Kp_Supplier: _kf_Supplier,
        },
      });

      if (!wantedSupplier) {
        return res.status(400).json({
          success: false,
          message: "Supplier not found",
        });
      }

      const maximumId = await Delivery_reports.max("id");
      const maxId = maximumId + 1 || 0;
      new_delivery_report = await Delivery_reports.create({
        created_at: now,
        created_by: UserID,
        deliveryid: `LF-${year}-${wantedSupplier.Supplier_ID_t}-${maxId}`,
        tally_sheet_no: req.body.tally_sheet_no,
        truck_plate: req.body.truck_plate,
        loading_date: now,
        expected_delivery_date: now,
        grade: req.body.grade,
        weight: req.body.weight,
        bags: req.body.bags,
        status: "in-transit",
        close: 0,
        closed_by: UserID,
        closed_at: now,
        loaded_by: req.body.loaded_by,
        inspected_by: req.body.inspected_by,
        accountant_by: req.body.accountant_by,
        driver_name: req.body.driver_name,
        driver_licence_or_national_id: req.body.driver_licence_or_national_id,
      });

      const reportsLots = req.body.reportsLots;

      if (!Array.isArray(reportsLots)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid request format. Expected an array of delivery reports.",
        });
      }

      const transactions = await Promise.all(
        reportsLots.map(async (report) => {
          const transaction = await Transaction.findOne({
            where: {
              [Op.or]: [
                { parchID_A: report.parch_lot_ID },
                { parchID_B: report.parch_lot_ID },
                { parchID_C: report.parch_lot_ID },
              ],
            },
          });
          return transaction ? transaction.id : 0;
        })
      );

      const reportsLotsToCreate = reportsLots.map((report, index) => ({
        created_by: UserID,
        rtc_transactionid: transactions[index],
        weight: report.weight,
        bags_loaded: report.bags_loaded,
        bags_of_parchment_left: report.bags_of_parchment_left,
        status: 0,
        delivery_reportid: maxId,
        final_bags_of_parchment_left: report.final_bags_of_parchment_left,
        final_weight_left: report.final_weight_left,
        parch_lot_ID: report.parch_lot_ID,
        grade: report.grade,
      }));

      createdReports = await Delivery_Reports_Lots.bulkCreate(
        reportsLotsToCreate
      );

      // Process transactions and loaded weight
      await Promise.all(
        reportsLots.map(async (report) => {
          const transactions = await Transaction.findAll({
            where: {
              [Op.or]: [
                { parchID_A: report.parch_lot_ID },
                { parchID_B: report.parch_lot_ID },
                { parchID_C: report.parch_lot_ID },
              ],
            },
          });

          await Promise.all(
            transactions.map(async (transaction) => {
              const parchGradeData = await parchGrade.findOne({
                where: {
                  parchment_id: report.parch_lot_ID,
                },
              });

              if (!parchGradeData) {
                console.error(
                  `Parchment grade data not found for parch_lot_ID ${report.parch_lot_ID}.`
                );
                return;
              }

              let col = {
                loaded: 1,
                state: "in-transit",
              };

              let weight_loaded = 0;
              let weight_left = 0;
              let total_weight_left = 0;

              if (report.parch_lot_ID === transaction.parchID_A) {
                weight_loaded =
                  (report.weight * parseFloat(transaction.parchID_A_Weight)) /
                  parchGradeData.parch_weight;
                weight_left = transaction.parchID_A_Weight - weight_loaded;
                total_weight_left =
                  transaction.parchID_A_Weight - weight_loaded;
              } else if (report.parch_lot_ID === transaction.parchID_B) {
                weight_loaded =
                  (report.weight * parseFloat(transaction.parchID_B_Weight)) /
                  parchGradeData.parch_weight;
                weight_left = transaction.parchID_B_Weight - weight_loaded;
                total_weight_left =
                  transaction.parchID_B_Weight - weight_loaded;
              } else {
                weight_loaded =
                  (report.weight * parseFloat(transaction.parchID_C_Weight)) /
                  parchGradeData.parch_weight;
                weight_left = transaction.parchID_C_Weight - weight_loaded;
                total_weight_left =
                  transaction.parchID_C_Weight - weight_loaded;
              }

              const loadedWeightCol = {
                created_by: UserID,
                rtc_delivery_reports_id: maxId,
                rtc_transaction_id: transaction.id,
                weight_loaded: weight_loaded,
                weight_left: weight_left,
                total_weight_left: total_weight_left,
                status: 0,
              };

              await Transaction.update(col, {
                where: { id: transaction.id },
              });
              await loaded_weights.create(loadedWeightCol);
            })
          );
        })
      );

      res.status(200).json({
        success: true,
        message:
          "Parchment delivery report lots and loaded weight added successfully",
        data: {
          deliveryReport: new_delivery_report,
          Lots: createdReports,
        },
      });
    } catch (error) {
      console.error(
        "Error creating delivery report lots or processing transactions:",
        error
      );
      res.status(500).json({
        success: false,
        message: `Something went wrong: ${error.message}`,
      });
    }
  }
}

export default deliveryReportController;
