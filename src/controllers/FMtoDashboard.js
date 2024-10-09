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

    static configureAxiosRetry() {
        axiosRetry(axios, {
            retries: 5,
            retryDelay: retryCount => Math.min(retryCount * 1000, 5000),
            retryCondition: error => axiosRetry.isNetworkOrIdempotentRequestError(error),
        });
    }

    static async GetAllFMData(req, res) {
        try {
            FMtoDashboard.configureAxiosRetry();
            const [
                priceTrendsResult,
                seasonResult,
                userResult,
                staffResult,
                supplierResult,
                stationResult,
                readingResult
            ] = await Promise.all([
                FMtoDashboard.getAllAndPushData('price_trends', PriceTrends, '__kp_Approval', 'z_recModifyTimestamp'),
                FMtoDashboard.getAllAndPushData('season', Season, '__kp_Season', 'z_recModifyTimestamp'),
                FMtoDashboard.getAllAndPushData('users', User, '__kp_User', 'z_recModifyTimestamp'),
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

    static mapJsonToStationModel(jsonData) {
        return {
            __kp_Station: jsonData.__kp_Station,
            _kf_Location: jsonData._kf_Location,
            _kf_Supplier: jsonData._kf_Supplier,
            Area_Big: jsonData.Area_Big,
            Area_Biggest: jsonData.Area_Biggest,
            Area_Medium: jsonData.Area_Medium,
            Area_Small: jsonData.Area_Small,
            Area_Smallest: jsonData.Area_Smallest,
            Certification: jsonData.Certification,
            StationID: jsonData.StationID,
            Name: jsonData.Name,
            Prefix: jsonData.Prefix,
            RTC_Owned: jsonData.RTC_Owned,
            synced_price: jsonData.sync_roles || 0,
            sync_roles: jsonData.sync_roles || 0,
            created_at: jsonData.z_recCreateTimestamp,
            updated_at: jsonData.z_recModifyTimestamp,
            updated: 1
        };
    }

    static mapJsonToReadingModel(jsonData) {
        return {
            __kp_Reading: jsonData.__kp_Reading,
            _kf_Location: jsonData._kf_Location,
            _kf_Supplier: jsonData._kf_Supplier,
            _kf_Type: jsonData._kf_Type,
            Ratio_CP: jsonData.Ratio_CP,
            Updated_d: '' || 0,
            Weight_Cherry_n: jsonData.Weight_Cherry_n,
            Weight_Floaters_n: jsonData.Weight_Floaters_n,
            _kf_Season: jsonData._kf_Season,
            created_at: jsonData.z_recCreateTimestamp,
            modified_at: jsonData.z_recModifyTimestamp,
            Bucket_A: jsonData.Bucket_A,
            Bucket_B: jsonData.Bucket_B,
            Bucket_C: jsonData.Bucket_C,
        };
    }

    static mapJsonToUserModel(jsonData) {
        return {
            created_at: jsonData.z_recCreateTimestamp,
            status: 0,
            __kp_User: jsonData.__kp_User,
            _kf_Location: jsonData._kf_Location,
            Email: jsonData.Email,
            Name_Full: jsonData.Name_Full,
            Name_User: jsonData.Name_User,
            Role: jsonData.Role,
            z_recCreateAccountName: jsonData.z_recCreateAccountName,
            z_recCreateTimestamp: jsonData.z_recCreateTimestamp,
            z_recModifyAccountName: jsonData.z_recModifyAccountName,
            z_recModifyTimestamp: jsonData.z_recModifyTimestamp,
            Phone: jsonData.Phone,
            Phone_Airtime: jsonData.Phone,
            password: '' || 0,
            devicename: '' || 0,
            last_update_at: jsonData.z_recModifyTimestamp,
        };
    }

    static mapJsonToStaffModel(jsonData) {
        return {
            created_at: jsonData.z_recCreateTimestamp,
            __kp_Staff: jsonData.__kp_Staff,
            _kf_Location: jsonData._kf_Location,
            _kf_Supplier: jsonData._kf_Supplier,
            _kf_Station: jsonData._kf_Station,
            _kf_User: jsonData._kf_User,
            userID: jsonData.userID,
            Name: jsonData.Name,
            Phone: jsonData.Phone,
            Role: jsonData.Role,
            Gender: jsonData.Gender,
            synced_groups: jsonData.synced_groups || 0,
            prefix: '' || 0,
            last_update_at: jsonData.z_recModifyTimestamp,
            status: jsonData.Status|| 0,
        };
    }

    static mapJsonToPriceTrendModel(jsonData) {
        return {
            _kf_Season: jsonData._kf_Season,
            __kp_Approval: jsonData.__kp_Approval,
            _kf_Location: jsonData._kf_Location,
            _kf_Supplier: jsonData._kf_Supplier,
            Price_n: jsonData.Price_n,
            z_recCreateTimestamp: jsonData.z_recCreateTimestamp,
            Price_last_n: jsonData.Price_last_n,
            _kf_Station: jsonData._kf_Station,
            z_recModifyTimestamp: jsonData.z_recModifyTimestamp,
        };
    }

    static mapJsonToSeasonModel(jsonData) {
        return {
            __kp_Season: jsonData.__kp_Season,
            _kf_Location: jsonData._kf_Location,
            End_d: jsonData.End_d,
            Label: jsonData.Label,
            Start_d: jsonData.Start_d,
            z_recCreateTimestamp: jsonData.z_recCreateTimestamp,
            z_recModifyTimestamp: jsonData.z_recModifyTimestamp,
        };
    }

    static mapJsonToSupplierModel(jsonData) {
        return {
            _kf_Quality: jsonData._kf_Quality,
            _kf_Type: jsonData._kf_Type,
            __kp_Supplier: jsonData.__kp_Supplier,
            _kf_Location: jsonData._kf_Location,
            _kf_User_g: jsonData._kf_User_g,
            Area_Big: jsonData.Area_Big,
            Area_Biggest: jsonData.Area_Biggest,
            Area_Medium: jsonData.Area_Medium,
            Area_Small: jsonData.Area_Small,
            Area_Smallest: jsonData.Area_Smallest,
            Certification: jsonData.Certification,
            Name: jsonData.Name,
            Status: jsonData.Status,
            Ratio_CP: jsonData.Ratio_CP,
            Relationship: jsonData.Relationship,
            Report: jsonData.Report,
            Supplier_ID_t: jsonData.Supplier_ID_t,
            created_at: jsonData.created_at, 
            z_recCreateTimestamp: jsonData.z_recCreateTimestamp, 
            z_recModifyTimestamp: jsonData.z_recModifyTimestamp, 
            _kf_User: jsonData._kf_User,
            _kf_Season: jsonData._kf_Season,
            deleted: jsonData.deleted || 0,
        };
    }

    static async sendEmailNotification(message) {
        try {
            const options = {
                ...mailOptions,
                text: message
            };
            await transporter.sendMail(options);
        } catch (error) {
            console.error('Error sending email notification:', error);
        }
    }

    static async getAllAndPushData(endpoint, model, primaryKey, timestampField) {
        let allData = [];
        let currentPage = 1;
        const failureMessages = [];
        const successMessages = [];
        let updatedCount = 0, insertedCount = 0, duplicateCount = 0;
        const duplicateKeys = new Set(); // To track duplicate keys
    
        const getTimestamp = item => new Date(item[timestampField]).getTime();
    
        try {
            // Fetch all pages of data from the API
            while (true) {
                const response = await axios.get(`${FMtoDashboard.apiUrl}/${endpoint}?page=${currentPage}`, { timeout: 60000 });
                const data = response?.data?.response?.data || [];
                if (!data.length) break;
    
                allData.push(...data.map(record => record.fieldData));
                currentPage++;
            }
    
            // Create a map of unique data based on the primary key
            const uniqueDataMap = new Map();
            allData.forEach(item => {
                if (uniqueDataMap.has(item[primaryKey])) {
                    duplicateCount++;
                    duplicateKeys.add(item[primaryKey]); // Track the duplicate key
                } else {
                    uniqueDataMap.set(item[primaryKey], item);
                }
            });
    
            const uniqueData = Array.from(uniqueDataMap.values());
    
            // Fetch existing records from the database
            const existingData = await model.findAll({ 
                attributes: [primaryKey, timestampField, ...Object.keys(model.rawAttributes)], // Get all attributes defined in the model
                raw: true 
            });
    
            const existingDataMap = new Map(existingData.map(record => [record[primaryKey], record]));
    
            await Promise.all(uniqueData.map(async (item) => {
                try {
                    const existingItem = existingDataMap.get(item[primaryKey]);
                    let dataToSave;
    
                    // Map JSON data to the model format
                    switch (model) {
                        case Station:
                            dataToSave = FMtoDashboard.mapJsonToStationModel(item);
                            break;
                        case Reading:
                            dataToSave = FMtoDashboard.mapJsonToReadingModel(item);
                            break;
                        case User:
                            dataToSave = FMtoDashboard.mapJsonToUserModel(item);
                            break;
                        case Staff:
                            dataToSave = FMtoDashboard.mapJsonToStaffModel(item);
                            break;
                        case PriceTrends:
                            dataToSave = FMtoDashboard.mapJsonToPriceTrendModel(item);
                            break;
                        case Season:
                            dataToSave = FMtoDashboard.mapJsonToSeasonModel(item);
                            break;
                        case Supplier:
                            dataToSave = FMtoDashboard.mapJsonToSupplierModel(item);
                            break;
                        default:
                            dataToSave = item;
                    }
    
                    // Check if dataToSave is valid
                    if (!dataToSave || typeof dataToSave !== 'object') {
                        throw new Error(`Invalid dataToSave for ${item[primaryKey]}`);
                    }
    
                    // Check if the record exists
                    if (existingItem) {
                        // Compare timestamps
                        const existingTimestamp = getTimestamp(existingItem);
                        const apiTimestamp = getTimestamp(item);
    
                        if (apiTimestamp > existingTimestamp) {
                            // Prepare an object that only includes the relevant model fields for update
                            const updatedData = {};
    
                            // Iterate over the keys in dataToSave and update them if they differ
                            for (const key of Object.keys(dataToSave)) {
                                if (dataToSave[key] !== existingItem[key]) {
                                    updatedData[key] = dataToSave[key];
                                }
                            }
    
                            if (Object.keys(updatedData).length > 0) {
                                // Only update if there are changes
                                await model.update(updatedData, { where: { [primaryKey]: item[primaryKey] } });
                                updatedCount++;
                            }
                        }
                    } else {
                        // Insert new record if it doesn't exist
                        await model.create(dataToSave);
                        insertedCount++;
                    }
                } catch (error) {
                    failureMessages.push(`Failed to process ${endpoint.slice(0, -1)} ${item[primaryKey]}: ${error.message}`);
                }
            }));
    
            // Prepare a message about duplicates found
            const duplicateMessage = duplicateCount > 0 
                ? `${duplicateCount} duplicates found: ${Array.from(duplicateKeys).join(', ')}.`
                : 'No duplicates found.';
    
            return {
                changes: { updated: updatedCount, inserted: insertedCount, duplicateCount },
                successMessages: [
                    `Processed ${uniqueData.length} records: ${insertedCount} inserted, ${updatedCount} updated.`,
                    duplicateMessage
                ],
                failureMessages
            };
        } catch (error) {
            return {
                changes: { updated: 0, inserted: 0, duplicateCount: 0 },
                successMessages: [],
                failureMessages: [`Failed to fetch data from ${endpoint}: ${error.message}`]
            };
        }
    }
    
    
    
    
    
}

export default FMtoDashboard;
