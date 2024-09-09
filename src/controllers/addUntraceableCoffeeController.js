import Transaction from "../models/rtc_transaction";
import Staff from "../models/rtc_staff";
import Season from "../models/rtc_seasons";
import Supplier from "../models/rtc_supplier";
import { generateRandomDigits } from "../helpers/generateRandomDigits";
import Station from "../models/rtc_station";
class AddUntraceableCoffeeController {
  static async addUntraceableCoffee(req, res) {
    try {
      const now = new Date();
      const year = now.getUTCFullYear().toString().slice(-2);
      const month = String(now.getUTCMonth() + 1).padStart(2, "0");
      const day = String(now.getUTCDate()).padStart(2, "0");
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const sessionId = `${year}${month}${day}${hours}${minutes}`;
      const randomDigits = generateRandomDigits(4);

      const staff = req?.user?.staff;
    
      const lot_number = `FTR${year}${day}${month}${staff?.userID}${randomDigits}`;
      const site_day_lot = `SCJ${staff?.userID}${year}${day}${month}`;
      const day_lot_number = `${year}${day}${month}`;
      const cherry_lot_id = `${year}${staff?.userID}CH${day}${month}`;
      const parchment_lot_id = `${year}${staff?.userID}P${day}${month}F`;
      const bad_cherry_lot_id = `${year}${staff?.userID}CH${day}${month}F`;
      const bad_parch_lot_id = `${year}${staff?.userID}CH${day}${month}F`;
      const wantedStation = await Station.findOne({
        where: {
          __Kp_Station: staff?._kf_Station,
        },
      });

      const wantedSeason = await Season.findOne(
        {
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
        },
        {
          where: { Default: 1 },
        }
      );
      console.log("wanted season", wantedSeason);
      const untraceableCoffeeToAdd = new Transaction({
        farmerid: req?.user?.user?.id,
        farmername: wantedStation?.Name,
        // coffee_type: req.body.coffee_type,
        coffee_type: "Cherry",
        transaction_type: "",
        kilograms: req.body.kilograms,
        unitprice: req.body.unitprice,
        lotnumber: lot_number,
        username: req?.user?.user?.Name_User,
        password: 123,
        transaction_date: Date.now(),
        status: 0,
        approved: 0,
        approved_at: 0,
        approved_by: 0,
        __kp_Log: "",
        closed_at: 0,
        recordid: 0,
        certification: "NC",
        _kf_Staff: staff?.__kp_Staff,
        _kf_Station: staff?._kf_Station,
        _kf_Supplier: staff?._kf_Supplier,
        site_day_lot: site_day_lot,
        DayLotNumber: day_lot_number,
        paper_receipt: generateRandomDigits(9),
        cash_paid: req.body.cash_paid,
        cherry_lot_id: cherry_lot_id,
        cherry_lot_id_recordID: 0,
        parchment_lot_id: parchment_lot_id,
        traceable: 0,
        bad_cherry_lot_id: bad_cherry_lot_id,
        bad_parch_lot_id: bad_parch_lot_id,
        _kf_Season: wantedSeason.__kp_Season,
        cherry_lot_id_kf_log: "",
        parchID_A: "",
        parchID_B: "",
        parchID_C: "",
      });
      await untraceableCoffeeToAdd.save();
      res.status(200).json({
        status: "success",
        message: "untraceable coffee  added successfully",
        data: untraceableCoffeeToAdd,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: error.message,
      });
      console.log(error);
    }
  }
}
export default AddUntraceableCoffeeController;
