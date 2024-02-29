import Transaction from "../models/rtc_transaction"
import Staff from "../models/rtc_staff"
import Season from "../models/rtc_seasons"

class CoffeePurchaseController{   
    static async getSCDailyJournals (req,res){
        try{
            Season.findOne({ attributes: ['__kp_Season'],order: [['id', 'DESC' ]],
                raw: true,limit:1 },{ where:{ Default:1 } })
            .then(seasonData =>{
                const kp_season = seasonData.__kp_Season;
                const kp_station = req.user?.staff._kf_Station;
                Transaction.findAll(
                    { where:{_kf_Station:kp_station,_kf_Season:kp_season, status:0}})
                    .then(transactionData =>{
                        Staff.findAll({where:{_kf_Station:kp_station}})
                        .then(staffData =>{
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
                                data:transactionData
                            })
                        })
                    })
            })
        } catch(error){
            return res.status(500).json({ status: "fail", error: error.message });
        }
    }  


    static async getSCDailyJournalsByJournalId (req,res){
        try {
            const journalId = req.params.journalId
            Season.findOne({
              attributes: ['__kp_Season'],
              order: [['id', 'DESC']],
              raw: true,
              limit: 1
            }, {
              where: { Default: 1 }
            }).then(seasonData => {
              const kp_season = seasonData.__kp_Season;
              const kp_station = req.user?.staff._kf_Station;
          
              Transaction.findAll({
                where: {
                  _kf_Station: kp_station,
                  _kf_Season: kp_season,
                  // Assuming site_day_lot is the field containing the journal ID
                  site_day_lot: journalId,
                  status:0
                }
              }).then(transactionData => {
              
                Staff.findAll({
                  where: { 
                    _kf_Station: kp_station ,
                    __kp_Staff: transactionData.map(transaction => transaction._kf_Staff)

                }
                
                }).then(staffData => {
                  console.log("Transaction No:", transactionData.length);
                  if (!transactionData || transactionData.length === 0) {
                    return res.status(404).json({
                      status: "fail",
                      message: "No transaction found",
                    });
                  }
                  return res.status(200).json({
                    status: "success",
                    message: "all Transaction retrieved successfully",
                    data: transactionData,staffData
                  });
                });
              });
            });
          } catch (error) {
            return res.status(500).json({ status: "fail", error: error.message });
          }
          

    }


    static async getTransactionById(req, res) {
        try {
          const id = req.params.id;
          console.log("iddddd", id);
      
          Season.findOne({
            attributes: ['__kp_Season'],
            order: [['id', 'DESC']],
            raw: true,
            limit: 1
          }, {
            where: { Default: 1 }
          }).then(seasonData => {
            const kp_season = seasonData.__kp_Season;
            const kp_station = req.user?.staff._kf_Station;
      
        Transaction.findOne({
              where: {
                _kf_Station: kp_station,
                _kf_Season: kp_season,
             
                id: id,
              }
            }).then(transactionData => {
              console.log("Transaction:", transactionData);
      
              if (!transactionData) {
                return res.status(404).json({
                  status: "fail",
                  message: "No transaction found",
                });
              }
      
              // Update the status to 1 (or any other desired value)
             
                return res.status(200).json({
                  status: "success",
                  message: "Transaction status updated successfully",
                  data: updatedTransaction
                });
             
            });
          });
        } catch (error) {
          return res.status(500).json({
            status: "fail",
            error: error.message
          });
        }
      }


      static async updateTransactionById(req, res) {
        try {
            const id = req.params.id;
            console.log("iddddd", id);
        
            Season.findOne({
              attributes: ['__kp_Season'],
              order: [['id', 'DESC']],
              raw: true,
              limit: 1
            }, {
              where: { Default: 1 }
            }).then(seasonData => {
              const kp_season = seasonData.__kp_Season;
              const kp_station = req.user?.staff._kf_Station;
        
              Transaction.findOne({
                where: {
                  _kf_Station: kp_station,
                  _kf_Season: kp_season,
                //   status:0,
                  id: id,
                }
              }).then(transactionData => {
              //   console.log("Transaction:", transactionData);
        
                if (!transactionData) {
                  return res.status(404).json({
                    status: "fail",
                    message: "No transaction found",
                  });
                }
        
                // Update the status to 1 (or any other desired value)
                transactionData.update({
                  status: 1,
                }).then(updatedTransaction => {
                  return res.status(200).json({
                    status: "success",
                    message: "Transaction status updated successfully",
                    data: updatedTransaction
                  });
                }).catch(error => {
                  return res.status(500).json({
                    status: "fail",
                    error: error.message
                  });
                });
              });
            });
          } catch (error) {
            return res.status(500).json({
              status: "fail",
              error: error.message
            });
          }
      }
      

    



    
    
}

export default CoffeePurchaseController