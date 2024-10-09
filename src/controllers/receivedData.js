import axios from 'axios';
import axiosRetry from 'axios-retry';
import transporter from '../database/mailConfig'; // Import nodemailer transporter
import mailOptions from '../database/mailOption'; // Import mail options
import Staff from '../models/rtc_staff';
import Users from '../models/rtc_users';
import Supplier from '../models/rtc_supplier';
import Station from '../models/rtc_station';
import Readings from '../models/rtc_readings';

class FMtoDashboard {

    static apiUrl = 'https://dashboard-api.farmerimpact.co.rw'; // Define the API URL

    // Configure axios to retry failed requests
    static configureAxiosRetry() {
        axiosRetry(axios, {
            retries: 5, // Increase number of retries
            retryDelay: retryCount => Math.min(retryCount * 1000, 5000), // Exponential backoff
            retryCondition: error => axiosRetry.isNetworkOrIdempotentRequestError(error),
        });
    }

    // Fetch data from API and update database
    static async GetAllFMData(req, res) {
        try {
            FMtoDashboard.configureAxiosRetry();

            const staffResult = await FMtoDashboard.getAllAndPushStaff();
            const userResult = await FMtoDashboard.getAllAndPushUser();
            const supplierResult = await FMtoDashboard.getAllAndPushSupplier();
            const stationResult = await FMtoDashboard.getAllAndPushStation();
            const readingResult = await FMtoDashboard.getAllAndPushReading();

            const successMessages = [ 
                ...supplierResult.successMessages, 
                ...stationResult.successMessages, 
                ...readingResult.successMessages,
                ...staffResult.successMessages,
                ...userResult.successMessages
            ];
            const failureMessages = [
                ...supplierResult.failureMessages, 
                ...stationResult.failureMessages, 
                ...readingResult.failureMessages,
                ...staffResult.failureMessages,
                ...userResult.failureMessages
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
                message: overallMessage,
                changes: {
                    supplierChanges: supplierResult.changes,
                    stationChanges: stationResult.changes,
                    readingChanges: readingResult.changes,
                    staffChanges: staffResult.changes,
                    userChanges: userResult.changes
                }
            }, null, 4); // 'null, 4' formats the JSON for readability with 4-space indentation

            await FMtoDashboard.sendEmailNotification(emailMessage);

            res.status(200).json({
                success: successMessages.length > 0,
                message: overallMessage,
                changes: {
                    supplierChanges: supplierResult.changes,
                    stationChanges: stationResult.changes,
                    readingChanges: readingResult.changes,
                    staffChanges: staffResult.changes,
                    userChanges: userResult.changes
                }
            });

        } catch (error) {
            console.error('Error pushing data:', error);

            const errorMessage = `Failed to push data. Error: ${error.message}`;

            // Prepare and send email notification with error message
            const emailMessage = JSON.stringify({
                success: false,
                message: errorMessage,
                changes: {
                    supplierChanges: { updated: 0, inserted: 0 },
                    stationChanges: { updated: 0, inserted: 0 },
                    readingChanges: { updated: 0, inserted: 0 },
                    staffChanges: { updated: 0, inserted: 0 },
                    userChanges: { updated: 0, inserted: 0 }
                }
            }, null, 4); // 'null, 4' formats the JSON for readability with 4-space indentation

            await FMtoDashboard.sendEmailNotification(emailMessage);

            res.status(500).json({
                success: false,
                message: errorMessage
            });
        }
    }

    // Fetch user data from API and update the database
    static async getAllAndPushUser() {
        let allUsers = [];
        let currentPage = 1;

        try {
            while (true) {
                try {
                    const response = await axios.get(`${FMtoDashboard.apiUrl}/users?page=${currentPage}`, { timeout: 30000 });
                    const users = response.data?.Users || [];

                    if (users.length === 0) break;

                    allUsers.push(...users);
                    currentPage++;
                } catch (error) {
                    console.error(`Error fetching user data from page ${currentPage}: ${error.message}`);
                    break; // Optionally break the loop if persistent errors occur
                }
            }

            if (allUsers.length === 0) {
                return { changes: { updated: 0, inserted: 0 }, successMessages: [], failureMessages: ['No user data found from API.'] };
            }

            // Remove duplicates within the fetched data
            const uniqueUserMap = new Map();
            allUsers.forEach(user => {
                if (!uniqueUserMap.has(user.__kp_User) || new Date(user.created_at) > new Date(uniqueUserMap.get(user.__kp_User).created_at)) {
                    uniqueUserMap.set(user.__kp_User, user);
                }
            });

            const uniqueUsers = Array.from(uniqueUserMap.values());

            // Fetch existing users from the database
            const existingUsers = await Users.findAll({ attributes: ['__kp_User', 'created_at', 'last_update_at'] });
            const existingUserMap = new Map();

            existingUsers.forEach(user => {
                if (!existingUserMap.has(user.__kp_User) || new Date(user.created_at) > new Date(existingUserMap.get(user.__kp_User).created_at)) {
                    existingUserMap.set(user.__kp_User, user);
                }
            });

            let updatedCount = 0;
            let insertedCount = 0;
            const failureMessages = [];
            const duplicateRemovalMessages = [];

            await Promise.all(uniqueUsers.map(async (user) => {
                try {
                    const existingRecord = existingUserMap.get(user.__kp_User);
                    const apiTimestamp = new Date(user.last_update_at);

                    if (existingRecord) {
                        const existingDate = new Date(existingRecord.last_update_at);
                        if (apiTimestamp > existingDate) {
                            await Users.update(user, { where: { __kp_User: user.__kp_User } });
                            updatedCount++;
                        }

                        // Remove older duplicates if needed
                        if (new Date(user.created_at) > new Date(existingRecord.created_at)) {
                            await Users.destroy({ where: { __kp_User: user.__kp_User, created_at: existingRecord.created_at } });
                            duplicateRemovalMessages.push(`Removed older duplicate for user ${user.__kp_User}`);
                        }

                    } else {
                        await Users.create(user);
                        insertedCount++;
                    }
                } catch (error) {
                    failureMessages.push(`Failed to process user ${user.__kp_User}: ${error.message}`);
                }
            }));

            return {
                changes: { updated: updatedCount, inserted: insertedCount },
                successMessages: [
                    `Updated ${updatedCount} user records`, 
                    `Inserted ${insertedCount} user records`,
                    ...duplicateRemovalMessages
                ].filter(msg => !msg.includes('0')),
                failureMessages
            };

        } catch (error) {
            return {
                changes: { updated: 0, inserted: 0 },
                successMessages: [],
                failureMessages: [`Failed to fetch or insert user data: ${error.message}`]
            };
        }
    }

    // Fetch staff data from API and update the database
    static async fetchDataWithRetry(url) {
        try {
            const response = await axios.get(url, { timeout: 60000 }); // Increased timeout
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch data from ${url}: ${error.message}`);
            throw error; // Re-throw the error after logging
        }
    }

    static async getAllAndPushStaff() {
        let allStaff = [];
        let currentPage = 1;

        try {
            FMtoDashboard.configureAxiosRetry();

            while (true) {
                try {
                    const url = `${FMtoDashboard.apiUrl}/staff?page=${currentPage}`;
                    const staffData = await FMtoDashboard.fetchDataWithRetry(url);
                    const staff = staffData?.staff || [];

                    if (staff.length === 0) break;

                    allStaff.push(...staff);
                    currentPage++;
                } catch (error) {
                    console.error(`Error fetching staff data from page ${currentPage}: ${error.message}`);
                    break; // Optionally break the loop if persistent errors occur
                }
            }

            if (allStaff.length === 0) {
                return { changes: { updated: 0, inserted: 0 }, successMessages: [], failureMessages: ['No staff data found from API.'] };
            }

            // Remove duplicates within the fetched data
            const uniqueStaffMap = new Map();
            allStaff.forEach(staff => {
                if (!uniqueStaffMap.has(staff.__kp_Staff) || new Date(staff.created_at) > new Date(uniqueStaffMap.get(staff.__kp_Staff).created_at)) {
                    uniqueStaffMap.set(staff.__kp_Staff, staff);
                }
            });

            const uniqueStaff = Array.from(uniqueStaffMap.values());

            // Fetch existing staff from the database
            const existingStaff = await Staff.findAll({ attributes: ['__kp_Staff', 'created_at', 'last_update_at'] });
            const existingStaffMap = new Map();

            existingStaff.forEach(staff => {
                if (!existingStaffMap.has(staff.__kp_Staff) || new Date(staff.created_at) > new Date(existingStaffMap.get(staff.__kp_Staff).created_at)) {
                    existingStaffMap.set(staff.__kp_Staff, staff);
                }
            });

            let updatedCount = 0;
            let insertedCount = 0;
            const failureMessages = [];
            const duplicateRemovalMessages = [];

            await Promise.all(uniqueStaff.map(async (staff) => {
                try {
                    const existingRecord = existingStaffMap.get(staff.__kp_Staff);
                    const apiTimestamp = new Date(staff.last_update_at);

                    if (existingRecord) {
                        const existingDate = new Date(existingRecord.last_update_at);
                        if (apiTimestamp > existingDate) {
                            await Staff.update(staff, { where: { __kp_Staff: staff.__kp_Staff } });
                            updatedCount++;
                        }

                        // Remove older duplicates if needed
                        if (new Date(staff.created_at) > new Date(existingRecord.created_at)) {
                            await Staff.destroy({ where: { __kp_Staff: staff.__kp_Staff, created_at: existingRecord.created_at } });
                            duplicateRemovalMessages.push(`Removed older duplicate for staff ${staff.__kp_Staff}`);
                        }

                    } else {
                        await Staff.create(staff);
                        insertedCount++;
                    }
                } catch (error) {
                    failureMessages.push(`Failed to process staff ${staff.__kp_Staff}: ${error.message}`);
                }
            }));

            return {
                changes: { updated: updatedCount, inserted: insertedCount },
                successMessages: [
                    `Updated ${updatedCount} staff records`, 
                    `Inserted ${insertedCount} staff records`,
                    ...duplicateRemovalMessages
                ].filter(msg => !msg.includes('0')),
                failureMessages
            };

        } catch (error) {
            return {
                changes: { updated: 0, inserted: 0 },
                successMessages: [],
                failureMessages: [`Failed to fetch or insert staff data: ${error.message}`]
            };
        }
    }
    // Fetch suppliers data from API and update the database
    static async getAllAndPushSupplier() {
        let allSuppliers = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${FMtoDashboard.apiUrl}/supplier?page=${currentPage}`, { timeout: 30000 });
                const suppliers = response.data?.Suppliers || [];

                if (suppliers.length === 0) break;

                allSuppliers.push(...suppliers);
                currentPage++;
            }

            if (allSuppliers.length === 0) {
                return { changes: { updated: 0, inserted: 0 }, successMessages: [], failureMessages: ['No suppliers data found from API.'] };
            }

            const existingSuppliers = await Supplier.findAll({ attributes: ['__kp_Supplier', 'z_recModifyTimestamp'] });
            const existingSupplierMap = new Map(existingSuppliers.map(supplier => [supplier.__kp_Supplier, supplier.z_recModifyTimestamp]));

            let updatedCount = 0;
            let insertedCount = 0;
            const failureMessages = [];

            await Promise.all(allSuppliers.map(async (supplier) => {
                try {
                    const existingTimestamp = existingSupplierMap.get(supplier.__kp_Supplier);
                    const apiTimestamp = new Date(supplier.z_recModifyTimestamp);

                    if (existingTimestamp) {
                        const existingDate = new Date(existingTimestamp);
                        if (apiTimestamp > existingDate) {
                            await Supplier.update(supplier, { where: { __kp_Supplier: supplier.__kp_Supplier } });
                            updatedCount++;
                        }
                    } else {
                        await Supplier.create(supplier);
                        insertedCount++;
                    }
                } catch (error) {
                    failureMessages.push(`Failed to process supplier ${supplier.__kp_Supplier}: ${error.message}`);
                }
            }));

            return {
                changes: { updated: updatedCount, inserted: insertedCount },
                successMessages: [`Updated ${updatedCount} suppliers`, `Inserted ${insertedCount} suppliers`].filter(msg => !msg.includes('0')),
                failureMessages
            };

        } catch (error) {
            return {
                changes: { updated: 0, inserted: 0 },
                successMessages: [],
                failureMessages: [`Failed to fetch or insert suppliers data: ${error.message}`]
            };
        }
    }

    // Fetch stations data from API and update the database
    static async getAllAndPushStation() {
        let allStations = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${FMtoDashboard.apiUrl}/station?page=${currentPage}`, { timeout: 30000 });
                const stations = response.data?.Stations || [];

                if (stations.length === 0) break;

                allStations.push(...stations);
                currentPage++;
            }

            if (allStations.length === 0) {
                return { changes: { updated: 0, inserted: 0 }, successMessages: [], failureMessages: ['No stations data found from API.'] };
            }

            const existingStations = await Station.findAll({ attributes: ['__kp_Station', 'updated_at'] });
            const existingStationMap = new Map(existingStations.map(station => [station.__kp_Station, station.updated_at]));

            let updatedCount = 0;
            let insertedCount = 0;
            const failureMessages = [];

            await Promise.all(allStations.map(async (station) => {
                try {
                    const existingTimestamp = existingStationMap.get(station.__kp_Station);
                    const apiTimestamp = new Date(station.updated_at);

                    if (existingTimestamp) {
                        const existingDate = new Date(existingTimestamp);
                        if (apiTimestamp > existingDate) {
                            await Station.update(station, { where: { __kp_Station: station.__kp_Station } });
                            updatedCount++;
                        }
                    } else {
                        await Station.create(station);
                        insertedCount++;
                    }
                } catch (error) {
                    failureMessages.push(`Failed to process station ${station.__kp_Station}: ${error.message}`);
                }
            }));

            return {
                changes: { updated: updatedCount, inserted: insertedCount },
                successMessages: [`Updated ${updatedCount} stations`, `Inserted ${insertedCount} stations`].filter(msg => !msg.includes('0')),
                failureMessages
            };

        } catch (error) {
            return {
                changes: { updated: 0, inserted: 0 },
                successMessages: [],
                failureMessages: [`Failed to fetch or insert stations data: ${error.message}`]
            };
        }
    }

    // Fetch readings data from API and update the database
    static async getAllAndPushReading() {
        let allReadings = [];
        let currentPage = 1;

        try {
            while (true) {
                try {
                    const response = await axios.get(`${FMtoDashboard.apiUrl}/readings?page=${currentPage}`, { timeout: 30000 });
                    const readings = response.data?.Readings || [];

                    if (readings.length === 0) break;

                    allReadings.push(...readings);
                    currentPage++;
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        // Handle 404 specifically
                        throw new Error('Readings API endpoint not found (404)');
                    } else {
                        throw error; // Re-throw other errors
                    }
                }
            }

            if (allReadings.length === 0) {
                return { changes: { updated: 0, inserted: 0 }, successMessages: [], failureMessages: ['No readings data found from API.'] };
            }

            const existingReadings = await Readings.findAll({ attributes: ['__kp_Reading', 'modified_at'] });
            const existingReadingMap = new Map(existingReadings.map(reading => [reading.__kp_Reading, reading.modified_at]));

            let updatedCount = 0;
            let insertedCount = 0;
            const failureMessages = [];

            await Promise.all(allReadings.map(async (reading) => {
                try {
                    const existingTimestamp = existingReadingMap.get(reading.__kp_Reading);
                    const apiTimestamp = new Date(reading.modified_at);

                    if (existingTimestamp) {
                        const existingDate = new Date(existingTimestamp);
                        if (apiTimestamp > existingDate) {
                            await Readings.update(reading, { where: { __kp_Reading: reading.__kp_Reading } });
                            updatedCount++;
                        }
                    } else {
                        await Readings.create(reading);
                        insertedCount++;
                    }
                } catch (error) {
                    failureMessages.push(`Failed to process reading ${reading.__kp_Reading}: ${error.message}`);
                }
            }));

            return {
                changes: { updated: updatedCount, inserted: insertedCount },
                successMessages: [`Updated ${updatedCount} readings`, `Inserted ${insertedCount} readings`].filter(msg => !msg.includes('0')),
                failureMessages
            };

        } catch (error) {
            return {
                changes: { updated: 0, inserted: 0 },
                successMessages: [],
                failureMessages: [`Failed to fetch or insert readings data: ${error.message}`]
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
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default FMtoDashboard;