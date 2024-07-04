import axios from 'axios';
import Supplier from '../models/rtc_supplier'; // Replace with correct path to Supplier model
import Station from '../models/rtc_station'; // Replace with correct path to Station model
import Season from '../models/rtc_seasons'; // Replace with correct path to Season model
import Readings from '../models/rtc_readings'; // Import your Readings model
import Users from '../models/rtc_users'; // Import your Users model
import Staff from '../models/rtc_staff'; // Import your Staff model
import Roles from '../models/rtc_roles'; // Import your Roles model
import Farmer from '../models/rtc_farmers'; // Adjust path as per your project structure and model name
import Household from '../models/rtc_households'; 
import AccessControl from '../models/rtc_mobile_app_access_control'; 
import AppModules from '../models/rtc_mobile_app_modules';
import Evaluation from '../models/rtc_evaluations'; // Assuming Evaluation is the correct model name
import Translation from '../models/rtc_translations'; // Assuming Translation is the correct model name
import Training from '../models/rtc_training'; // Assuming Training is the correct model name
import Response from '../models/rtc_inspection_responses'; // Assuming Response is the correct model name
import Question from '../models/rtc_inspection_questions'; // Assuming Question is the correct model name
import Answer from '../models/rtc_inspection_answers'; // Assuming Answer is the correct model name
import transporter from '../database/mailConfig'; // Import your nodemailer transporter
import mailOptions from '../database/mailOption'; // Define your mailOptions

class DashboardFMController {
    static apiUrl = 'https://dashboard-api.farmerimpact.co.rw';
    static maxRetries = 3;
    static retryDelay = 6000; // milliseconds

