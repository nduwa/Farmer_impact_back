import dotenv from "dotenv";
dotenv.config();

// Send email notification
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'File Maker data to Dashboard',
    text: 'Data from JSON API has been successfully inserted into the database.'
};

module.exports = mailOptions;
