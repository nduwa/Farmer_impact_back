import axios from 'axios';
import axiosRetry from 'axios-retry';
import transporter from '../database/mailConfig'; 
import mailOptions from '../database/mailOption'; 
import PriceTrends from '../models/rtc_price_trends';
import Season from '../models/rtc_seasons';
import User from '../models/rtc_users';
import Staff from '../models/rtc_staff';
import Supplier from '../models/rtc_supplier';
import Station from '../models/rtc_station';
import Reading from '../models/rtc_readings'; 

class FMtoDashboard {

    static apiUrl = 'https://dashboard-api.farmerimpact.co.rw'; 

    // Configure axios to retry failed requests
    static configureAxiosRetry() {
        axiosRetry(axios, {
            retries: 5, 
            retryDelay: retryCount => Math.min(retryCount * 1000, 5000), 
            retryCondition: error => axiosRetry.isNetworkOrIdempotentRequestError(error),
        });
    }

    // Fetch all data and push to the database
    static async GetAllFMData(req, res) {
        try {
            FMtoDashboard.configureAxiosRetry();

            const [priceTrendsResult, seasonResult, userResult, staffResult, supplierResult, stationResult, readingResult] = await Promise.all([
                FMtoDashboard.getAllAndPushData('price_trends', PriceTrends, '__kp_Approval', 'z_recModifyTimestamp'),
                FMtoDashboard.getAllAndPushData('season', Season, '__kp_Season', 'z_recModifyTimestamp'),
                FMtoDashboard.getAllAndPushData('users', User, '__kp_User', 'last_update_at'),
                FMtoDashboard.getAllAndPushData('staff', Staff, '__kp_Staff', 'last_update_at'),
                FMtoDashboard.getAllAndPushData('supplier', Supplier, '__kp_Supplier', 'z_recModifyTimestamp'),
                FMtoDashboard.getAllAndPushData('station', Station, '__kp_Station', 'updated_at'),
                FMtoDashboard.getAllAndPushData('readings', Reading, '__kp_Reading', 'modified_at') 
            ]);

            const successMessages = [
                ...priceTrendsResult.successMessages,
                ...seasonResult.successMessages,
                ...userResult.successMessages,
                ...staffResult.successMessages,
                ...supplierResult.successMessages,
                ...stationResult.successMessages,
                ...readingResult.successMessages 
            ];

            const failureMessages = [
                ...priceTrendsResult.failureMessages,
                ...seasonResult.failureMessages,
                ...userResult.failureMessages,
                ...staffResult.failureMessages,
                ...supplierResult.failureMessages,
                ...stationResult.failureMessages,
                ...readingResult.failureMessages 
            ];

            let overallMessage = successMessages.length > 0
                ? `Data push completed successfully:\n${successMessages.join('\n')}`
                : 'Data push completed, but no new updates or insertions were made.';

            if (failureMessages.length > 0) {
                overallMessage += `\nHowever, some errors occurred:\n${failureMessages.join('\n')}`;
            }

            // Prepare the JSON-like structure for the email message
            const emailMessage = JSON.stringify({
                success: successMessages.length > 0,
                changes: {
                    priceTrendsChanges: priceTrendsResult.changes,
                    seasonChanges: seasonResult.changes,
                    userChanges: userResult.changes,
                    staffChanges: staffResult.changes,
                    supplierChanges: supplierResult.changes,
                    stationChanges: stationResult.changes,
                    readingChanges: readingResult.changes 
                },
                message: overallMessage
            }, null, 4); 

            await FMtoDashboard.sendEmailNotification(emailMessage); 

            res.status(200).json({
                success: successMessages.length > 0,
                changes: {
                    priceTrendsChanges: priceTrendsResult.changes,
                    seasonChanges: seasonResult.changes,
                    userChanges: userResult.changes,
                    staffChanges: staffResult.changes,
                    supplierChanges: supplierResult.changes,
                    stationChanges: stationResult.changes,
                    readingChanges: readingResult.changes 
                },
                message: overallMessage
            });

        } catch (error) {
            console.error('Error pushing data:', error);

            const errorMessage = `Failed to push data. Error: ${error.message}`;

            // Prepare and send email notification with error message
            const emailMessage = JSON.stringify({
                success: false,
                changes: {
                    priceTrendsChanges: { updated: 0, inserted: 0 },
                    seasonChanges: { updated: 0, inserted: 0 },
                    userChanges: { updated: 0, inserted: 0 },
                    staffChanges: { updated: 0, inserted: 0 },
                    supplierChanges: { updated: 0, inserted: 0 },
                    stationChanges: { updated: 0, inserted: 0 },
                    readingChanges: { updated: 0, inserted: 0 } 
                },
                message: errorMessage
            }, null, 4); 

            await FMtoDashboard.sendEmailNotification(emailMessage); 

            res.status(500).json({
                success: false,
                message: errorMessage
            });
        }
    }

