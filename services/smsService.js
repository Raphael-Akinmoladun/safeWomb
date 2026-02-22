const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Sends an SMS to a user
 * @param {string} to - The recipient's phone number
 * @param {string} message - The text body
 */
exports.sendSMS = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });
        console.log(`✅ SMS sent successfully! SID: ${response.sid}`);
        return response;
    } catch (error) {
        console.error('❌ Twilio Error:', error.message);
        throw error;
    }
};