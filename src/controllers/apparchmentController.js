import Drying from "../models/rtc_drying";
import parchids from "../models/rtc_temp_cherry";
import parchGrade from "../models/rtc_temp_parchment";
import Supplier from "../models/rtc_supplier";
import Transaction from "../models/rtc_transaction";

class ParchmentController {
  static async assignNewParchment(req, res) {
    try {
      const now = new Date();
      const year = now.getUTCFullYear().toString().slice(-2);
      const month = String(now.getUTCMonth() + 1).padStart(2, "0");
      const day = String(now.getUTCDate()).padStart(2, "0");
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const sessionId = `${year}${month}${day}${hours}${minutes}`;

      const existingParchment = await parchids.findOne({
        where: {
          cherry_lot_id: req.body.cherry_lot_id,
          grade: req.body.grade,
        },
      });

      if (existingParchment) {
        return res.status(400).json({
          success: false,
          message:
            "Parchment with the same cherry_lot_id and grade already exists",
        });
      }
      // Assign parchment
      const newParchment = new parchids({
        cherry_lot_id: req.body.cherry_lot_id,
        sessionid: sessionId,
        grade: req.body.grade,
        status: 0,
      });

      await newParchment.save();

      res.status(200).json({
        success: true,
        message: "Parchment assigned successfully",
        data: newParchment,
      });
    } catch (error) {
      console.error("Error assigning parchment:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  // parchment grade
  static async assignParchmentGrade(req, res) {
    try {
      let certification;
      const now = new Date();
      const year = now.getUTCFullYear().toString().slice(-2);
      const _kf_Supplier = req.user.staff._kf_Supplier;
      const certificate = req.body.certificate;
      const parch_grade = req.body.parch_grade;
      const cherrylotid = req.body.cherry_lot_id;
      const parchweight = req.body.parch_weight;

      const wantedGrade = parch_grade.charAt(parch_grade.length - 1);
      if (certificate === 1) {
        certification = "C";
      } else {
        certification = "UC";
      }
      const wantedSupplier = await Supplier.findOne({
        where: {
          __Kp_Supplier: _kf_Supplier,
        },
      });
      const maximumId = await parchGrade.max("id");
      const maxId = maximumId || 0;
      console.log("Maximum ID in parchGrade table:", maxId);
      const parchmentLotId = `${year}${wantedSupplier.Supplier_ID_t}P${maxId}${certification}${wantedGrade}`;
      const parchmentId = `${year}${wantedSupplier.Supplier_ID_t}P${maxId}${certification}`;

      const wantedDrying = await Drying.findOne({
        where: {
          day_lot_number: cherrylotid,
        },
      });
      if (wantedDrying) {
        if (parch_grade === "Grade A" && parchweight != wantedDrying.GradeA) {
          return res.status(400).json({
            status: "fail",
            message: `Parchment weight should be ${wantedDrying.GradeA}`,
          });
        } else if (
          parch_grade === "Grade B" &&
          parchweight != wantedDrying.GradeB
        ) {
          return res.status(400).json({
            status: "fail",
            message: `Parchment weight should be ${wantedDrying.GradeB}`,
          });
        } else if (
          parch_grade === "Grade C" &&
          parchweight != wantedDrying.GradeC
        ) {
          return res.status(400).json({
            status: "fail",
            message: `Parchment weight should be ${wantedDrying.GradeC}`,
          });
        }
      }

      const existingParchmentGrade = await parchGrade.findOne({
        where: {
          cherry_lot_id: cherrylotid,
          parch_grade: parch_grade,
        },
      });
      if (existingParchmentGrade) {
        return res.status(400).json({
          success: false,
          message:
            "You have already assigned this one, please assing another one",
        });
      }
      const newParchGrade = new parchGrade({
        cherry_lot_id: cherrylotid,
        parchment_id: parchmentLotId,
        parch_grade: parch_grade,
        certificate: certificate,
        parch_weight: parchweight,
        parchment_lot_id: parchmentId,
        status: 0,
      });
      // console.log("parchment grade", newParchGrade)
      let lot_weight = 0;
      let A = 0;
      let B = 0;
      let C = 0;
      const transactions = await Transaction.findAll({
        where: {
          cherry_lot_id: cherrylotid,
        },
      });
      transactions.forEach((row) => {
        lot_weight += parseFloat(row.kilograms) + parseFloat(row.bad_kilograms);
        A += row.gradeA;
        B += row.gradeB;
        C += parseInt(row.gradeC);
      });

      if (transactions) {
        transactions.forEach(async (transaction) => {
          console.log("Transaction ID:", transaction.cherry_lot_id);
          console.log("Transaction Kilograms:", transaction.kilograms);
          console.log("Transaction Bad Kilograms:", transaction.bad_kilograms);
          console.log("Lot Weight:", lot_weight);
          console.log("Parchweight:", parchweight);

          console.log("A", A);
          console.log("B", B);
          console.log("C", C);

          let updateData = {};
         

          if (parch_grade === "Grade A") {
            updateData = {
              parchID_A: parchmentLotId,
              state: "in-dry-storage",
              parchID_A_Weight:
                (parchweight * parseFloat(transaction.kilograms)) / lot_weight,
              parchIDA_ratio: transaction.gradeA / parchweight,
              parchment_lot_id : parchmentId
              // parchIDB_ratio:parchIDB_ratio,
              // parchIDC_ratio:parchIDC_ratio
            };
          } else if (parch_grade === "Grade B") {
            updateData = {
              parchID_B: parchmentLotId,
              state: "in-dry-storage",
              parchID_B_Weight:
                (parchweight * parseFloat(transaction.kilograms)) / lot_weight,
              parchIDB_ratio: transaction.gradeB / parchweight,
              parchment_lot_id : parchmentId

            };
          } else {
            updateData = {
              parchID_C: parchmentLotId,
              state: "in-dry-storage",
              parchID_C_Weight:
                (parchweight * parseFloat(transaction.kilograms)) / lot_weight,
              parchIDC_ratio: transaction.gradeC / parchweight,
              parchment_lot_id : parchmentId
            };
          }
          console.log("Update Data:", updateData);

          // Update the transaction in the database
          try {
            await Transaction.update(updateData, {
              where: { id: transaction.id }, // Adjust the where condition as needed
            });
            console.log(
              `Transaction ${transaction.cherry_lot_id} updated successfully.`
            );
          } catch (error) {
            console.error(
              `Error updating transaction ${transaction.id}:`,
              error.message
            );
          }
        });
      }
      await newParchGrade.save();
      res.status(200).json({
        success: true,
        message: "parchment grade assigned successfully",
        data: newParchGrade,
      });
      console.error("Error assigning parchment grade:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    } catch (error) {
      console.log("Something went wrong ", error.message);
    }
  }

  static async getAllDryings(req, res) {
    try {
      const allDryings = await Drying.findAll();
      if (!allDryings || allDryings.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No dryings found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all dryings retieved successfully",
        data: allDryings,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  //get assigned parchment
  static async getAllAssignedParchments(req, res) {
    try {
      const allAssignedParchment = await parchGrade.findAll();
      if (allAssignedParchment) {
        return res.status(200).json({
          status: "Success",
          data: allAssignedParchment,
        });
      }
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    } catch (error) {
      console.log("Something went wrong ", error.message);
    }
  }
}
export default ParchmentController;
