import Drying from '../models/rtc_drying'
import parchids from '../models/rtc_temp_cherry'

class DryingControler {

  static async assignNewParchment(req, res) {
    try {
        const now = new Date();
        const year = now.getUTCFullYear().toString().slice(-2);
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0'); 
        const minutes = String(now.getUTCMinutes()).padStart(2, '0'); 
        const sessionId = `${year}${month}${day}${hours}${minutes}`;
       
        const existingParchment = await parchids.findOne({
          where:{
            cherry_lot_id: req.body.cherry_lot_id,
            grade: req.body.grade }
         
      });

      if (existingParchment) {
          return res.status(400).json({
              success: false,
              message: 'Parchment with the same cherry_lot_id and grade already exists'
          });
      }
        // Assign parchment
        const newParchment = new parchids({
            cherry_lot_id: req.body.cherry_lot_id,
            sessionid: sessionId,
            grade: req.body.grade,
            status: 0
        });

        await newParchment.save();

        res.status(200).json({
            success: true,
            message: 'Parchment assigned successfully',
            data: newParchment
        });
    } catch (error) {
        console.error('Error assigning parchment:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
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
}
export default DryingControler;