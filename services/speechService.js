const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

const client = new speech.SpeechClient();

async function audioToText(base64Audio) {
  const audioBuffer = Buffer.from(base64Audio, 'base64');
  const audio = { content: audioBuffer.toString('base64') };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    alternativeLanguageCodes: ['yo-NG'],
  };

  const request = { audio, config };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join(' ');
    return transcription;
  } catch (error) {
    console.error('Error during speech recognition:', error);
    throw new Error('Speech recognition failed');
  }
}

module.exports = { audioToText };