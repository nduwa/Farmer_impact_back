import Bucket from "../models/bucketing";
import Dry from "../models/rtc_drying";
import Transaction from "../models/rtc_transaction";
class BucketsControler {
  static async getAllBuckets(req, res) {
    try {
      const allBuckets = await Bucket.findAll();
      if (!allBuckets || allBuckets.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No bucket found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all buckets retieved successfully",
        data: allBuckets,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async getBucketByDayLotNumber(req, res) {
    const day_lot_number = req.query.day_lot_number;
    try {
      const bucket = await Bucket.findOne({ where: { day_lot_number } });
      if (!bucket) {
        return res.status(404).json({
          status: "fail",
          message: "No bucket found with the given day lot number",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Bucket retrieved successfully",
        data: bucket,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async updateBucketByDayLotNumber(req, res) {
    const { day_lot_number } = req.query;
    const { bucketA, bucketB, bucketC } = req.body;

    try {
      // Find the bucket to update
      const bucket = await Bucket.findOne({ where: { day_lot_number } });

      if (!bucket) {
        return res.status(404).json({
          status: "fail",
          message: "No bucket found with the given day lot number",
        });
      }

      // Update the bucket
      await bucket.update({ bucketA, bucketB, bucketC });

      return res.status(200).json({
        status: "success",
        message: "Transaction bucket updated successfully",
        data: bucket,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async getSingleBucketWeight(req, res) {
    const day_lot_number = req.query.day_lot_number;
    try {
      const bucket = await Dry.findOne({ where: { day_lot_number } });
      if (!bucket) {
        return res.status(404).json({
          status: "fail",
          message: "No bucket found with the given day lot number",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Bucket retrieved successfully",
        data: bucket,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async updateTransactionBucketWeight(req, res) {
    try {
      const { taken_c, grade_c, taken_b, grade_b, taken_a, grade_a } = req.body;
      const { day_lot_number } = req.query;
      console.log("yeyeye", day_lot_number)
      const takenX =
        taken_a === "before" || taken_b === "before" || taken_c === "before"
          ? 0.55
          : 0.45;
      const gradeATaken = grade_a - 1.2 * (takenX - 0.12) * grade_a;
      const gradeBTaken = grade_b - 1.2 * (takenX - 0.12) * grade_b;
      const gradeCTaken = grade_c - 1.2 * (takenX - 0.12) * grade_c;
console.log("hehehe", grade_a,grade_b,grade_c,req.body)

      // Ensure the calculated values are valid numbers
      if (isNaN(gradeATaken) || isNaN(gradeBTaken) || isNaN(gradeCTaken)) {
        return res.status(400).json({
            status: "fail",
            message: "Calculated values are invalid",
        });
    }
      // Find or create the Dry record
      let dryRecord = await Dry.findOne({ where: { day_lot_number } });
      if (!dryRecord) {
        return res.status(404).json({
          status: "fail",
          message: "No bucket weight found with the given day lot number",
        });
      }
      // Update the existing Dry record
      await Dry.update(
        {
          GradeA: grade_a,
          GradeB: grade_b,
          GradeC: grade_c,
          gradeATaken: taken_a,
          gradeBTaken: taken_b,
          gradeCTaken: taken_c,
          FinalGradeA: gradeATaken,
          FinalGradeB: gradeBTaken,
          FinalGradeC: gradeCTaken,
        },
        {
          where: { day_lot_number },
        }
      );

      // Calculate total weight for transactions
      const transactions = await Transaction.findAll({
        where: { cherry_lot_id: day_lot_number },
      });

      let totalWeight = 0;
      transactions.forEach((transaction) => {
        totalWeight +=
          parseFloat(transaction.kilograms) +
          parseFloat(transaction.bad_kilograms);
      });

      // Update each transaction
      for (const transaction of transactions) {
        const updateData = {
          gradeA: (grade_a * transaction.kilograms) / totalWeight,
          gradeB: (grade_b * transaction.kilograms) / totalWeight,
          gradeC: (grade_c * transaction.kilograms) / totalWeight,
        };

        await Transaction.update(updateData, {
          where: { id: transaction.id },
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Bucket data updated successfully!",
      });
    } catch (error) {
      console.error("Error updating transaction bucket weight:", error);
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}

export default BucketsControler;
