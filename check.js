require('dotenv').config();

async function listMyModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    try {
        console.log("Asking Google for your allowed models...");
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.log("Google replied with an error:", data.error.message);
            return;
        }

        console.log("\n=== ✅ YOUR EXACT AVAILABLE MODELS ===");
        data.models.forEach(model => {
            // We only care about the Gemini models
            if (model.name.includes('gemini')) {
                console.log(model.name);
            }
        });
        console.log("======================================\n");
        
    } catch (error) {
        console.error("Failed to connect to Google:", error);
    }
}

listMyModels();