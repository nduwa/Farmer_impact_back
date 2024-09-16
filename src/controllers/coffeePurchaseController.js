import Transaction from "../models/rtc_transaction";
import Staff from "../models/rtc_staff";
import Season from "../models/rtc_seasons";
import Day_lot from "../models/rtc_day_lot_data";
import Bucket from "../models/bucketing";
import Dry from "../models/rtc_drying";
import generateUUID from "../helpers/randomStringGenerator";
import Lock_cherries from "../models/rtc_lock_cherry_lot";
class CoffeePurchaseController {
  //get all transactions/journals
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
        if (Role === "System Admin") {
          whereCondition = { _kf_Season: kp_season, status: 0 };
        } else {
          const kp_station = req.user?.staff?._kf_Station;
          whereCondition = {
            _kf_Station: kp_station,
            _kf_Season: kp_season,
            status: 0,
          };
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

  //get transactions by journal id
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

  //get transaction by id

  static async getTransactionById(req, res) {
    try {
      const id = req.params.id;
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
  //update transaction

  static async updateTransaction(req, res) {
    try {
      const id = req.params.id;

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
  //journal approval

  static async approveJournal(req, res) {
    try {
      const journalId = req.params.journalId;
      console.log("site", journalId);
      const _kp_Log = generateUUID();
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
  // save transaction commissions and transport fees

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

  static async AddTransactionBucket(req, res) {
    let cert;
    let sts;
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
    const kp_supplier = req.user?.staff._kf_Supplier;
    const UserID = req.user?.user.id;
    const { bucket_a, bucket_b, bucket_c, day_lot, certified } = req.body;
    if (certified == 1) {
      cert = "Certified";
      sts = 0;
    } else {
      cert = "Uncertified";
      sts = 1;
    }
    try {
      const bucketData = await Bucket.findAll({
        where: { day_lot_number: day_lot },
      });
      console.log("bucket hhughyrfhguerhguierhuuth", bucketData);
      console.log("bucket ", bucketData.length, cert, sts);
      console.log("dfsggsffs ", req.body);
      if (!bucketData || bucketData.length === 0) {
        const bucketnumber = await Bucket.create({
          created_at: Date.now(),
          created_by: UserID,
          _kf_Supplier: kp_supplier,
          _kf_Station: kp_station,
          _kf_Season: kp_season,
          day_lot_number: day_lot,
          bucketA: bucket_a,
          bucketB: bucket_b,
          bucketC: bucket_c,
          status: sts,
          certification: cert,
        });
        console.log("buckett", bucketnumber);

        return res.status(200).json({
          status: "success",
          message: "Bucket data inserted successfully !!!",
          data: bucketnumber,
        });
      }
      const col = {
        created_at: Date.now(),
        created_by: UserID,
        bucketA: bucket_a,
        bucketB: bucket_b,
        bucketC: bucket_c,
        status: sts,
        certification: cert,
      };

      // const bucketUpdate = await Bucket.update(col,{where:{day_lot_number:day_lot}})

      await Promise.all(
        bucketData.map((bucketWeight) => bucketWeight.update(col))
      );
      return res.status(200).json({
        status: "success",
        message: "Bucket data updated successfully !!!",
        data: bucketData,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  /*
            Add transaction bucket weight
    */
  static async TransactionBucketWeight(req, res) {
    try {
      let gradeCTaken = 0;
      let gradeBTaken = 0;
      let gradeATaken = 0;
      let TakenX = 0;
      let cert;
      let sts;
      const {
        taken_c,
        grade_c,
        taken_b,
        grade_b,
        taken_a,
        grade_a,
        day_lot,
        certified,
      } = req.body;
      console.log("bodyy", req.body);
      if (taken_a == "before" || taken_b == "before" || taken_c == "before") {
        TakenX = 0.55;
      } else {
        TakenX = 0.45;
      }
      gradeATaken = grade_a - 1.2 * (TakenX - 0.12) * grade_a;
      gradeBTaken = grade_b - 1.2 * (TakenX - 0.12) * grade_b;
      gradeCTaken = grade_c - 1.2 * (TakenX - 0.12) * grade_c;
      if (certified == 1) {
        cert = "Certified";
        sts = 0;
      } else {
        cert = "Uncertified";
        sts = 1;
      }

      const dry = await Dry.findAll({ where: { day_lot_number: day_lot } });
      console.log("dry", dry);
      if (!dry || dry.length === 0) {
        const saveDry = await Dry.create({
          created_at: Date.now(),
          created_by:req.user?.user?.id,
          certification: cert,
          day_lot_number: day_lot,
          GradeA: grade_a,
          GradeB: grade_b,
          GradeC: grade_c,
          status: sts,
          outturn: 0,
          moistureA: 0,
          moistureB: 0,
          moistureC: 0,
          gradeATaken: taken_a,
          gradeBTaken: taken_b,
          gradeCTaken: taken_c,
          FinalGradeA: gradeATaken,
          FinalGradeB: gradeBTaken,
          FinalGradeC: gradeCTaken,
        });

        let lot_weight = 0;

        const transactions = await Transaction.findAll({
          where: {
            cherry_lot_id: day_lot,
          },
        });
        transactions.forEach((row) => {
          lot_weight +=
            parseFloat(row.kilograms) + parseFloat(row.bad_kilograms);
        });
        if (transactions) {
          transactions.forEach(async (transaction) => {
            console.log("Transaction ID:", transaction.id);
            console.log("Transaction Kilograms:", transaction.kilograms);
            console.log(
              "Transaction Bad Kilograms:",
              transaction.bad_kilograms
            );
            console.log("Lot Weight:", lot_weight);

            let updateData = {};

            let tr_grade_a, tr_grade_b, tr_grade_c;
            // if (transaction.bad_kilograms === 0) {
            updateData = {
              gradeA: (grade_a * transaction.kilograms) / lot_weight,
              gradeB: (grade_b * transaction.kilograms) / lot_weight,
              gradeC: (grade_c * transaction.kilograms) / lot_weight,
            };
            // } else {
            // updateData = {
            //   gradeA: 0,
            //   gradeB: 0,
            //   gradeC: grade_c * transaction.bad_kilograms / lot_weight

            // }

            // }

            console.log("Update Data:", updateData);

            // Update the transaction in the database
            try {
              await Transaction.update(updateData, {
                where: { id: transaction.id }, // Adjust the where condition as needed
              });
              console.log(
                `Transaction ${transaction.id} updated successfully.`
              );
            } catch (error) {
              console.error(
                `Error updating transaction ${transaction.id}:`,
                error.message
              );
            }
          });
        }

        // let lot_weight = 0;
        // let tr_grade_a, tr_grade_b, tr_grade_c;

        // Transaction.findAndCountAll({
        //   where: {
        //     cherry_lot_id: day_lot
        //   }
        // }).then(data => {
        //   const { count, rows } = data;
        //   console.log('Data:', count);

        //   if (rows && rows.length > 0) {
        //     rows.forEach(row => {
        //       let column = {}
        //       lot_weight += (parseFloat(row.kilograms)) + (parseFloat(row.bad_kilograms));
        //       console.log('lotWeight:', lot_weight);

        //       if (row.bad_kilograms === 0) {
        //         tr_grade_a = grade_a * row.kilograms / lot_weight;
        //         tr_grade_b = grade_b * row.kilograms / lot_weight;
        //         tr_grade_c = grade_c * row.kilograms / lot_weight;
        //       } else {
        //         tr_grade_a = 0;
        //         tr_grade_b = 0;
        //         tr_grade_c = grade_c * row.bad_kilograms / lot_weight;
        //       }

        //       console.log("kilogramas", row.kilograms);
        //       console.log("bad kilograa", row.bad_kilograms);

        //        column = {
        //         gradeA: tr_grade_a,
        //         gradeB: tr_grade_b,
        //         gradeC: tr_grade_c
        //       };

        //       Transaction.update(column, {
        //         where: {
        //           cherry_lot_id: day_lot
        //         }
        //       }).then(updatedTransactions => {
        //         console.log('Updated transactions:', updatedTransactions);
        //       }).catch(error => {
        //         console.error('Error updating transactions:', error.message, lot_weight);
        //       });
        //     });
        //   } else {
        //     console.log('No rows found.');
        //   }
        // }).catch(error => {
        //   console.error('Error fetching data:', error);
        // });

        console.log("save", saveDry.GradeA);
        return res.status(200).json({ status: "success", data: saveDry , message:"Bucket weight Added successfully !!!" });
      }
      const col = {
        created_at: Date.now(),
        created_by:req.user?.user?.id,
        certification: cert,
        GradeA: grade_a,
        GradeB: grade_b,
        GradeC: grade_c,
        status: sts,
        outturn: 0,
        moistureA: 0,
        moistureB: 0,
        moistureC: 0,
        gradeATaken: taken_a,
        gradeBTaken: taken_b,
        gradeCTaken: taken_c,
        FinalGradeA: gradeATaken,
        FinalGradeB: gradeBTaken,
        FinalGradeC: gradeCTaken,
      };
      console.log("columns", col.GradeA);
      const UpdateDry = await Dry.update(col, {
        where: { day_lot_number: day_lot },
      });
      let lot_weight = 0;

      const transactions = await Transaction.findAll({
        where: {
          cherry_lot_id: day_lot,
        },
      });
      if (transactions) {
        transactions.forEach(async (transaction) => {
          lot_weight +=
            parseFloat(transaction.kilograms) +
            parseFloat(transaction.bad_kilograms);

          let updateData = {};

          let tr_grade_a, tr_grade_b, tr_grade_c;
          // if (row.bad_kilograms === 0) {
          updateData = {
            gradeA: (grade_a * transaction.kilograms) / lot_weight,
            gradeB: (grade_b * transaction.kilograms) / lot_weight,
            gradeC: (grade_c * transaction.kilograms) / lot_weight,
          };
          // } else {
          //   updateData = {
          //     gradeA: 0,
          //     gradeB: 0,
          //     gradeC: grade_c * transaction.bad_kilograms / lot_weight

          //   }

          // }

          console.log("Update Data:", updateData);

          // Update the transaction in the database
          try {
            await Transaction.update(updateData, {
              where: { id: transaction.id }, // Adjust the where condition as needed
            });
            console.log(`Transaction ${transaction.id} updated successfully.`);
          } catch (error) {
            console.error(
              `Error updating transaction ${transaction.id}:`,
              error.message
            );
          }
        });
      }
      // let transactionGrading, lot_weight = 0, kilograms, floaters, tr_grade_a, tr_grade_b, tr_grade_c;
      // Transaction.findAndCountAll({
      //   where: {
      //     cherry_lot_id: day_lot
      //   }
      // }).then(data => {
      //   const { count, rows } = data;
      //   console.log('Data:', count);

      //   if (rows && rows.length > 0) {
      //     rows.forEach(row => {
      //       let column ={}
      //       lot_weight += (parseFloat(row.kilograms)) + (parseFloat(row.bad_kilograms));
      //       console.log('lotWeight:', lot_weight);

      //       let tr_grade_a, tr_grade_b, tr_grade_c;
      //       if (row.bad_kilograms === 0) {
      //         tr_grade_a = grade_a * row.kilograms / lot_weight;
      //         tr_grade_b = grade_b * row.kilograms / lot_weight;
      //         tr_grade_c = grade_c * row.kilograms / lot_weight;
      //       } else {
      //         tr_grade_a = 0;
      //         tr_grade_b = 0;
      //         tr_grade_c = grade_c * row.bad_kilograms / lot_weight;
      //       }

      //       console.log("kilogramas", row.kilograms);
      //       console.log("bad kilooo",row.bad_kilograms)
      //        column = {
      //         gradeA: tr_grade_a,
      //         gradeB: tr_grade_b,
      //         gradeC: tr_grade_c
      //       };

      //       Transaction.update(column, {
      //         where: {
      //           id: row.id
      //         }
      //       }).then(updatedTransactions => {
      //         console.log('Updated transactions:', updatedTransactions);
      //       }).catch(error => {
      //         console.error('Error updating transactions:', error.message, lot_weight);
      //       });
      //     });
      //   } else {
      //     console.log('No rows found.');
      //   }
      // }).catch(error => {
      //   console.error('Error fetching data:', error);
      // });

      console.log("dfgjern", UpdateDry);
      return res.status(200).json({
        status: "success",
        message: "Bucket data updated successfully !!!",
        data: UpdateDry,
        // transactions:data
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  //all buckets weighting
  static async getAllBucketWeighting(req, res) {
    try {
      const allBuckets = await Dry.findAll();
      if (!allBuckets || allBuckets.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "no no bucket found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "all buckets retieved successfullt",
        data: allBuckets,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  /*##############################################
            Close and Submit Transaction
    ################################################*/

  static async GeneralHarvest(req, res) {
    let station = "";
    let season = "";

    try {
      if (!station) {
        const seasonData = await Season.findOne({
          attributes: ["__kp_Season"],
          order: [["id", "DESC"]],
          raw: true,
          limit: 1,
          where: { Default: 1 },
        });

        season = seasonData.__kp_Season;
      }

      let transactionData, farmerData, groupData, householdData;

      if (station) {
        transactionData = await Transaction.findAll({
          where: {
            _kf_Season: season,
            _kf_Station: station,
          },
        });

        farmerData = await Farmers.findAll({
          where: {
            _kf_Station: station,
          },
        });

        groupData = await Groups.findAll({
          where: {
            _kf_Station: station,
          },
        });

        householdData = await Household.findAll({
          where: {
            _kf_Station: station,
          },
        });
      } else {
        transactionData = await Transaction.findAll({
          where: {
            _kf_Season: season,
          },
        });

        farmerData = await Farmers.findAll();
        groupData = await Groups.findAll();
        householdData = await Household.findAll();
      }

      // Combine all arrays into one
      const combinedData = [
        ...transactionData,
        ...farmerData,
        ...groupData,
        ...householdData,
      ];
      console.log("Combined Data:", combinedData);
      return res.status(200).json({
        status: "success",
        message: "Harverst retrived successfully !!!",
        data: combinedData,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}
export default CoffeePurchaseController;
