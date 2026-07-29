const { decomposeTopic } = require('./decompose');
const { searchWeb } = require('./search');

async function researchTopic(topic) {
    console.log(`\n🔍 Researching topic: "${topic}"`);

    // Step A: turn the topic into specific search queries
    const queries = await decomposeTopic(topic);
    console.log(`Generated ${queries.length} queries.`);

    // Step B: search the web for each query, one at a time
    let allResults = [];

    for (const query of queries) {
        console.log(`  Searching: "${query}"`);
        const results = await searchWeb(query);
        allResults = allResults.concat(results);
    }

    console.log(`Found ${allResults.length} total raw results for "${topic}".`);

    return {
        topic: topic,
        results: allResults,
    };
}

module.exports = { researchTopic };