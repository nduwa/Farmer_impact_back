import dotenv from "dotenv";
dotenv.config();

// Send email notification
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TO,
  subject: "Data Inserted Successfully",
  text: "Data from JSON API has been successfully inserted into the database.",
  attachments: [],
};

module.exports = mailOptions;
