// Load our secret keys from .env
require('dotenv').config();

async function testConnection() {
  console.log('Sending request to Groq...');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 100,
      messages: [
        { role: 'user', content: 'Say hello and confirm you are working, in one short sentence.' }
      ],
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.log('Error:', data.error.message);
    return;
  }

  console.log('AI replied:');
  console.log(data.choices[0].message.content);
}

testConnection();











// // Load our secret keys from .env
// require('dotenv').config();

// // Import the Anthropic library
// const Anthropic = require('@anthropic-ai/sdk');

// // Create a client using our API key
// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

// // A function that sends one message and prints the reply
// async function testConnection() {
//   console.log('Sending request to Claude...');

//   const response = await anthropic.messages.create({
//     model: 'claude-sonnet-4-5',
//     max_tokens: 100,
//     messages: [
//       { role: 'user', content: 'Say hello and confirm you are working, in one short sentence.' }
//     ],
//   });

//   console.log('Claude replied:');
//   console.log(response.content[0].text);
// }

// testConnection();