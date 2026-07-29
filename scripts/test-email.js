const fs = require('fs');
const { sendDigestEmail } = require('../backend/sendEmail');

async function run() {
    const markdown = fs.readFileSync('digests/digest-2026-07-29.md', 'utf-8');
    await sendDigestEmail(markdown, '2026-07-29');
}

run();