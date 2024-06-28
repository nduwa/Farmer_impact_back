import axios from 'axios';
import Supplier from '../models/rtc_supplier'; // Replace with correct path to Supplier model
import Station from '../models/rtc_station'; // Replace with correct path to Station model
import Season from '../models/rtc_seasons'; // Replace with correct path to Season model
import Readings from '../models/rtc_readings'; // Import your Readings model
import Users from '../models/rtc_users'; // Import your Users model
import Staff from '../models/rtc_staff'; // Import your Staff model
import Roles from '../models/rtc_roles'; // Import your Roles model
import transporter from '../database/mailConfig'; // Import your nodemailer transporter
import mailOptions from '../database/mailOption'; // Define your mailOptions

class DashboardFMController {
    static apiUrl = 'https://dashboard-api.farmerimpact.co.rw';
    static maxRetries = 3;
    static retryDelay = 1000; // milliseconds

    static async fetchAllAndPush(req, res) {
        try {
            const results = await Promise.all([
                DashboardFMController.fetchAllAndPushSuppliers(),
                DashboardFMController.fetchAllAndPushReadings(),
                DashboardFMController.fetchAllAndPushStation(),
                DashboardFMController.fetchAllAndPushUsers(),
                DashboardFMController.fetchAllAndPushStaff(),
                DashboardFMController.fetchAllAndPushSeasons(),
                DashboardFMController.fetchAllAndPushRoles()
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
    static async fetchAllAndPushRoles() {
        let allRoles = [];
        let currentPage = 1;
        let retries = 0;

        while (retries < DashboardFMController.maxRetries) {
            try {
                const response = await axios.get(`${DashboardFMController.apiUrl}/roles?page=${currentPage}`, {
                    timeout: 10000, // 10 seconds timeout
                });

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
                    if (allRoles.length > 0) {
                        console.log(`No more roles found on page ${currentPage}, but continuing as allRoles already has data.`);
                    } else {
                        console.log(`No more roles found on page ${currentPage}, exiting loop.`);
                        break;
                    }
                }

                allRoles.push(...rolesData);
                console.log(`Fetched ${rolesData.length} roles from page ${currentPage}`);

                currentPage++;
            } catch (error) {
                retries++;
                console.error(`Error fetching roles data (Attempt ${retries}):`, error.message);

                if (retries < DashboardFMController.maxRetries) {
                    console.log(`Retrying in ${DashboardFMController.retryDelay / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, DashboardFMController.retryDelay));
                } else {
                    console.error(`Maximum retries (${DashboardFMController.maxRetries}) exceeded.`);
                    throw new Error('Failed to fetch roles data after maximum retries.');
                }
            }
        }

        if (allRoles.length === 0) {
            console.log('No roles data found from API.');
            return { success: false, message: 'No roles data found from API.' };
        }

        try {
            // Fetch all existing roles from the database
            const existingRoles = await Roles.findAll({
                attributes: ['__kp_Role', '_kf_Staff', 'z_recModifyTimestamp']
            });

            // Filter new roles to be inserted and existing roles to be deleted
            const newRoles = [];
            const rolesToDelete = [];

            for (const role of allRoles) {
                const existingRole = existingRoles.find(r => r.__kp_Role === role.__kp_Role);

                if (!existingRole) {
                    newRoles.push(role);
                } else if (existingRole._kf_Staff === role._kf_Staff && role.z_recModifyTimestamp > existingRole.z_recModifyTimestamp) {
                    rolesToDelete.push(existingRole.__kp_Role);
                    newRoles.push(role);
                }
            }

            // Delete existing roles that need to be replaced
            if (rolesToDelete.length > 0) {
                await Roles.destroy({
                    where: {
                        __kp_Role: rolesToDelete
                    }
                });
                console.log(`${rolesToDelete.length} existing roles deleted from database.`);
            }

            // Bulk insert new roles into the database
            if (newRoles.length > 0) {
                await Roles.bulkCreate(newRoles);
                console.log(`${newRoles.length} new roles inserted successfully into the database table.`);
                return { success: true, message: `${newRoles.length} new roles inserted successfully into the database table.` };
            } else {
                console.log('No new updated roles to insert into the database table.');
                return { success: false, message: 'No new updated roles to insert into the database table.' };
            }
        } catch (error) {
            console.error('Error inserting roles data:', error.message);
            return { success: false, message: 'Failed to insert roles data into the database.', error: error.message };
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
}

export default DashboardFMController;
