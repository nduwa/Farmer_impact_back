import Inspection from '../models/rtc_inspections'

class InspectionsController{
    static async getAllUserInspections (req,res){
        try{
            const allInspections = await Inspection.findAll()
            if(!allInspections){
                return res.status(404).json({
                    status:"fail",
                    message:"No inspections found "
                })
            }
            return res.status(200).json({
                status:"success",
                message:"All inspections retrieved successfully !!!",
                data:allInspections
            })

        } catch (error) {
            console.error("Error retrieving inspections :", error.message);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }}
    export default InspectionsController
    