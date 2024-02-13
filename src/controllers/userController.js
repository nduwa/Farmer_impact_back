import { Op } from "sequelize";
import Users from "../models/rtc_users";
import userValidationSchema from "../validations/userValidations";
import bcrypt from "bcrypt";

class UserController {
  //user creation/signup/adding or registering a user
  static async createUser(req, res) {
    try {
      //   user validation

      // console.log(req.body);
      const { error } = userValidationSchema.validate(req.body);

      if (error)
        return res.status(400).json({
          status: "fail",
          validationError: error.details[0].message,
        });

      const checkduplicatedEmail = await Users.findOne({
        where: {
          [Op.or]: [{ Email: req.body.email }, { Phone: req.body.Phone }],
        },
      });
      // console.log(checkduplicatedEmail);
      if (checkduplicatedEmail) {
        return res.status(400).json({
          status: "fail",
          message: `User with ${req.body.Email} already exist`,
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

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
        Email: req.body.email,
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

  //logging in with username and password
  static async login(req, res) {
    try {
      const user = await Users.findOne({ Name_User: req.body.Name_User });
      console.log("user name", user);
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
      console.log("password", req.body.password);
      console.log("user password", user.password);
      console.log("valid", validPassword);

      if (!validPassword) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid  password",
        });
      }

      // create token

      const token = Jwt.sign(
        {
          user: {
            Name_User: user.Name_User,
          },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        token: token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  }
}

export default UserController;
