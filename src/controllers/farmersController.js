import Farmers from '../models/rtc_farmers'

class FarmersController{
    static async getAllFarmers (req,res){
        try{
            const allFarmers = await Farmers.findAll()
            if(!allFarmers){
                return res.status(404).json({
                    status:"fail",
                    message:"No allFarmers found "
                })
            }
            return res.status(200).json({
                status:"success",
                message:"All allFarmers retrieved successfully !!!",
                data:allFarmers
            })

        } catch (error) {
            console.error("Error retrieving allFarmers :", error.message);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }}
    export default FarmersController
    