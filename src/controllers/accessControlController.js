import { Op } from "sequelize";
import Mobile_App from "../models/rtc_mobile_app_access_control"
import Mobile_App_Modules from "../models/rtc_mobile_app_modules"

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


         //Assigning permissions
         static async assignPermissionsToUser  (req, res)  {
            // const { userId, moduleId, view, add, del, edit, platform } = req.body;
          
            try {
              // Create a new entry in the Mobile_App table

              const permissions = new Mobile_App ({
                userid: req.body.userid,
                moduleid: req.body.moduleid,
                view_record: req.body.view_record,
                add_record: req.body.add_record,
                delete_record: req.body.delete_record,
                edit_record: req.body.edit_record,
                platform: req.body.platform,

              })
              await permissions.save()
          
              res.status(200).json({ success: true, 
                message: 'Permissions assigned successfully',
                data:permissions });
            } catch (error) {
              console.error('Error assigning permissions:', error.message);
              res.status(500).json({ success: false, message: 'Internal server error' });
          
       
}
        }


       
    }

export default AccessControlController