    static axiosInstance = axios.create({
        baseURL: DashboardFMController.apiUrl,
        // You may need to adjust SSL/TLS settings or add additional configuration
        // For example, to ignore SSL validation (not recommended for production):
        // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    static async fetchAllAndPush(req, res) {
        try {
            const results = await Promise.all([
                DashboardFMController.fetchAllAndPushAccessControl(),
                DashboardFMController.fetchAllAndPushAppModule(),
                DashboardFMController.fetchAllAndPushSuppliers(),
                DashboardFMController.fetchAllAndPushReadings(),
                DashboardFMController.fetchAllAndPushStation(),
                DashboardFMController.fetchAllAndPushUsers(),
                DashboardFMController.fetchAllAndPushStaff(),
                DashboardFMController.fetchAllAndPushSeasons(),
                DashboardFMController.fetchAllAndPushRoles(),
                DashboardFMController.fetchAllAndPushHouseholds(),
                DashboardFMController.fetchAllAndPushFarmers(),
                DashboardFMController.fetchAllAndPushInspectionAnswer(),
                DashboardFMController.fetchAllAndPushInspectionQuestion(),
                DashboardFMController.fetchAllAndPushTraining(),
                DashboardFMController.fetchAllAndPushTranslation(),
                DashboardFMController.fetchAllAndPushEvaluation(),
                DashboardFMController.fetchAllAndPushInspectionResponse()
            ]);

            const successMessages = results.filter(result => result.success);
            const failureMessages = results.filter(result => !result.success);

            await DashboardFMController.sendCombinedEmailNotification(successMessages, failureMessages);
            res.status(200).json({ success: true, message: 'Data push process completed successfully.', results });
        } catch (error) {
            console.error('Error pushing data:', error);
            res.status(500).json({ success: false, message: 'Failed to push data.', error: error.message });
        }
    }

    static async fetchAllAndPushStation() {
        let allStations = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/station?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Stations found.') {
                    console.log(`No stations found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Stations)) {
                    console.error(`Invalid response data for stations on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for stations on page ${currentPage}. Ensure that the response contains an array named "Stations".`);
                }

                const stations = response.data.Stations;

                if (stations.length === 0) {
                    if (allStations.length > 0) {
                        console.log(`No more stations found on page ${currentPage}, but continuing as allStations already has data.`);
                    } else {
                        console.log(`No more stations found on page ${currentPage}, exiting loop.`);
                        break;
                    }
                }

                allStations.push(...stations);
                console.log(`Fetched ${stations.length} stations from page ${currentPage}`);

                currentPage++;
            }

            if (allStations.length === 0) {
                console.log('No stations data found from API.');
                return { success: false, message: 'No stations data found from API.' };
            }

            // Fetch existing station keys from the database
            const existingStationKeys = (await Station.findAll({
                attributes: ['__kp_Station']
            })).map(station => station.__kp_Station);

            // Filter out new stations that are not already in the database
            const newStations = allStations.filter(station => !existingStationKeys.includes(station.__kp_Station));

            // Bulk insert new stations into the database
            if (newStations.length > 0) {
                await Station.bulkCreate(newStations);
                console.log(`${newStations.length} new stations inserted successfully into the database table.`);
                return { success: true, message: `${newStations.length} new stations inserted successfully into the database table.` };
            } else {
                console.log('No new updated stations to insert into the database table.');
                return { success: false, message: 'No new updated stations to insert into the database table.' };
            }

        } catch (error) {
            console.error('Error fetching or inserting stations data:', error);
            return { success: false, message: 'Failed to fetch or insert stations data.', error: error.message };
        }
    }
    static async fetchAllAndPushSeasons() {
        let allSeasons = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/season?page=${currentPage}`);

                if (!response.data || response.data.message === 'No seasons found.') {
                    console.log(`No seasons found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Seasons)) {
                    console.error(`Invalid response data for seasons on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for seasons on page ${currentPage}. Ensure that the response contains an array named "Seasons".`);
                }

                const seasons = response.data.Seasons;

                if (seasons.length === 0) {
                    console.log(`No more seasons found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allSeasons.push(...seasons);
                console.log(`Fetched ${seasons.length} seasons from page ${currentPage}`);

                currentPage++;
            }

            if (allSeasons.length === 0) {
                console.log('No seasons data found from API.');
                return { success: false, message: 'No seasons data found from API.' };
            }

            // Fetch existing season keys from the database
            const existingSeasonKeys = (await Season.findAll({
                attributes: ['__kp_Season']
            })).map(season => season.__kp_Season);

            // Filter out new seasons that are not already in the database
            const newSeasons = allSeasons.filter(season => !existingSeasonKeys.includes(season.__kp_Season));

            // Bulk insert new seasons into the database
            if (newSeasons.length > 0) {
                await Season.bulkCreate(newSeasons);
                console.log(`${newSeasons.length} new seasons inserted successfully into the database table.`);
                return { success: true, message: `${newSeasons.length} new seasons inserted successfully into the database table.` };
            } else {
                console.log('No new updated seasons to insert into the database table.');
                return { success: false, message: 'No new updated seasons to insert into the database table.' };
            }

        } catch (error) {
            console.error('Error fetching or inserting seasons data:', error);
            return { success: false, message: 'Failed to fetch or insert seasons data.', error: error.message };
        }
    }
    static async fetchAllAndPushSuppliers() {
        let allSuppliers = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/supplier?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Suppliers found.') {
                    console.log(`No suppliers found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Suppliers)) {
                    console.error(`Invalid response data for suppliers on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for suppliers on page ${currentPage}. Ensure that the response contains an array named "Suppliers".`);
                }

                const suppliers = response.data.Suppliers;

                if (suppliers.length === 0) {
                    console.log(`No more suppliers found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allSuppliers.push(...suppliers);
                console.log(`Fetched ${suppliers.length} suppliers from page ${currentPage}`);

                currentPage++;
            }

            if (allSuppliers.length === 0) {
                console.log('No suppliers data found from API.');
                return { success: false, message: 'No suppliers data found from API.' };
            }

            // Fetch existing supplier keys and modification timestamps from the database
            const existingSupplierKeysAndTimestamps = await Supplier.findAll({
                attributes: ['__kp_Supplier', 'z_recModifyTimestamp']
            }).then(suppliers => suppliers.map(supplier => ({
                key: supplier.__kp_Supplier,
                timestamp: supplier.z_recModifyTimestamp
            })));

            // Filter out new or updated suppliers
            const newSuppliers = allSuppliers.filter(supplier => {
                const existingSupplier = existingSupplierKeysAndTimestamps.find(dbSupplier => dbSupplier.key === supplier.__kp_Supplier);
                return !existingSupplier || supplier.z_recModifyTimestamp > existingSupplier.timestamp;
            });

            // Bulk insert new or updated suppliers into the database
            if (newSuppliers.length > 0) {
                await Supplier.bulkCreate(newSuppliers);
                console.log(`${newSuppliers.length} new suppliers inserted successfully into the database table.`);
                return { success: true, message: `${newSuppliers.length} new suppliers inserted successfully into the database table.` };
            } else {
                console.log('No new or updated suppliers to insert into the database table.');
                return { success: false, message: 'No new or updated suppliers to insert into the database table.' };
            }

        } catch (error) {
            console.error('Error fetching or inserting suppliers data:', error);
            return { success: false, message: 'Failed to fetch or insert suppliers data.', error: error.message };
        }
    }
    static async fetchAllAndPushReadings() {
        let allReadings = [];
        let currentPage = 1;
        let continueFetching = true; // Flag to control loop continuation
    
        try {
            while (continueFetching) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/readings?page=${currentPage}`);
    
                if (!response.data || response.data.message === 'No readings found.') {
                    console.log(`No readings found on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if no more readings are found
                }
    
                if (!Array.isArray(response.data.Readings)) {
                    console.error(`Invalid response data for readings on page ${currentPage}. Response data:`, response.data);
                    // Throw an error and handle it accordingly
                    throw new Error(`Invalid response data for readings on page ${currentPage}. Ensure that the response contains an array named "Readings".`);
                }
    
                const readings = response.data.Readings;
    
                if (readings.length === 0) {
                    console.log(`No more readings found on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if current page has no readings
                }
    
                allReadings.push(...readings);
                console.log(`Fetched ${readings.length} readings from page ${currentPage}`);
    
                currentPage++;
            }
    
            // Check if allReadings has data after the loop ends
            if (allReadings.length === 0) {
                console.log('No readings data found from API.');
                return { success: false, message: 'No readings data found from API.' };
            }
    
            // Fetch existing reading keys from the database
            const existingReadingKeys = (await Readings.findAll({
                attributes: ['__kp_Reading']
            })).map(reading => reading.__kp_Reading);
    
            // Filter out new readings that are not already in the database
            const newReadings = allReadings.filter(reading => !existingReadingKeys.includes(reading.__kp_Reading));
    
            // Bulk insert new readings into the database
            if (newReadings.length > 0) {
                await Readings.bulkCreate(newReadings);
                console.log(`${newReadings.length} new readings inserted successfully into the database table.`);
                return { success: true, message: `${newReadings.length} new readings inserted successfully into the database table.` };
            } else {
                console.log('No new updated readings to insert into the database table.');
                return { success: false, message: 'No new updated readings to insert into the database table.' };
            }
    
        } catch (error) {
            console.error('Error fetching or inserting readings data:', error);
            return { success: false, message: 'Failed to fetch or insert readings data.', error: error.message };
        }
    }
    static async fetchAllAndPushUsers() {
        let allUsers = [];
        let currentPage = 1;
        let continueFetching = true; // Flag to control loop continuation

        try {
            while (continueFetching) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/users?page=${currentPage}`);

                if (!response.data) {
                    console.log(`No data found in the response for users on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if no data in response
                }

                if ('message' in response.data && response.data.message === 'No users found.') {
                    console.log(`No users found on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if no users are found on the current page
                }

                if (!Array.isArray(response.data.Users)) {
                    console.error(`Invalid response data for users on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for users on page ${currentPage}. Ensure that the response contains an array named "Users".`);
                }

                const users = response.data.Users;

                if (users.length === 0) {
                    console.log(`No more users found on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if current page has no users
                }

                allUsers.push(...users);
                console.log(`Fetched ${users.length} users from page ${currentPage}`);

                currentPage++;
            }

            if (allUsers.length === 0) {
                console.log('No users data found from API.');
                return { success: false, message: 'No users data found from API.' };
            }

            // Fetch existing user IDs from the database
            const existingUserIds = (await Users.findAll({
                attributes: ['__kp_User']
            })).map(user => user.__kp_User);

            // Filter out new users that are not already in the database
            const newUsers = allUsers.filter(user => !existingUserIds.includes(user.__kp_User));

            // Bulk insert new users into the database
            if (newUsers.length > 0) {
                await Users.bulkCreate(newUsers);
                console.log(`${newUsers.length} new users inserted successfully into the database table.`);
                return { success: true, message: `${newUsers.length} new users inserted successfully into the database table.` };
            } else {
                console.log('No new updated users to insert into the database table.');
                return { success: false, message: 'No new updated users to insert into the database table.' };
            }

        } catch (error) {
            console.error('Error fetching or inserting users data:', error);
            return { success: false, message: 'Failed to fetch or insert users data.', error: error.message };
        }
    }
    static async fetchAllAndPushStaff() {
        let allStaff = [];
        let currentPage = 1;
        let continueFetching = true; // Flag to control loop continuation

        try {
            while (continueFetching) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/staff?page=${currentPage}`);

                if (!response.data) {
                    console.log(`No data found in the response for staff on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if no data in response
                }

                if ('message' in response.data && response.data.message === 'No staff found.') {
                    console.log(`No staff found on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if no staff are found on the current page
                }

                if (!Array.isArray(response.data.staff)) {
                    console.error(`Invalid response data for staff on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for staff on page ${currentPage}. Ensure that the response contains an array named "staff".`);
                }

                const staff = response.data.staff;

                if (staff.length === 0) {
                    console.log(`No more staff found on page ${currentPage}, exiting loop.`);
                    break; // Exit loop if current page has no staff
                }

                allStaff.push(...staff);
                console.log(`Fetched ${staff.length} staff from page ${currentPage}`);

                currentPage++;
            }

            if (allStaff.length === 0) {
                console.log('No staff data found from API.');
                return { success: false, message: 'No staff data found from API.' };
            }

            // Fetch existing staff keys from the database
            const existingStaffKeys = await Staff.findAll({
                attributes: ['__kp_Staff', 'last_update_at']
            }).then(staffs => staffs.map(staff => ({ key: staff.__kp_Staff, timestamp: staff.last_update_at })));

            // Filter out new staff that are not already in the database or have been updated
            const newStaffs = allStaff.filter(staff => {
                const existingStaff = existingStaffKeys.find(dbStaff => dbStaff.key === staff.__kp_Staff);
                return !existingStaff || staff.last_update_at > existingStaff.timestamp;
            });

            // Bulk insert new staff into the database
            if (newStaffs.length > 0) {
                await Staff.bulkCreate(newStaffs);
                console.log(`${newStaffs.length} new staff inserted successfully into the database table.`);
                return { success: true, message: `${newStaffs.length} new staff inserted successfully into the database table.` };
            } else {
                console.log('No new or updated staff to insert into the database table.');
                return { success: false, message: 'No new or updated staff to insert into the database table.' };
            }

        } catch (error) {
            console.error('Error fetching or inserting staff data:', error);
            return { success: false, message: 'Failed to fetch or insert staff data.', error: error.message };
        }
    }
    static async sendCombinedEmailNotification(successMessages, failureMessages) {
        try {
            const successCount = successMessages.length;
            const failureCount = failureMessages.length;

            let successMessage = '';
            let failureMessage = '';

            if (successCount > 0) {
                successMessage = successMessages.map(msg => `- ${msg.message}`).join('\n');
            }

            if (failureCount > 0) {
                failureMessage = failureMessages.map(msg => `- ${msg.message}`).join('\n');
            }

            let failureDetails = '';
            if (failureCount > 0) {
                failureDetails = failureMessages.map(msg => `
                    ${msg.message}
                    Error: ${msg.error}
                `).join('\n');
            }

            mailOptions.subject = 'FileMaker Dashboard Information communication Summary';
            mailOptions.text = `
                Data Fron FM to Dashboard insertion summary:
                
                Successful insertions:
                ${successMessage}
                
                Failed insertions:
                ${failureMessage}
                
                Error details:
                ${failureDetails}
            `;

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
    static async fetchAllAndPushAccessControl() {
        try {
            let allAccessControls = [];
            let currentPage = 1;

            while (true) {
                const response = await DashboardFMController.fetchAccessControlPage(currentPage);

                if (!response || response.data.message === 'No seasons found.') {
                    console.log(`No access controls found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Access_Control)) {
                    throw new Error(`Invalid response data for access controls on page ${currentPage}. Ensure that the response contains an array named "Access_Control".`);
                }

                const accessControls = response.data.Access_Control;

                if (accessControls.length === 0) {
                    if (allAccessControls.length > 0) {
                        console.log(`No more access controls found on page ${currentPage}, but continuing as allAccessControls already has data.`);
                    } else {
                        console.log(`No more access controls found on page ${currentPage}, exiting loop.`);
                        break;
                    }
                }

                allAccessControls.push(...accessControls);
                console.log(`Fetched ${accessControls.length} access controls from page ${currentPage}`);

                currentPage++;
            }

            if (allAccessControls.length === 0) {
                console.log('No access controls data found from API.');
                return { success: false, message: 'No access controls data found from API.' };
            }

            // Fetch existing access controls from the database
            const existingAccessControls = await AccessControl.findAll();

            // Extract existing access control ids
            const existingAccessControlIds = existingAccessControls.map(accessControl => accessControl.id);

            // Filter out new access controls that are not already in the database
            const newAccessControls = allAccessControls.filter(accessControl => !existingAccessControlIds.includes(accessControl.id));

            // Bulk insert new access controls into the database
            if (newAccessControls.length > 0) {
                await AccessControl.bulkCreate(newAccessControls);
                console.log(`${newAccessControls.length} new access controls inserted successfully into the database table.`);
                return { success: true, message: `${newAccessControls.length} new access controls inserted successfully into the database table.` };
            } else {
                console.log('No new updated access controls to insert into the database table.');
                return { success: false, message: 'No new updated access controls to insert into the database table.' };
            }
        } catch (error) {
            console.error('Error fetching or inserting access controls data:', error);
            return { success: false, message: 'Failed to fetch or insert access controls data.', error: error.message };
        }
    }

    static async fetchAccessControlPage(page, retries = 0) {
        try {
            const response = await axios.get(`${DashboardFMController.apiUrl}/access_control?page=${page}`);
            return response;
        } catch (error) {
            console.error(`Error fetching access control page ${page}:`, error.message);

            if (axios.isAxiosError(error) && error.code === 'ECONNRESET' && retries < DashboardFMController.maxRetries) {
                console.log(`Retrying request for access control page ${page}...`);
                await new Promise(resolve => setTimeout(resolve, DashboardFMController.retryDelay));
                return await DashboardFMController.fetchAccessControlPage(page, retries + 1);
            }

            throw error; // Re-throw the error if retries are exhausted or it's not a socket hang up error
        }
    }
    static async fetchAllAndPushAppModule() {
        let allModules = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/app_modules?page=${currentPage}`);

                if (!response.data || response.data.message === 'No seasons found.') {
                    console.log(`No app modules found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.App_Module)) {
                    console.error(`Invalid response data for app modules on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for app modules on page ${currentPage}. Ensure that the response contains an array named "App_Module".`);
                }

                const appModules = response.data.App_Module;

                if (appModules.length === 0) {
                    if (allModules.length > 0) {
                        console.log(`No more app modules found on page ${currentPage}, but continuing as allModules already has data.`);
                    } else {
                        console.log(`No more app modules found on page ${currentPage}, exiting loop.`);
                        break;
                    }
                }

                allModules.push(...appModules);
                console.log(`Fetched ${appModules.length} app modules from page ${currentPage}`);

                currentPage++;
            }

            if (allModules.length === 0) {
                console.log('No app modules data found from API.');
                return { success: false, message: 'No app modules data found from API.' };
            }

            // Check if allModules already exists in the database before inserting
            const existingModules = await AppModules.findAll({
                attributes: ['id'] // Adjust as per your actual primary key or identifier
            });

            // Extract IDs from existingModules
            const existingModuleIds = existingModules.map(module => module.id);

            // Filter out existing modules
            const newModules = allModules.filter(module => !existingModuleIds.includes(module.id));

            if (newModules.length === 0) {
                console.log('All fetched app modules already exist in the database.');
                return { success: false, message: 'All fetched app modules already exist in the database.' };
            }

            // Example: Assuming AppModules.bulkCreate is used to insert app modules into the database
            await AppModules.bulkCreate(newModules);
            console.log(`${newModules.length} new app modules inserted successfully into the database table.`);
            return { success: true, message: `${newModules.length} new app modules inserted successfully into the database table.` };

        } catch (error) {
            console.error('Error fetching or inserting app modules data:', error);
            return { success: false, message: 'Failed to fetch or insert app modules data.', error: error.message };
        }
    }
    static async fetchAllAndPushFarmers() {
        let allFarmers = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/farmer?page=${currentPage}`);

                if (!response.data || response.data.message === 'No farmers found.') {
                    console.log(`No farmers found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Farmers)) {
                    console.error(`Invalid response data for farmers on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for farmers on page ${currentPage}. Ensure that the response contains an array named "Farmers".`);
                }

                const farmers = response.data.Farmers;

                if (farmers.length === 0) {
                    console.log(`No more farmers found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allFarmers.push(...farmers);
                console.log(`Fetched ${farmers.length} farmers from page ${currentPage}`);

                currentPage++;
            }

            if (allFarmers.length === 0) {
                console.log('No farmers data found from API.');
                return { success: false, message: 'No farmers data found from API.' };
            }

            // Inserting farmers in chunks to handle large data
            const chunkSize = 1000; // Adjust as per your needs
            for (let i = 0; i < allFarmers.length; i += chunkSize) {
                const chunk = allFarmers.slice(i, i + chunkSize);
                await DashboardFMController.insertFarmersIntoDatabase(chunk);
            }

            console.log(`${allFarmers.length} farmers inserted successfully into the database.`);
            return { success: true, message: `${allFarmers.length} farmers inserted successfully into the database.` };

        } catch (error) {
            console.error('Error fetching or inserting farmers data:', error);
            return { success: false, message: 'Failed to fetch or insert farmers data.', error: error.message };
        }
    }

    static async insertFarmersIntoDatabase(farmers) {
        try {
            // Insert or update based on __kp_Farmer field
            await Promise.all(farmers.map(async (farmer) => {
                const [insertedFarmer, created] = await Farmer.findOrCreate({
                    where: { __kp_Farmer: farmer.__kp_Farmer },
                    defaults: farmer // Insert farmer if not found
                });
                
                if (!created) {
                    console.log(`Farmer with __kp_Farmer ${insertedFarmer.__kp_Farmer} already exists.`);
                    // Handle update logic if needed
                }
            }));
        } catch (error) {
            console.error('Error inserting farmers into database:', error);
            throw error;
        }
    }
    static async fetchAllAndPushHouseholds() {
        let allHouseholds = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/household?page=${currentPage}`);

                if (!response.data || response.data.message === 'No households found.') {
                    console.log(`No households found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.households)) {
                    console.error(`Invalid response data for households on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for households on page ${currentPage}. Ensure that the response contains an array named "Households".`);
                }

                const households = response.data.households;

                if (households.length === 0) {
                    console.log(`No more households found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allHouseholds.push(...households);
                console.log(`Fetched ${households.length} households from page ${currentPage}`);

                currentPage++;
            }

            if (allHouseholds.length === 0) {
                console.log('No households data found from API.');
                return { success: false, message: 'No households data found from API.' };
            }

            // Inserting households in chunks to handle large data
            const chunkSize = 1000; // Adjust as per your needs
            for (let i = 0; i < allHouseholds.length; i += chunkSize) {
                const chunk = allHouseholds.slice(i, i + chunkSize);
                await DashboardFMController.insertHouseholdsIntoDatabase(chunk);
            }

            console.log(`${allHouseholds.length} households inserted successfully into the database.`);
            return { success: true, message: `${allHouseholds.length} households inserted successfully into the database.` };

        } catch (error) {
            console.error('Error fetching or inserting households data:', error);
            return { success: false, message: 'Failed to fetch or insert households data.', error: error.message };
        }
    }

    static async insertHouseholdsIntoDatabase(households) {
        try {
            // Insert or update based on __kp_Household field
            await Promise.all(households.map(async (household) => {
                const [insertedHousehold, created] = await Household.findOrCreate({
                    where: { __kp_Household: household.__kp_Household },
                    defaults: household // Insert household if not found
                });
                
                if (!created) {
                    console.log(`Household with __kp_Household ${insertedHousehold.__kp_Household} already exists.`);
                    // Handle update logic if needed
                }
            }));
        } catch (error) {
            console.error('Error inserting households into database:', error);
            throw error;
        }
    }
    static async fetchAllAndPushRoles() {
        let allRoles = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/roles?page=${currentPage}`);

                if (!response.data || response.data.message === 'No readings found.') {
                    console.log(`No roles found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.RolesData)) {
                    console.error(`Invalid response data for roles on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for roles on page ${currentPage}. Ensure that the response contains an array named "RolesData".`);
                }

                const rolesData = response.data.RolesData;

                if (rolesData.length === 0) {
                    console.log(`No more roles found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allRoles.push(...rolesData);
                console.log(`Fetched ${rolesData.length} roles from page ${currentPage}`);

                currentPage++;
            }

            if (allRoles.length === 0) {
                console.log('No roles data found from API.');
                return { success: false, message: 'No roles data found from API.' };
            }

            // Inserting roles in chunks to handle large data
            const chunkSize = 1000; // Adjust as per your needs
            for (let i = 0; i < allRoles.length; i += chunkSize) {
                const chunk = allRoles.slice(i, i + chunkSize);
                await DashboardFMController.insertRolesIntoDatabase(chunk);
            }

            console.log(`${allRoles.length} roles inserted successfully into the database.`);
            return { success: true, message: `${allRoles.length} roles inserted successfully into the database.` };

        } catch (error) {
            console.error('Error fetching or inserting roles data:', error);
            return { success: false, message: 'Failed to fetch or insert roles data.', error: error.message };
        }
    }
    static async insertRolesIntoDatabase(roles) {
        try {
            // Insert or update based on __kp_Role field
            await Promise.all(roles.map(async (role) => {
                const [insertedRole, created] = await Roles.findOrCreate({
                    where: { __kp_Role: role.__kp_Role },
                    defaults: role // Insert role if not found
                });

                if (!created) {
                    console.log(`Role with __kp_Role ${insertedRole.__kp_Role} already exists.`);
                    // Handle update logic if needed
                }
            }));
        } catch (error) {
            console.error('Error inserting roles into database:', error);
            throw error;
        }
    }
    static async fetchAllAndPushInspectionAnswer() {
        let allAnswers = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/inspection_answer?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Inspection_Answer found.') {
                    console.log(`No inspection answers found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Answers)) {
                    console.error(`Invalid response data for inspection answers on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for inspection answers on page ${currentPage}. Ensure that the response contains an array named "Answers".`);
                }

                const inspectionAnswers = response.data.Answers;

                if (inspectionAnswers.length === 0) {
                    if (allAnswers.length > 0) {
                        console.log(`No more inspection answers found on page ${currentPage}, but continuing as allAnswers already has data.`);
                    } else {
                        console.log(`No more inspection answers found on page ${currentPage}, exiting loop.`);
                        break;
                    }
                }

                allAnswers.push(...inspectionAnswers);
                console.log(`Fetched ${inspectionAnswers.length} inspection answers from page ${currentPage}`);

                currentPage++;
            }

            if (allAnswers.length === 0) {
                console.log('No inspection answers data found from API.');
                return { success: false, message: 'No inspection answers data found from API.' };
            }

            // Check if allAnswers already exist in the database before inserting
            const existingAnswers = await Answer.findAll({
                attributes: ['id'] // Adjust as per your actual primary key or identifier
            });

            // Extract IDs from existingAnswers
            const existingAnswerIds = existingAnswers.map(answer => answer.id);

            // Filter out existing answers
            const newAnswers = allAnswers.filter(answer => !existingAnswerIds.includes(answer.id));

            if (newAnswers.length === 0) {
                console.log('All fetched inspection answers already exist in the database.');
                return { success: false, message: 'All fetched inspection answers already exist in the database.' };
            }

            // Example: Assuming Answer.bulkCreate is used to insert inspection answers into the database
            await Answer.bulkCreate(newAnswers);
            console.log(`${newAnswers.length} new inspection answers inserted successfully into the database table.`);
            return { success: true, message: `${newAnswers.length} new inspection answers inserted successfully into the database table.` };

        } catch (error) {
            console.error('Error fetching or inserting inspection answers data:', error);
            return { success: false, message: 'Failed to fetch or insert inspection answers data.', error: error.message };
        }
    }
    static async fetchAllAndPushInspectionQuestion() {
        let allQuestions = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/inspection_question?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Inspection_Question found.') {
                    console.log(`No inspection questions found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Questions)) {
                    console.error(`Invalid response data for inspection questions on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for inspection questions on page ${currentPage}. Ensure that the response contains an array named "Questions".`);
                }

                const inspectionQuestions = response.data.Questions;

                if (inspectionQuestions.length === 0) {
                    if (allQuestions.length > 0) {
                        console.log(`No more inspection questions found on page ${currentPage}, but continuing as allQuestions already has data.`);
                    } else {
                        console.log(`No more inspection questions found on page ${currentPage}, exiting loop.`);
                        break;
                    }
                }

                allQuestions.push(...inspectionQuestions);
                console.log(`Fetched ${inspectionQuestions.length} inspection questions from page ${currentPage}`);

                currentPage++;
            }

            if (allQuestions.length === 0) {
                console.log('No inspection questions data found from API.');
                return { success: false, message: 'No inspection questions data found from API.' };
            }

            // Check if allQuestions already exist in the database before inserting
            const existingQuestions = await Question.findAll({
                attributes: ['id'] // Adjust as per your actual primary key or identifier
            });

            // Extract IDs from existingQuestions
            const existingQuestionIds = existingQuestions.map(question => question.id);

            // Filter out existing questions
            const newQuestions = allQuestions.filter(question => !existingQuestionIds.includes(question.id));

            if (newQuestions.length === 0) {
                console.log('All fetched inspection questions already exist in the database.');
                return { success: false, message: 'All fetched inspection questions already exist in the database.' };
            }

            // Example: Assuming Question.bulkCreate is used to insert inspection questions into the database
            await Question.bulkCreate(newQuestions);
            console.log(`${newQuestions.length} new inspection questions inserted successfully into the database table.`);
            return { success: true, message: `${newQuestions.length} new inspection questions inserted successfully into the database table.` };

        } catch (error) {
            console.error('Error fetching or inserting inspection questions data:', error);
            return { success: false, message: 'Failed to fetch or insert inspection questions data.', error: error.message };
        }
    }
    static async fetchAllAndPushTraining() {
        let allTrainings = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/training?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Training found.') {
                    console.log(`No trainings found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Trainings)) {
                    console.error(`Invalid response data for trainings on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for trainings on page ${currentPage}. Ensure that the response contains an array named "Trainings".`);
                }

                const trainings = response.data.Trainings;

                if (trainings.length === 0) {
                    console.log(`No more trainings found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allTrainings.push(...trainings);
                console.log(`Fetched ${trainings.length} trainings from page ${currentPage}`);

                currentPage++;
            }

            if (allTrainings.length === 0) {
                console.log('No training data found from API.');
                return { success: false, message: 'No training data found from API.' };
            }

            // Inserting trainings in chunks to handle large data
            const chunkSize = 1000; // Adjust as per your needs
            for (let i = 0; i < allTrainings.length; i += chunkSize) {
                const chunk = allTrainings.slice(i, i + chunkSize);
                await DashboardFMController.insertTrainingsIntoDatabase(chunk);
            }

            console.log(`${allTrainings.length} trainings inserted successfully into the database.`);
            return { success: true, message: `${allTrainings.length} trainings inserted successfully into the database.` };

        } catch (error) {
            console.error('Error fetching or inserting trainings data:', error);
            return { success: false, message: 'Failed to fetch or insert trainings data.', error: error.message };
        }
    }
    static async insertTrainingsIntoDatabase(trainings) {
        try {
            // Insert or update based on appropriate field in Training model
            await Promise.all(trainings.map(async (training) => {
                const [insertedTraining, created] = await Training.findOrCreate({
                    where: { id: training.id }, // Adjust based on your model's primary key
                    defaults: training // Insert training if not found
                });
                
                if (!created) {
                    console.log(`Training with ID ${insertedTraining.id} already exists.`);
                    // Handle update logic if needed
                }
            }));
        } catch (error) {
            console.error('Error inserting trainings into database:', error);
            throw error;
        }
    }
    static async fetchAllAndPushTranslation() {
        let allTranslations = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/translation?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Translation found.') {
                    console.log(`No translations found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Translations)) {
                    console.error(`Invalid response data for translations on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for translations on page ${currentPage}. Ensure that the response contains an array named "Translations".`);
                }

                const translations = response.data.Translations;

                if (translations.length === 0) {
                    console.log(`No more translations found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allTranslations.push(...translations);
                console.log(`Fetched ${translations.length} translations from page ${currentPage}`);

                currentPage++;
            }

            if (allTranslations.length === 0) {
                console.log('No translation data found from API.');
                return { success: false, message: 'No translation data found from API.' };
            }

            // Inserting translations in chunks to handle large data
            const chunkSize = 1000; // Adjust as per your needs
            for (let i = 0; i < allTranslations.length; i += chunkSize) {
                const chunk = allTranslations.slice(i, i + chunkSize);
                await DashboardFMController.insertTranslationsIntoDatabase(chunk);
            }

            console.log(`${allTranslations.length} translations inserted successfully into the database.`);
            return { success: true, message: `${allTranslations.length} translations inserted successfully into the database.` };

        } catch (error) {
            console.error('Error fetching or inserting translations data:', error);
            return { success: false, message: 'Failed to fetch or insert translations data.', error: error.message };
        }
    }
    static async insertTranslationsIntoDatabase(translations) {
        try {
            // Insert or update based on appropriate field in Translation model
            await Promise.all(translations.map(async (translation) => {
                const [insertedTranslation, created] = await Translation.findOrCreate({
                    where: { id: translation.id }, // Adjust based on your model's primary key
                    defaults: translation // Insert translation if not found
                });
                
                if (!created) {
                    console.log(`Translation with ID ${insertedTranslation.id} already exists.`);
                    // Handle update logic if needed
                }
            }));
        } catch (error) {
            console.error('Error inserting translations into database:', error);
            throw error;
        }
    }
    static async fetchAllAndPushEvaluation() {
        let allEvaluations = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await axios.get(`${DashboardFMController.apiUrl}/evaluation?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Evaluation found.') {
                    console.log(`No evaluations found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Evaluations)) {
                    console.error(`Invalid response data for evaluations on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for evaluations on page ${currentPage}. Ensure that the response contains an array named "Evaluations".`);
                }

                const evaluations = response.data.Evaluations;

                if (evaluations.length === 0) {
                    console.log(`No more evaluations found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allEvaluations.push(...evaluations);
                console.log(`Fetched ${evaluations.length} evaluations from page ${currentPage}`);

                currentPage++;
            }

            if (allEvaluations.length === 0) {
                console.log('No evaluation data found from API.');
                return { success: false, message: 'No evaluation data found from API.' };
            }

            // Inserting evaluations in chunks to handle large data
            const chunkSize = 1000; // Adjust as per your needs
            for (let i = 0; i < allEvaluations.length; i += chunkSize) {
                const chunk = allEvaluations.slice(i, i + chunkSize);
                await DashboardFMController.insertEvaluationsIntoDatabase(chunk);
            }

            console.log(`${allEvaluations.length} evaluations inserted successfully into the database.`);
            return { success: true, message: `${allEvaluations.length} evaluations inserted successfully into the database.` };

        } catch (error) {
            console.error('Error fetching or inserting evaluations data:', error);
            return { success: false, message: 'Failed to fetch or insert evaluations data.', error: error.message };
        }
    }
    static async insertEvaluationsIntoDatabase(evaluations) {
        try {
            // Insert or update based on appropriate field in Evaluation model
            await Promise.all(evaluations.map(async (evaluation) => {
                const [insertedEvaluation, created] = await Evaluation.findOrCreate({
                    where: { id: evaluation.id }, // Adjust based on your model's primary key
                    defaults: evaluation // Insert evaluation if not found
                });
                
                if (!created) {
                    console.log(`Evaluation with ID ${insertedEvaluation.id} already exists.`);
                    // Handle update logic if needed
                }
            }));
        } catch (error) {
            console.error('Error inserting evaluations into database:', error);
            throw error;
        }
    }
    static async fetchAllAndPushInspectionResponse() {
        let allResponses = [];
        let currentPage = 1;

        try {
            while (true) {
                const response = await DashboardFMController.axiosInstance.get(`/inspection_response?page=${currentPage}`);

                if (!response.data || response.data.message === 'No Inspection_Response found.') {
                    console.log(`No inspection responses found on page ${currentPage}, exiting loop.`);
                    break;
                }

                if (!Array.isArray(response.data.Responses)) {
                    console.error(`Invalid response data for inspection responses on page ${currentPage}. Response data:`, response.data);
                    throw new Error(`Invalid response data for inspection responses on page ${currentPage}. Ensure that the response contains an array named "Responses".`);
                }

                const inspectionResponses = response.data.Responses;

                if (inspectionResponses.length === 0) {
                    console.log(`No more inspection responses found on page ${currentPage}, exiting loop.`);
                    break;
                }

                allResponses.push(...inspectionResponses);
                console.log(`Fetched ${inspectionResponses.length} inspection responses from page ${currentPage}`);

                currentPage++;
            }

            if (allResponses.length === 0) {
                console.log('No inspection responses data found from API.');
                return { success: false, message: 'No inspection responses data found from API.' };
            }

            // Inserting responses in chunks to handle large data
            const chunkSize = 1000; // Adjust as per your needs
            for (let i = 0; i < allResponses.length; i += chunkSize) {
                const chunk = allResponses.slice(i, i + chunkSize);
                await DashboardFMController.insertResponsesIntoDatabase(chunk);
            }

            console.log(`${allResponses.length} inspection responses inserted successfully into the database.`);
            return { success: true, message: `${allResponses.length} inspection responses inserted successfully into the database.` };

        } catch (error) {
            console.error('Error fetching or inserting inspection responses data:', error);
            return { success: false, message: 'Failed to fetch or insert inspection responses data.', error: error.message };
        }
    }

    static async insertResponsesIntoDatabase(responses) {
        try {
            // Insert or update based on appropriate field in Response model
            await Promise.all(responses.map(async (response) => {
                const [insertedResponse, created] = await Response.findOrCreate({
                    where: { id: response.id }, // Adjust based on your model's primary key
                    defaults: response // Insert response if not found
                });
                
                if (!created) {
                    console.log(`Response with ID ${insertedResponse.id} already exists.`);
                    // Handle update logic if needed
                }
            }));
        } catch (error) {
            console.error('Error inserting inspection responses into database:', error);
            throw error;
        }
    }

}

export default DashboardFMController;
