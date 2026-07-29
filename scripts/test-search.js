const { searchWeb } = require('../backend/search');

async function run() {
  const results = await searchWeb('latest AI model releases July 2026');
  console.log('Search results:');
  console.log(results);
}

run();