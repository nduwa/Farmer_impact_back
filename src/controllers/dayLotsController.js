import Day_lot from '../models/rtc_day_lot_data'

class DayLotsControler{
    static async getAllDayLots (req,res){
        try{
            const allDayLots = await Day_lot.findAll()
            if(!allDayLots || allDayLots.length === 0)
          
            {
             
                return res.status(404).json({
                    status:"fail",
                    message:"no no daylot found",
                    
                })
            }
            return res.status(200).json({
                status:"success",
                message:"all stations retieved successfullt",
                data:allDayLots
            })

        } catch(error)
        {
            return res.status(500).json({ status: "fail", error: error.message });

        }

        }
}
export default DayLotsControler