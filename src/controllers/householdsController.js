import Household from '../models/rtc_households'

class HouseholdController{
    static async getAllHouseholds (req,res){
        try{
            const allHouseholds = await Household.findAll()
            if(!allHouseholds){
                return res.status(404).json({
                    status:"fail",
                    message:"No allHouseholds found "
                })
            }
            return res.status(200).json({
                status:"success",
                message:"All allHouseholds retrieved successfully !!!",
                data:allHouseholds
            })

        } catch (error) {
            console.error("Error retrieving allHouseholds :", error.message);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }}
    export default HouseholdController
    