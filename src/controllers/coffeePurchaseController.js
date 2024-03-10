import Transaction from "../models/rtc_transaction"
import Staff from "../models/rtc_staff"
import Season from "../models/rtc_seasons"
import Day_lot from '../models/rtc_day_lot_data'
import  { generateRandomString } from "../helpers/randomStringGenerator"

class CoffeePurchaseController {
  static async getSCDailyJournals(req, res) {
    try {
      Season.findOne({
        attributes: ['__kp_Season'], order: [['id', 'DESC']],
        raw: true, limit: 1
      }, { where: { Default: 1 } })
        .then(seasonData => {
          const kp_season = seasonData.__kp_Season;
          const kp_station = req.user?.staff?._kf_Station;
          const Name = req.user?.staff?.Name;;
          Transaction.findAll(
            { where: { _kf_Station: kp_station, _kf_Season: kp_season, status: 0 } })
            .then(transactionData => {
              Staff.findAll({ where: { _kf_Station: kp_station } })
                .then(staffData => {
              console.log("kf kp",  kp_station)
              console.log("kf kp",  Name)

                  console.log("Transaction No:", transactionData.length);
                  if (!transactionData || transactionData.length === 0) {
                    return res.status(404).json({
                      status: "fail",
                      message: "No transaction found",
                    })
                  }
                  return res.status(200).json({
                    status: "success",
                    message: "all Transaction retieved successfull",
                    data: transactionData
                  })
                })
            })
        })
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }


  static async getSCDailyJournalsByJournalId(req, res) {
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
            status: 0
          }
        }).then(transactionData => {

          Staff.findAll({
            where: {
              _kf_Station: kp_station,
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
              data: transactionData, staffData
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
            // status:0,
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
            data: transactionData
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


  static async removeTransaction(req, res) {
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
            status: 0,
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





  static async updateTransaction(req, res) {
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
  
          if (!transactionData) {
            return res.status(404).json({
              status: "fail",
              message: "No transaction found",
            });
          }
  
          const dataToUpdate = {
            kilograms: req.body.kilograms,
            unitprice: req.body.unitprice,
            bad_unit_price: req.body.bad_unit_price,
            bad_kilograms: req.body.bad_kilograms
          };
  
          transactionData.update(dataToUpdate).then(updatedData => {
            return res.status(200).json({
              status: "success",
              message: "Transaction status updated successfully",
              data: updatedData
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





  static async approveJournal(req, res) {
    try {
      const journalId = req.params.journalId;
      console.log("site", journalId)
  const _kp_Log = generateRandomString(32)
      const seasonData = await Season.findOne({
        attributes: ['__kp_Season'],
        order: [['id', 'DESC']],
        raw: true,
        limit: 1,
        where: { Default: 1 }
      });
  
      if (!seasonData) {
        return res.status(404).json({
          status: "fail",
          message: "No season found",
        });
      }
  
      const kp_season = seasonData.__kp_Season;
      const kp_station = req.user?.staff._kf_Station;
  
      const journalToApprove = await Transaction.findAll({
        where: {
          _kf_Station: kp_station,
          _kf_Season: kp_season,
          site_day_lot: journalId,
          approved: 0
        }
      });
  
      if (!journalToApprove || journalToApprove.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "This Journal is already approved!!!!",
        });
      }
  
      const dataToUpdate = {
        __Kp_Log:_kp_Log,
        // recordId: req.body.unitprice,
        approved: 1,
        approved_at: Date.now(),
        // approved_by:req.body.approved_by,
        uploaded_at: Date.now()
      };
  
      await Promise.all(journalToApprove.map(journal => journal.update(dataToUpdate)));
  
      return res.status(200).json({
        status: "success",
        message: "Jounal approved successfully !!!",
        data: journalToApprove
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: error.message
      });
    }
  }

static async addCommissions(req, res)  {
          
  try {
    // Create a new entry in the Mobile_App table

    const commissions = new Day_lot ({
      created_at:req.body.created_at,
      created_by:req.body.created_by,
      _kf_Supplier:req.body._kf_Supplier,
      _kf_Station:req.body._kf_Station,
      day_lot_number:req.body.day_lot_number,
      UserID:req.body.UserID,
      site_day_lot:req.body.site_day_lot,
      site_cherry_kgs:req.body.site_cherry_kgs,
      site_cherry_price:req.body.site_cherry_price,
      site_Floater_kgs:req.body.site_Floater_kgs,
      site_Floater_price:req.body.site_Floater_price,
      // commission_price : req.body.commission_price,
      transport_fees: req.body.transport_fees,
     commission_fees : req.body.commission_fees,
      floater_transport_fee: req.body.floater_transport_fee,
      // cherry_transport_fees: req.body.cherry_transport_fees,
      site_total_payment: req.body.site_total_payment,
      status:0
    })
    await commissions.save()

    res.status(200).json({ success: true, 
      message: 'commissions added successfully',
      data:commissions });
  } catch (error) {
    console.error('Error adding commissions:', error.message);
    res.status(500).json({ success: false, message: error.message });


}
}



static async getAllDayLot(req, res) {
  try {
    const dayLots = await Day_lot.findAll();
    console.log("Dayaaaa", dayLots.length);
    if (!dayLots || dayLots.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "No daylotws found" });
    }
    return res.status(200).json({ status: "success", data: dayLots });
  } catch (error) {
    return res.status(500).json({ status: "fail", error: error.message });
  }
}
  








}

export default CoffeePurchaseController