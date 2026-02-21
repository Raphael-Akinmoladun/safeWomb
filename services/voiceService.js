const axios = require('axios');

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

async function textToSpeech(text, voice = 'yoruba') {
  const url = 'https://api.elevenlabs.io/v1/text-to-speech';

  const data = {
    text,
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.8,
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'xi-api-key': ELEVENLABS_API_KEY,
  };

  try {
    const response = await axios.post(url, data, { headers, responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Error during text-to-speech conversion:', error);
    throw new Error('Text-to-speech conversion failed');
  }
}

module.exports = { textToSpeech };