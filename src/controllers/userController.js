import { Op } from "sequelize";
import Users from "../models/rtc_users";
import userValidationSchema from "../validations/userValidations";
import loginValidationSchema from "../validations/loginValidation";
import bcrypt from "bcrypt";

import { generateRandomString } from "../helpers/randomStringGenerator";
import Staff from '../models/rtc_staff'
import * as dotenv from "dotenv";
import generateToken from "../helpers/generateToken";
dotenv.config();

class UserController {
  //user creation/signup/adding or registering a user
  static async createUser(req, res) {
    try {
      console.log(req.body);
      const { error } = userValidationSchema.validate(req.body);

      if (error)
        return res.status(400).json({
          status: "fail",
          validationError: error.details[0].message,
        });

      const checkduplicatedEmail = await Users.findOne({
        where: {
          [Op.or]: [{ Email: req.body.Email }, { Phone: req.body.Phone }],
        },
      });
      console.log(checkduplicatedEmail);
      if (checkduplicatedEmail) {
        return res.status(400).json({
          status: "fail",
          message: `User with ${req.body.Email} already exist`,
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // const __kp_User = generateRandomString(32);
      // const _kf_Location = generateRandomString(32);

      const user = new Users({
        status: 0,
        __kp_User: req.body.__kp_User,
        _kf_Location: req.body._kf_Location,
        Name_Full: req.body.Name_Full,
        Name_User: req.body.Name_User,
        Role: req.body.Role,
        z_recCreateAccountName: req.body.z_recCreateAccountName,
        z_recCreateTimestamp: req.body.z_recCreateTimestamp,
        z_recModifyAccountName: req.body.z_recModifyAccountName,
        z_recModifyTimestamp: req.body.z_recModifyTimestamp,
        Phone: req.body.Phone,
        Phone_Airtime: req.body.Phone_Airtime,
        Email: req.body.Email,
        devicename: req.body.devicename,
        last_update_at: req.body.last_update_at,
        password: hashedPassword,
      });
      await user.save();

      res.status(200).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: error.message,
      });
      console.log(error);
    }
  }

  // update user
  static async updateUser (req,res){
    try{
const userId = req.params.userId
console.log("user is", userId)

const user = await Users.findOne({
  where: { id: userId },
});
if(!user)
{
  return res.status(404).json({
    status:"fail",
    message:`User with ID ${userId} not found`
  })
}


const hashedPassword = await bcrypt.hash(req.body.password, 10);
const __kp_User = generateRandomString(32);
const _kf_Location = generateRandomString(32);
await user.update({
  status: 0,
  __kp_User: __kp_User,
  _kf_Location: _kf_Location,
  Name_Full: req.body.Name_Full,
  Name_User: req.body.Name_User,
  Role: req.body.Role,
  z_recCreateAccountName: req.body.z_recCreateAccountName,
  z_recCreateTimestamp: req.body.z_recCreateTimestamp,
  z_recModifyAccountName: req.body.z_recModifyAccountName,
  z_recModifyTimestamp: req.body.z_recModifyTimestamp,
  Phone: req.body.Phone,
  Phone_Airtime: req.body.Phone_Airtime,
  Email: req.body.Email,
  devicename: req.body.devicename,
  last_update_at: req.body.last_update_at,
  password: hashedPassword,

})
res.status(200).json({
  status: "success",
  message: "User updated successfully",
  data: user,
});

    }catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
      console.log(error);
    }
  }
  //get all users from users table
  static async getAllUsers(req, res) {
    try {
      const users = await Users.findAll();
      console.log("users", users.length);
      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No users found" });
      }
      return res.status(200).json({ status: "success", data: users });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
  static async getAllStaff(req, res) {
    try {
      const staffs = await Staff.findAll();
      console.log("staff", staffs.length);
      if (!staffs || staffs.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: "No users found" });
      }
      return res.status(200).json({ status: "success", data: staffs });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  // get a single user by if
  static async getSingleUser (req,res){
    try{
      const userId = req.params.userId
      const user = await Staff.findOne({
        where: { id: userId },
      });
      if(!user)
      {
        return res.status(404).json({
          status:"fail",
          message:`User with ID ${userId} not found`
        })
      }
      
      return res.status(200).json({
        status:"Success",
        message:"User retrieved successfully",
        data:user
      })
    }catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
      console.log(error);
    }    

  }
  //logging in with username and password
  static async login(req, res) {
    try {
      const { error } = loginValidationSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          status: "fail",
          message: error.details[0].message,
        });
      const appLogin = req.query.appLogin || 0; 

      const user = await Users.findOne({
        where: { Name_User: req.body.Name_User },
      });
      if (!user) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid username",
        });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid  password",
        });
      }
      

      const kp_user =user.__kp_User
      const staff = await Staff.findOne({
        where: { _kf_User: kp_user },
      });
      
      if (!staff) {
        return res.status(404).json({
          status: 'fail',
          message: 'No staff found for the given user',
        });
      }
      

const token = generateToken(user,appLogin,staff)
      res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        token: token,
      });
    } catch (err) {
      console.error(errorr);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  }
}

export default UserController;
