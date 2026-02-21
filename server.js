const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const http = require('http');
const rateLimit = require('express-rate-limit');
const SpeechService = require('./services/speechService');
const VoiceService = require('./services/voiceService');
const SmsService = require('./services/smsService');
const mongoose = require('mongoose');
const RiskLog = require('./models/riskLog');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.post('/api/voice', async (req, res) => {
  const { phone, audio, week } = req.body;

  if (!phone || !audio || !week) {
    return res.status(400).json({ error: 'Missing required fields: phone, audio, week' });
  }

  try {
    const transcribedText = await SpeechService.audioToText(audio);
    const riskAnalysis = analyzeRisk(transcribedText, week);

    const voiceResponse = await VoiceService.textToSpeech(riskAnalysis.response, 'yoruba');

    let smsSent = false;
    if (riskAnalysis.risk > 0.8) {
      smsSent = await SmsService.sendAlert(phone, riskAnalysis.response);
    }

    // Save risk log to MongoDB
    const riskLog = new RiskLog({
      phone,
      transcribedText,
      riskScore: riskAnalysis.risk,
      responseMessage: riskAnalysis.response,
    });
    await riskLog.save();

    io.emit('risk-update', { phone, risk: riskAnalysis.risk });

    res.json({
      transcribed: transcribedText,
      risk_score: riskAnalysis.risk,
      voice_response: voiceResponse.toString('base64'),
      sms_sent: smsSent,
      message: riskAnalysis.response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function analyzeRisk(transcribedText, week) {
  const lowerText = transcribedText.toLowerCase();
  if (lowerText.includes('headache') && lowerText.includes('swelling') && week > 20) {
    return { risk: 0.9, response: 'PRE-ECLAMPSIA RISK - GO CLINIC NOW' };
  }
  if (lowerText.includes('baby no move') && week > 28) {
    return { risk: 0.85, response: 'LOW FLUID RISK - GO CLINIC NOW' };
  }
  if (lowerText.includes('bleeding') && lowerText.includes('pain')) {
    return { risk: 1.0, response: 'MISCARRIAGE RISK - GO CLINIC NOW' };
  }
  return { risk: 0.0, response: 'NO RISK DETECTED' };
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));