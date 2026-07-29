const { researchTopic } = require('../backend/research');
const { summarizeResults } = require('../backend/summarize');

async function run() {
    const data = await researchTopic('AI/ML developments');
    console.log('\nSummarizing results...\n');

    const summary = await summarizeResults(data.topic, data.results);

    console.log('--- CLEAN SUMMARY ---');
    console.log(JSON.stringify(summary, null, 2));
}

run();