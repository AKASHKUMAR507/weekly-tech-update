const fs = require('fs');
const { generateTLDR, formatAsMarkdown } = require('../backend/formatDigest');

async function run() {
    // Load the digest JSON you already generated
    const digest = JSON.parse(fs.readFileSync('digests/digest-2026-07-29.json', 'utf-8'));

    console.log('Generating TL;DR...');
    const tldr = await generateTLDR(digest);

    console.log('Formatting as Markdown...');
    const markdown = formatAsMarkdown(digest, tldr, '2026-07-29');

    const filename = 'digests/digest-2026-07-29.md';
    fs.writeFileSync(filename, markdown);

    console.log(`\n✅ Markdown digest saved to ${filename}`);
}

run();