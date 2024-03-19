import Transaction from "../models/rtc_transaction";
import Staff from "../models/rtc_staff";
import Season from "../models/rtc_seasons";
import Day_lot from "../models/rtc_day_lot_data";
import Bucket from '../models/bucketing'
import Dry from '../models/rtc_drying'
import { generateRandomString } from "../helpers/randomStringGenerator";

class CoffeePurchaseController {
  static async getSCDailyJournals(req, res) {
    try {
      let whereCondition = {}; 
    
     
      Season.findOne(
        {
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
        },
        { where: { Default: 1 } }
      ).then((seasonData) => {
        const kp_season = seasonData.__kp_Season;
        const kp_station = req.user?.staff?._kf_Station;
        const Name = req.user?.staff?.Name;
        const Role = req.user?.staff?.Role;
        if (Role === "System Admin") {s
          whereCondition = { _kf_Season: kp_season, status: 0 };
        } else {
          const kp_station = req.user?.staff?._kf_Station;
          whereCondition = { _kf_Station: kp_station, _kf_Season: kp_season, status: 0 };
        }
        Transaction.findAll({
          where: whereCondition,
        }).then((transactionData) => {
          Staff.findAll({ where: { _kf_Station: kp_station } }).then(
            (staffData) => {
              console.log("kf kp", kp_station);
              console.log("kf kp", Name);

              console.log("Transaction No:", transactionData.length);
              if (!transactionData || transactionData.length === 0) {
                return res.status(404).json({
                  status: "fail",
                  message: "No transaction found",
                });
              }
              return res.status(200).json({
                status: "success",
                message: "all Transaction retieved successfull",
                data: transactionData,
              });
            }
          );
        });
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async getSCDailyJournalsByJournalId(req, res) {
    try {
      const journalId = req.params.journalId;
      Season.findOne(
        {
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
        },
        {
          where: { Default: 1 },
        }
      ).then((seasonData) => {
        const kp_season = seasonData.__kp_Season;
        const kp_station = req.user?.staff._kf_Station;

        Transaction.findAll({
          where: {
            _kf_Station: kp_station,
            _kf_Season: kp_season,
            // Assuming site_day_lot is the field containing the journal ID
            site_day_lot: journalId,
            status: 0,
          },
        }).then((transactionData) => {
          Staff.findAll({
            where: {
              _kf_Station: kp_station,
              __kp_Staff: transactionData.map(
                (transaction) => transaction._kf_Staff
              ),
            },
          }).then((staffData) => {
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
              data: transactionData,
              staffData,
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

      Season.findOne(
        {
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
        },
        {
          where: { Default: 1 },
        }
      ).then((seasonData) => {
        const kp_season = seasonData.__kp_Season;
        const kp_station = req.user?.staff._kf_Station;

        Transaction.findOne({
          where: {
            _kf_Station: kp_station,
            _kf_Season: kp_season,
            // status:0,
            id: id,
          },
        }).then((transactionData) => {
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
            data: transactionData,
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  static async removeTransaction(req, res) {
    try {
      const id = req.params.id;
      console.log("iddddd", id);

      Season.findOne(
        {
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
        },
        {
          where: { Default: 1 },
        }
      ).then((seasonData) => {
        const kp_season = seasonData.__kp_Season;
        const kp_station = req.user?.staff._kf_Station;

        Transaction.findOne({
          where: {
            _kf_Station: kp_station,
            _kf_Season: kp_season,
            status: 0,
            id: id,
          },
        }).then((transactionData) => {
          console.log("Transaction:", transactionData);

          if (!transactionData) {
            return res.status(404).json({
              status: "fail",
              message: "No transaction found",
            });
          }

          // Update the status to 1 (or any other desired value)
          transactionData
            .update({
              status: 1,
            })
            .then((updatedTransaction) => {
              return res.status(200).json({
                status: "success",
                message: "Transaction status updated successfully",
                data: updatedTransaction,
              });
            })
            .catch((error) => {
              return res.status(500).json({
                status: "fail",
                error: error.message,
              });
            });
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  static async updateTransaction(req, res) {
    try {
      const id = req.params.id;
      console.log("iddddd", id);

      Season.findOne(
        {
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
        },
        {
          where: { Default: 1 },
        }
      ).then((seasonData) => {
        const kp_season = seasonData.__kp_Season;
        const kp_station = req.user?.staff._kf_Station;

        Transaction.findOne({
          where: {
            _kf_Station: kp_station,
            _kf_Season: kp_season,
            id: id,
          },
        }).then((transactionData) => {
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
            bad_kilograms: req.body.bad_kilograms,
          };

          transactionData
            .update(dataToUpdate)
            .then((updatedData) => {
              return res.status(200).json({
                status: "success",
                message: "Transaction status updated successfully",
                data: updatedData,
              });
            })
            .catch((error) => {
              return res.status(500).json({
                status: "fail",
                error: error.message,
              });
            });
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  static async approveJournal(req, res) {
    try {
      const journalId = req.params.journalId;
      console.log("site", journalId);
      const _kp_Log = generateRandomString(32);
      const seasonData = await Season.findOne({
        attributes: ["__kp_Season"],
        order: [["id", "DESC"]],
        raw: true,
        limit: 1,
        where: { Default: 1 },
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
          approved: 0,
        },
      });

      if (!journalToApprove || journalToApprove.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "This Journal is already approved!!!!",
        });
      }

      const dataToUpdate = {
        __Kp_Log: _kp_Log,
        // recordId: req.body.unitprice,
        approved: 1,
        approved_at: Date.now(),
        // approved_by:req.body.approved_by,
        uploaded_at: Date.now(),
      };

      await Promise.all(
        journalToApprove.map((journal) => journal.update(dataToUpdate))
      );

      return res.status(200).json({
        status: "success",
        message: "Jounal approved successfully !!!",
        data: journalToApprove,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  static async addCommissions(req, res) {
    try {
      // Create a new entry in the Mobile_App table

      const commissions = new Day_lot({
        created_at: req.body.created_at,
        created_by: req.body.created_by,
        _kf_Supplier: req.body._kf_Supplier,
        _kf_Station: req.body._kf_Station,
        day_lot_number: req.body.day_lot_number,
        UserID: req.body.UserID,
        site_day_lot: req.body.site_day_lot,
        site_cherry_kgs: req.body.site_cherry_kgs,
        site_cherry_price: req.body.site_cherry_price,
        site_Floater_kgs: req.body.site_Floater_kgs,
        site_Floater_price: req.body.site_Floater_price,
        // commission_price : req.body.commission_price,
        transport_fees: req.body.transport_fees,
        commission_fees: req.body.commission_fees,
        floater_transport_fee: req.body.floater_transport_fee,
        // cherry_transport_fees: req.body.cherry_transport_fees,
        site_total_payment: req.body.site_total_payment,
        status: 0,
      });
      await commissions.save();

      res.status(200).json({
        success: true,
        message: "commissions added successfully",
        data: commissions,
      });
    } catch (error) {
      console.error("Error adding commissions:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }

 

  static async getWSCDailyJournalsByDate(req, res) {
    try {
      const cherryLotId = req.params.cherryLotId;
      Season.findOne(
        {
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
        },
        {
          where: { Default: 1 },
        }
      ).then((seasonData) => {
        const kp_season = seasonData.__kp_Season;
        const kp_station = req.user?.staff._kf_Station;

        Transaction.findAll({
          where: {
            _kf_Station: kp_station,
            _kf_Season: kp_season,
            // Assuming site_day_lot is the field containing the journal ID
            cherry_lot_id: cherryLotId,
            // status: 0
          },
        }).then((transactionData) => {
          Staff.findAll({
            where: {
              _kf_Station: kp_station,
              __kp_Staff: transactionData.map(
                (transaction) => transaction._kf_Staff
              ),
            },
          }).then((staffData) => {
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
              data: transactionData,
              staffData,
            });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

// add transaction bucket

    static async AddTransactionBucket(req, res){
        let cert;
        let sts;
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
        const kp_supplier = req.user?.staff._kf_Supplier;
        const UserID = req.user.user.id;
        const {bucket_a,bucket_b,bucket_c,day_lot,certified} = req.body;
        if(certified == 1){
      cert = 'Certified';
            sts = 0;
        }else{
            cert = 'Uncertified';
            sts = 1;
        }
        try {
            const bucketData = await Bucket.findAll({where:{day_lot_number:day_lot}});
            console.log("bucket hhughyrfhguerhguierhuuth", bucketData)
            console.log("bucket ", bucketData.length, cert,sts)
            console.log("dfsggsffs ", req.body)
            if(!bucketData || bucketData.length === 0){ 

                const bucketnumber = await Bucket.create ({
                    created_at:Date.now(),
                    created_by:UserID,
                    _kf_Supplier:kp_supplier,
                    _kf_Station:kp_station,
                    _kf_Season:kp_season,
                    day_lot_number:day_lot,
                    bucketA:bucket_a,
                    bucketB:bucket_b,
                    bucketC:bucket_c,
                    status:sts,
                    certification:cert
                }) 
            console.log("buckett",bucketnumber)

                return res.status(200).json({
                    status: "success",
                    message: "Bucket data inserted successfully !!!",
                    data: bucketnumber 
                });
            }
            const col = { 
                created_at:Date.now(),
                created_by:UserID,
                bucketA:bucket_a,
                bucketB:bucket_b,
                bucketC:bucket_c,
                status:sts,
                certification:cert
            };


            // const bucketUpdate = await Bucket.update(col,{where:{day_lot_number:day_lot}})

            await Promise.all(bucketData.map(bucketWeight => bucketWeight.update(col)))
            return res.status(200).json({
            status: "success",
            message: "Bucket data updated successfully !!!",
            data: bucketData
        });
        } catch (error) {
            return res.status(500).json({ status: "fail", error: error.message });
        }
    }

   
    /*
            Add transaction bucket weight
    */
    static async TransactionBucketWeight(req, res){
        try {
            let gradeCTaken = 0;
            let gradeBTaken = 0;
            let gradeATaken = 0;
            let TakenX = 0;
            let cert;
            let sts;
            const {taken_c,grade_c,taken_b,grade_b,taken_a,grade_a,day_lot,certified} = req.body;
            if((taken_a == 'before') || (taken_b == 'before') || (taken_c =='before')){
                TakenX = 0.55
            }else{ 
                TakenX = 0.45 
            }
            gradeATaken = grade_a - (1.2*(TakenX - 0.12) * grade_a);
            gradeBTaken = grade_b - (1.2*(TakenX - 0.12) * grade_b);
            gradeCTaken = grade_c - (1.2*(TakenX - 0.12) * grade_c);
            if(certified == 1){ 
                cert = 'Certified';
                sts = 0;
            }else{ 
                cert = 'Uncertified'; 
                sts = 1;
            }
            const dry =  await Dry.findAll({where:{day_lot_number:day_lot}});
            console.log("dry",dry) 
            if(!dry || dry.length=== 0){
                const saveDry = await Dry.create({
                    created_at:Date.now(),
                    certification:cert,
                    day_lot_number:day_lot,
                    GradeA:grade_a,
                    GradeB:grade_b,
                    GradeC:grade_c,
                    status:sts,
                    outturn:0,
                    moistureA:0,
                    moistureB:0,
                    moistureC:0,
                    gradeATaken:taken_a,
                    gradeBTaken:taken_b,
                    gradeCTaken:taken_c,
                    FinalGradeA:gradeATaken,
                    FinalGradeB:gradeBTaken,
                    FinalGradeC:gradeCTaken
                })
                console.log("save",saveDry)
                return res.status(200).json({ status: "success", data: saveDry });
            }
            const col = {
                created_at:Date.now(),
                certification:cert,
                GradeA:grade_a,
                GradeB:grade_b,
                GradeC:grade_c,
                status:sts,
                outturn:0,
                moistureA:0,
                moistureB:0,
                moistureC:0,
                gradeATaken:taken_a,
                gradeBTaken:taken_b,
                gradeCTaken:taken_c,
                FinalGradeA:gradeATaken,
                FinalGradeB:gradeBTaken,
                FinalGradeC:gradeCTaken
            };
            console.log("columns",col)
            const UpdateDry = await Dry.update(col,{where:{day_lot_number:day_lot}})
            console.log("dfgjern",UpdateDry)
            return res.status(200).json({
                status: "success",
                message: "Bucket data updated successfully !!!",
                data: UpdateDry 
            });
            
        } catch (error) {
            return res.status(500).json({ status: "fail", error: error.message });

        }
    }

//all buckets weighting
static async getAllBucketWeighting(req,res){
  try{
      const allBuckets = await Dry.findAll()
      if(!allBuckets || allBuckets.length === 0)
    
      {
       
          return res.status(404).json({
              status:"fail",
              message:"no no bucket found",
              
          })
      }
      return res.status(200).json({
          status:"success",
          message:"all buckets retieved successfullt",
          data:allBuckets
      })

  } catch(error)
  {
      return res.status(500).json({ status: "fail", error: error.message });

  }

  }


    /*##############################################
            Close and Submit Transaction
    ################################################*/
    
    static async CloseAndSubmitTransaction(req, res){
        try {
            
        } catch (error) {
            
        }
    }



}

export default CoffeePurchaseController;
