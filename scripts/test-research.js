const { researchTopic } = require('../backend/research');

async function run() {
    const data = await researchTopic('AI/ML developments');
    console.log('\n--- FINAL OUTPUT ---');
    console.log(JSON.stringify(data, null, 2));
}

run();