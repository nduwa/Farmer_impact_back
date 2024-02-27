import sequelize from '../database/connectDb';
import Transaction from "../models/rtc_transaction"
import Staff from "../models/rtc_staff"
import Users from "../models/rtc_users"
import Season from "../models/rtc_seasons"
import generateToken from "../helpers/generateToken";

class CoffeePurchaseController{
    
    static async getSCDailyJournals (req,res){
        try{
            Season.findOne({ attributes: ['__kp_Season'],order: [['id', 'DESC' ]],
                raw: true,limit:1 },{ where:{ Default:1 } })
            .then(seasonData =>{
                const kp_season = seasonData.__kp_Season;
                const __kp_User = req.user.user.__kp_User
                Staff.findOne({where:{_kf_User:__kp_User}})
                .then(staffData =>{
                    const kp_station = staffData._kf_Station;
                    Transaction.findAll(
                        { where:{_kf_Station:kp_station,_kf_Season: kp_season }})
                        .then(transactionData =>{
                            const kf_staff = transactionData._kf_Staff;
                            console.log("staff:", kf_staff);
                            
                            Staff.findOne({where:{__kp_Staff:kf_staff}})
                            .then(staffDetails =>{
                                console.log("details:", staffDetails);
                            })
                        console.log("Transaction No:", transactionData.length);
                        if(!transactionData || transactionData.length === 0){
                            return res.status(404).json({
                                status:"fail",
                                message:"No transaction found",
                            })
                        }
                        return res.status(200).json({
                            status:"success",
                            message:"all Transaction retieved successfull",
                            data:transactionData,staffData
                        })
                    })
                    
                })
                
            })
            
            
            // console.log("data", userDataTransaction);


            // const SCDailyJournal = await Transaction.findAll()
            // console.log(SCDailyJournal.length)
            // if(!SCDailyJournal || SCDailyJournal.length === 0){
            //     return res.status(404).json({
            //         status:"fail",
            //         message:"no access control found",
            //     })
            // }
            // return res.status(200).json({
            //     status:"success",
            //     message:"all Transaction retieved successfull",
            //     data:SCDailyJournal
            // })

        } catch(error){
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

export default CoffeePurchaseController