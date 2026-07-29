const fs = require('fs');
const { generateLinkedIn, generateTwitter, generateReddit } = require('../backend/generateSocial');

async function run() {
    // Reuse the TL;DR — for now just paste it in manually from your markdown file
    const tldr = `PASTE YOUR TL;DR BULLET POINTS HERE`;

    console.log('Generating LinkedIn post...');
    const linkedin = await generateLinkedIn(tldr);
    fs.writeFileSync('digests/linkedin-2026-07-29.txt', linkedin);

    console.log('Generating Twitter thread...');
    const twitter = await generateTwitter(tldr);
    fs.writeFileSync('digests/twitter-2026-07-29.txt', twitter);

    console.log('Generating Reddit post...');
    const reddit = await generateReddit(tldr);
    fs.writeFileSync('digests/reddit-2026-07-29.txt', reddit);

    console.log('\n✅ All social posts saved to digests/ folder');
}

run();