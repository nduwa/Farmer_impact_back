import FieldReading from "../models/rtc_readings";
import Farmers from "../models/rtc_farmers";
import Groups from "../models/rtc_groups";
import Household from "../models/rtc_households";
import Transaction from "../models/rtc_transaction";
import Staff from "../models/rtc_staff";
import Season from "../models/rtc_seasons";
import Day_lot from "../models/rtc_day_lot_data";
import Bucket from "../models/bucketing";
import Dry from "../models/rtc_drying";

class HarvestController {
  //General harvest
  /*##############################################
            general haverst
    ################################################*/
  static async GeneralHarvest(req, res) {
    let station = req.query.station;
    let label, labels;
    let season = req.query.season;

    let transactionData, farmerData, groupData, householdData;

    try {
      if (!season) {
        const seasonData = await Season.findOne({
          attributes: ["__kp_Season", "Label"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
          where: { Default: 1 },
        });

        if (!seasonData) {
          return res
            .status(404)
            .json({ status: "fail", message: "Default season not found" });
        }

        season = seasonData.__kp_Season;
        label = seasonData.Label;
      } else {
        console.log("seasonss",season)
        const seasonData = await Season.findOne({
          where: { __kp_Season: season },
        });

        if (!seasonData) {
          return res
            .status(404)
            .json({ status: "fail", message: "Season not found" });
        }


        labels = seasonData?.Label;
      }

      console.log("Selected Season:", labels);

      if (station) {
        transactionData = await Transaction.findAll({
          where: {
            _kf_Season: season,
            _kf_Station: station,
          },
        });

        farmerData = await Farmers.findAll({
          where: {
            _kf_Station: station,
          },
        });
console.log("statiion",station, farmerData.length, season)
        groupData = await Groups.findAll({
          where: {
            _kf_Station: station,
          },
        });

        householdData = await Household.findAll({
          where: {
            _kf_Station: station,
          },
        });
      } else {
        console.log("seee",season)
        transactionData = await Transaction.findAll({
          where: {
            _kf_Season: season,
          },
        });

        farmerData = await Farmers.findAll();
        groupData = await Groups.findAll();
        householdData = await Household.findAll();
      }

      return res.status(200).json({
        status: "success",
        message: "Harvest retrieved successfully !!!",
        transactions: transactionData,
        farmer: farmerData,
        group: groupData,
        houseHold: householdData,
        seasons: label || labels,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async getAllSeasons(req, res) {
    try {
      const allSeasons = await Season.findAll();
      if (!allSeasons || allSeasons.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No season found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all seasons retieved successfullt",
        data: allSeasons,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}
export default HarvestController;
