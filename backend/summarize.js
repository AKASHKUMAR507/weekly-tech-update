require('dotenv').config();

async function summarizeResults(topic, results) {
    // Turn our results array into a numbered text block the AI can read
    const resultsText = results
        .map((r, i) => `[${i}] Title: ${r.title}\nURL: ${r.url}\nSnippet: ${r.snippet}`)
        .join('\n\n');

    const prompt = `You are a tech news editor. Below are raw search results about "${topic}" from this week.

Your job:
1. Pick ONLY the 3-5 most important, genuinely newsworthy items. Skip duplicates, low-quality, or irrelevant results.
2. For each item, write a 1-2 sentence summary in plain, human-readable English.
3. You MUST use the exact URL provided for that item — never invent or guess a URL.
4. If nothing in the results is genuinely relevant or newsworthy, return an empty array.

Raw results:
${resultsText}

Return ONLY a JSON array in this exact format, nothing else:
[
  { "headline": "short headline here", "summary": "1-2 sentence summary", "url": "the exact url from the result" }
]`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 800,
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    const data = await response.json();

    if (data.error) {
        console.log('Error:', data.error.message);
        return [];
    }

    const rawText = data.choices[0].message.content;
    const cleanText = rawText.replace(/```json|```/g, '').trim();

    try {
        return JSON.parse(cleanText);
    } catch (err) {
        console.log('Could not parse summary JSON. Raw response was:');
        console.log(rawText);
        return [];
    }
}

module.exports = { summarizeResults };