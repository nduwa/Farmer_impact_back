import cron from 'node-cron';
import axios from 'axios';

// Function to run the HTTP GET request
const runJob = async () => {
    try {
        const response = await axios.get('http://localhost:5000/dashboardApi/getAllfromFM');
        console.log(`Job ran successfully at ${new Date().toLocaleString()}:`, response.data);
    } catch (error) {
        console.error(`Job failed at ${new Date().toLocaleString()}:`, error.message);
    }
};

// Schedule the job to run every minute (for testing)
cron.schedule('12 17 * * *', () => {
    console.log('Running scheduled job...');
    runJob();
});

console.log('Cron job scheduled to run every minute for testing.');
