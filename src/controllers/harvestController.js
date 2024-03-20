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


    static async GeneralHarvest(req, res){
    let station = req.body.station;
    let label;
    let season = req.body.season;
    let transactionData, farmerData, groupData, householdData;

    try {
        if (!season) {
            const seasonData = await Season.findOne({
                attributes: ['__kp_Season','Label'],
                order: [['id', 'DESC']],
                raw: true,
                limit: 1,
                where: { Default: 1 }
            });

            season = seasonData.__kp_Season;
            label = seasonData.Label
            console.log("sdhfsbf",seasonData)
        }

     

        if (station) {
            transactionData = await Transaction.findAll({
                where: {
                    _kf_Season: season,
                    _kf_Station: station
                }
            });

            farmerData = await Farmers.findAll({
                where: {
                    _kf_Station: station
                }
            });

            groupData = await Groups.findAll({
                where: {
                    _kf_Station: station
                }
            });

            householdData = await Household.findAll({
                where: {
                    _kf_Station: station
                }
            });
        } else {
            transactionData = await Transaction.findAll({
                where: {
                    _kf_Season: season
                }

            });

            farmerData = await Farmers.findAll();
            groupData = await Groups.findAll();
            householdData = await Household.findAll();
        }

        // Combine all arrays into one
        // const combinedData = [
        //     ...farmerData,
        //     ...transactionData,
        //     ...groupData,
        //     ...householdData
        // ];
        console.log('Combined Data:', label);
        return res.status(200).json({
            status: "success",
            message: "Harverst retrived successfully !!!",
         transactions: transactionData,
            farmer :farmerData,
            group:groupData,
            houseHold: householdData ,
            seasons:label
        });
    } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
    }
}


}
export default HarvestController;
