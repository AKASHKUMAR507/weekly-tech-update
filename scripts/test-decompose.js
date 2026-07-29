const { decomposeTopic } = require('../backend/decompose');

async function run() {
    const queries = await decomposeTopic('AI/ML developments');
    console.log('Generated search queries:');
    console.log(queries);
}

run();