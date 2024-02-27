import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const generateToken = (user,appLogin,staff) =>{
    const token = Jwt.sign(
        {
            user,
            staff
        },
        process.env.JWT_SECRET,
        {
          /* if app users logs in token expires in 6 months[180d], else 2 days[2d] */
          expiresIn:
            appLogin === 0
              ? process.env.TKN_EXPIRY_WEB
              : process.env.TKN_EXPIRY_APP,
        }
      );
    return token;
}
export default generateToken
