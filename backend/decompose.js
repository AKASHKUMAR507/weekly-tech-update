require('dotenv').config();

async function decomposeTopic(topic) {
    const prompt = `You are a research assistant. Given a broad tech topic, generate 4 specific, highly-searchable search engine queries that would surface news from THIS WEEK only.

Topic: "${topic}"

Rules:
- Each query should be something you'd literally type into a search engine
- Include time-scoping words like "this week" or "latest" or the current month
- Make them specific enough to avoid generic/old results
- Return ONLY a JSON array of strings, nothing else, no explanation, no markdown formatting

Example output format:
["query one here", "query two here", "query three here", "query four here"]`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 300,
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    const data = await response.json();

    if (data.error) {
        console.log('Error:', data.error.message);
        return [];
    }

    const rawText = data.choices[0].message.content;

    // AI sometimes wraps JSON in markdown code fences — strip those if present
    const cleanText = rawText.replace(/```json|```/g, '').trim();

    try {
        const queries = JSON.parse(cleanText);
        return queries;
    } catch (err) {
        console.log('Could not parse AI response as JSON. Raw response was:');
        console.log(rawText);
        return [];
    }
}

module.exports = { decomposeTopic };