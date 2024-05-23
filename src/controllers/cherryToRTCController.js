import Transaction from "../models/rtc_transaction";
import Temp_cherrylots from "../models/rtc_temp_cherry_lot";
import Readings from "../models/rtc_readings";
import Supplier from "../models/rtc_supplier";
class CherryToRTCController {
  static async saveCherryToSubmit(req, res) {
    try {
      const cherry_lot_id = req.params.cherry_lot_id;

      const wantedCherry = await Transaction.findOne({
        where: {
          cherry_lot_id: cherry_lot_id,
        },
      });
      if (!wantedCherry) {
        return res.status(404).json({
          status: "fail",
          message: "no transactions found",
        });
      }
      const wantedReading = await Readings.findOne({
        where: {
          _kf_Supplier: wantedCherry._kf_Supplier,
        },
      });
      const wantedSupplier = await Supplier.findOne({
        __kp_Supplier: wantedCherry._kf_Supplier,
      });

      const newCherry = new Temp_cherrylots({
        _Kf_Category: "8523EB72-0424-4289-B904-2505B9AE3A3C",
        _kf_Reading: wantedReading.__kp_Reading,
        _kf_Season: wantedCherry._kf_Season,
        _kf_Supplier: wantedCherry._kf_Supplier,
        _kf_Station: wantedCherry._kf_Station,
        _kf_Location: wantedSupplier?._kf_Location,
        _kf_Type: wantedSupplier._kf_Type,
        certification: wantedCherry.certification,
        _kf_Staff: wantedCherry._kf_Staff,
        Date: wantedCherry.transaction_date,
        Price_n: wantedCherry.unitprice,
        Weight_Period_Reading_n: req.body.Weight_Period_Reading_n,
        Weight_Period_Floaters: req.body.Weight_Period_Floaters,
        Price_Period_Floaters: wantedCherry.bad_unit_price,
      });
      await newCherry.save();
      res.status(200).json({
        status: "success",
        message: "new cherry saved successfully",
        data: newCherry,
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

export default CherryToRTCController;
