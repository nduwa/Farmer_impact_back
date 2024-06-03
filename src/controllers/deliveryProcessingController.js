import loaded_weights from "../models/rtc_loaded_weights";
import Temp_contribution from "../models/rtc_temp_contributions";
class DeliveryProcesingController {
  static async getLoadedWeightById(req, res) {
    try {
      const id = req.params.id;

      const loadedWeights = await loaded_weights.findAll({
        where: {
          rtc_delivery_reports_id: id,
        },
      });
      if (!loadedWeights || loadedWeights.length === 0) {
        return res.status(404).json({
          status: "success",
          message: "No loaded weights!!!",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Loaded weight retrieved successfully!!!",
        data: loadedWeights,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async startProcessing(req, res) {
    try {
      const contributions = req.body;

      // Check if contributions is an array
      if (!Array.isArray(contributions)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid request format. Expected an array of contributions.",
        });
      }

      // Map contributions to process them
      const contributionProcessed = contributions.map((contribution) => ({
        certification: contribution.Certification,
        farmer_name: contribution.farmer_name,
        farmer_id: contribution.farmer_id,
        floaters: contribution.floaters,
        parch_weight: contribution.parch_weight,
        parch_ratio: contribution.parch_ratio,
        station: contribution.station,
        amount_paid: contribution.amount_paid,
        unit_price: contribution.unit_price,
        status: 0,
        contribution_sent_at: contribution.contribution_sent_at,
        contribution_created_at: contribution.created_at,
        contribution_created_by: contribution.created_by,
        contribution_id: contribution.id,
        rtc_delivery_reports_id: contribution.rtc_delivery_reports_id,
        rtc_transaction_id: contribution.rtc_transaction_id,
        transaction_weight: contribution.CherryWeight,
        weight_loaded: contribution.weight_loaded,
        started_at: new Date(),
        rtc_delivery_reports_id: contribution.rtc_delivery_reports_id,
      }));

      // Bulk create processed contributions
      const createdContribution = await Temp_contribution.bulkCreate(
        contributionProcessed
      );

      // Return success response
      return res.status(200).json({
        success: true,
        message: "Contributions processed successfully.",
        data: createdContribution,
      });
    } catch (error) {
      // Handle errors

      return res.status(500).json({
        success: false,
        message: "An error occurred while processing contributions.",
        error: error.message,
      });
    }
  }

  static async getProcessedContributions(req, res) {
    try {
      const processedContributions = await Temp_contribution.findAll();
      if (!processedContributions || processedContributions.length === 0) {
        return res.status(404).json({
          status: "success",
          message: "No processed contributions!!!",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Processed contributions retieved successfully!!!",
        data: processedContributions,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async getProcessedContributionById(req, res) {
    try {
      const id = req.params.id;

      const processedContribution = await Temp_contribution.findAll({
        where: {
          rtc_delivery_reports_id: id,
        },
      });
      if (!processedContribution || processedContribution.length === 0) {
        return res.status(404).json({
          status: "success",
          message: "No processed contributions!!!",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Processed contributions retrieved successfully!!!",
        data: processedContribution,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
export default DeliveryProcesingController;
