const fs = require('fs');
const { buildDigest } = require('../backend/buildDigest');

async function run() {
    console.log('Building full digest... this will take a minute or two.\n');

    const digest = await buildDigest();

    // Save it as a JSON file so we don't lose it
    const filename = `digests/digest-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(filename, JSON.stringify(digest, null, 2));

    console.log(`\n✅ Digest saved to ${filename}`);
    console.log(`Topics included: ${digest.length}`);
}

run();