const { GoogleGenerativeAI } = require("@google/genai");
const HealthLog = require('../models/HealthLog');
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzePregnancy = async (req, res) => {
    try {
        const { week, symptoms, userId } = req.body;

        // 1. Validate Input
        if (!week || !symptoms) {
            return res.status(400).json({ error: "Please provide pregnancy week and symptoms." });
        }

        // 2. Construct the Prompt
        // We act as a medical expert and demand PURE JSON output.
        const prompt = `
            Act as a compassionate, expert obstetrician for 'safeWomb AI'.
            
            Patient Data:
            - Pregnancy Week: ${week}
            - Current Symptoms: "${symptoms}"

            Task: Analyze this and return a strictly valid JSON object (no markdown formatting).
            The JSON must have this exact structure:
            {
                "babyUpdate": "One distinct, exciting sentence about the baby's development this specific week.",
                "momUpdate": "One distinct sentence about what the mother's body is doing.",
                "tips": ["Tip 1", "Tip 2", "Tip 3 (related to her symptoms)"],
                "riskLevel": "Low" | "Medium" | "High",
                "advice": "Clear, actionable medical advice based on the symptoms."
            }
        `;

        // 3. Call Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // 4. Clean the Response (Crucial Hackathon Step!)
        // AI sometimes wraps JSON in markdown (```json ... ```). We must remove that.
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const analysisData = JSON.parse(cleanedText);

        // 5. Save to Database (The Memory)
        const newLog = new HealthLog({
            userId: userId || "Anonymous",
            week,
            symptoms,
            aiAnalysis: analysisData
        });
        await newLog.save();

        // 6. Send to Frontend
        res.status(200).json({
            success: true,
            data: analysisData,
            historyId: newLog._id
        });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to generate analysis", 
            error: error.message 
        });
    }
};