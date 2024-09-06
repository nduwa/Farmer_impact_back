import mailOptions from '../database/mailOption';
import transporter from '../database/mailConfig';
import Group from '../models/rtc_groups';
import Farmer from '../models/rtc_farmers';
import Household from '../models/rtc_households';
import Evaluation from '../models/rtc_evaluations';
import Inspection from '../models/rtc_inspections';
import Attendance from '../models/rtc_training_attendance';

class DashboardtoFM {
    // Replace non-alphabetic characters with spaces for specific columns
    static sanitizeData(data, columns) {
        return Object.entries(data).reduce((acc, [key, value]) => {
            if (columns.includes(key) && typeof value === 'string') {
                acc[key] = value.replace(/[^a-zA-Z]/g, ' '); // Only sanitize specific columns
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});
    }

    // Fetch and process data with optional filtering by conditions and sanitization
    static async fetchData(model, page, condition = {}, columnsToSanitize = []) {
        const limit = 1000;
        const offset = (page - 1) * limit;

        const results = await model.findAll({ where: condition, limit, offset });
        const count = await model.count({ where: condition });
        const totalPages = Math.ceil(count / limit);

        return {
            data: results.map(record => DashboardtoFM.sanitizeData(record.dataValues, columnsToSanitize)),
            count,
            totalPages,
        };
    }

    // Main function to handle data push
    static async PushAllFMData(req, res) {
        const page = parseInt(req.query.page) || 1;
        const type = req.query.type;

        const models = {
            group: { 
                model: Group, 
                condition: { Active: '1' }, 
                columns: ['Name'] 
            },
            farmer: { 
                model: Farmer, 
                condition: { type: 'offline' }, 
                columns: ['Name', 'created_by'] 
            },
            household: { 
                model: Household, 
                condition: { status: 'active' }, 
                columns: ['Area_Small', 'z_Farmer_Primary'] 
            },
            evaluation: { 
                model: Evaluation, 
                condition: {}, 
                columns: [] 
            },
            inspection: { 
                model: Inspection, 
                condition: {}, 
                columns: [] 
            },
            attendance: { 
                model: Attendance, 
                condition: {}, 
                columns: [] 
            },
        };

        try {
            const results = {};
            let emailMessage = `Data push results for page ${page}:\n\n`;

            // Fetch data for the specified type or all types
            for (const [key, { model, condition, columns }] of Object.entries(models)) {
                if (!type || type === key) {
                    const result = await DashboardtoFM.fetchData(model, page, condition, columns);
                    results[key] = result.data;

                    // Update email message with record count, page, and total pages info
                    emailMessage += `${key.charAt(0).toUpperCase() + key.slice(1)} records: ${result.count} (Page ${page} of ${result.totalPages})\n`;
                }
            }

            // Send the email with the record counts, page number, and total pages
            await DashboardtoFM.sendEmail(emailMessage);

            // Return JSON response with the fetched data
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error: error.message });
        }
    }

    // Send email notification with the record counts and page number
    static async sendEmail(message) {
        try {
            mailOptions.subject = 'FM Data Push';
            mailOptions.text = message;
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default DashboardtoFM;
