require('dotenv').config();

async function searchWeb(query) {
    const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: process.env.TAVILY_API_KEY,
            query: query,
            search_depth: 'basic',   // 'basic' is faster/cheaper, 'advanced' is deeper
            max_results: 5,
            days: 7,                 // only results from the last 7 days
        }),
    });

    const data = await response.json();

    if (data.error) {
        console.log('Tavily error:', data.error);
        return [];
    }

    // We only care about title, url, and content snippet for each result
    const results = data.results.map(r => ({
        title: r.title,
        url: r.url,
        snippet: r.content,
    }));

    return results;
}

module.exports = { searchWeb };