    // Fetch and process data from API
    static async getAllAndPushData(endpoint, model, primaryKey, timestampField) {
        let allData = [];
        let currentPage = 1;
        const failureMessages = [];
        const successMessages = [];
        let updatedCount = 0;
        let insertedCount = 0;
        let duplicateCount = 0; 

        // Handle single timestamp field
        const getTimestamp = (item) => new Date(item[timestampField]).getTime();

        try {
            while (true) {
                try {
                    const response = await axios.get(`${FMtoDashboard.apiUrl}/${endpoint}?page=${currentPage}`, {
                        timeout: 60000 // Increase timeout to 60 seconds
                    });

                    if (!response || !response.data || !response.data.response || !response.data.response.data) {
                        console.error(`Error fetching ${endpoint} data from page ${currentPage}: Response data structure is unexpected`);
                        break;
                    }

                    const data = response.data.response.data || []; // Access the correct path to data

                    if (data.length === 0) break;

                    // Extract fieldData from each record
                    const extractedData = data.map(record => record.fieldData);

                    allData.push(...extractedData);
                    currentPage++;
                } catch (error) {
                    console.error(`Error fetching ${endpoint} data from page ${currentPage}: ${error.message}`);
                    break; // Optionally break the loop if persistent errors occur
                }
            }

            if (allData.length === 0) {
                return {
                    changes: { updated: 0, inserted: 0, duplicated: 0 },
                    successMessages: [],
                    failureMessages: [`No ${endpoint} data found from API.`]
                };
            }

            // Remove duplicates within the fetched data
            const uniqueDataMap = new Map();
            allData.forEach(item => {
                const existingItem = uniqueDataMap.get(item[primaryKey]);
                if (!existingItem || getTimestamp(item) > getTimestamp(existingItem)) {
                    uniqueDataMap.set(item[primaryKey], item);
                } else {
                    duplicateCount++; 
                }
            });

            const uniqueData = Array.from(uniqueDataMap.values());

            // Fetch existing data from the database
            const existingData = await model.findAll({ attributes: [primaryKey, timestampField] });
            const existingDataMap = new Map(existingData.map(record => [record[primaryKey], getTimestamp(record)]));

            await Promise.all(uniqueData.map(async (item) => {
                try {
                    const existingTimestamp = existingDataMap.get(item[primaryKey]);
                    const apiTimestamp = getTimestamp(item);

                    if (existingTimestamp) {
                        if (apiTimestamp > existingTimestamp) {
                            await model.update(item, { where: { [primaryKey]: item[primaryKey] } });
                            updatedCount++;
                        }
                    } else {
                        await model.create(item);
                        insertedCount++;
                    }
                } catch (error) {
                    failureMessages.push(`Failed to process ${endpoint.slice(0, -1)} ${item[primaryKey]}: ${error.message}`);
                }
            }));

            return {
                changes: { updated: updatedCount, inserted: insertedCount, duplicated: duplicateCount },
                successMessages: [
                    `Updated ${updatedCount} ${endpoint.slice(0, -1)} records`,
                    `Inserted ${insertedCount} ${endpoint.slice(0, -1)} records`,
                    `Removed ${duplicateCount} duplicate records` 
                ].filter(msg => !msg.includes('0')),
                failureMessages
            };

        } catch (error) {
            return {
                changes: { updated: 0, inserted: 0, duplicated: 0 },
                successMessages: [],
                failureMessages: [`Failed to fetch or insert ${endpoint} data: ${error.message}`]
            };
        }
    }

    // Send email notifications with JSON-like structure
    static async sendEmailNotification(message) {
        try {
            // Create a formatted email message with title
            const formattedMessage = `Data from FM to Dashboard:\n${message}`;

            mailOptions.subject = 'FM Post to Dashboard';
            mailOptions.text = formattedMessage;

            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent: ${info.response}`);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default FMtoDashboard;
