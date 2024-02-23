import { Op } from "sequelize";
import Mobile_App_Modules from '../models/rtc_mobile_app_modules'

class AccessControlController{
    static async getAllAccessControl (req,res){
        try{
            const allAccessControl = await Mobile_App_Modules.findAll()
            if(!allAccessControl || allAccessControl.length === 0)
            {
                return res.status(404).json({
                    status:"fail",
                    message:"no access control found",
                    
                })
            }
            return res.status(200).json({
                status:"success",
                message:"all access control retieved successfullt",
                data:allAccessControl
            })

        } catch(error)
        {
            return res.status(500).json({ status: "fail", error: error.message });

        }

        }
       
}

export default AccessControlController