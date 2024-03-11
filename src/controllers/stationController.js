

import Station from '../models/rtc_station'

class StationControler{
    static async getAllStations (req,res){
        try{
            const allStations = await Station.findAll()
            if(!allStations || allStations.length === 0)
          
            {
             
                return res.status(404).json({
                    status:"fail",
                    message:"no no stations found",
                    
                })
            }
            return res.status(200).json({
                status:"success",
                message:"all stations retieved successfullt",
                data:allStations
            })

        } catch(error)
        {
            return res.status(500).json({ status: "fail", error: error.message });

        }

        }
}

export default StationControler;

