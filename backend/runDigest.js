const fs = require('fs');
const { buildDigest } = require('./buildDigest');
const { generateTLDR, formatAsMarkdown } = require('./formatDigest');
const { generateLinkedIn, generateTwitter, generateReddit } = require('./generateSocial');
const { sendDigestEmail } = require('./sendEmail');

async function runFullDigest() {
    const dateStr = new Date().toISOString().split('T')[0];

    console.log('=== STEP 1: Researching all topics ===');
    const digest = await buildDigest();

    if (digest.length === 0) {
        console.log('⚠️  No content found for any topic this week. Stopping.');
        return;
    }

    console.log('\n=== STEP 2: Generating TL;DR ===');
    const tldr = await generateTLDR(digest);

    console.log('\n=== STEP 3: Formatting Markdown digest ===');
    const markdown = formatAsMarkdown(digest, tldr, dateStr);
    fs.writeFileSync(`digests/digest-${dateStr}.md`, markdown);
    fs.writeFileSync(`digests/digest-${dateStr}.json`, JSON.stringify(digest, null, 2));

    console.log('\n=== STEP 4: Generating social posts ===');
    const linkedin = await generateLinkedIn(tldr, digest);
    fs.writeFileSync(`digests/linkedin-${dateStr}.txt`, linkedin);

    const twitter = await generateTwitter(tldr, digest);
    fs.writeFileSync(`digests/twitter-${dateStr}.txt`, twitter);

    const reddit = await generateReddit(tldr, digest);
    fs.writeFileSync(`digests/reddit-${dateStr}.txt`, reddit);

    console.log('\n=== STEP 5: Sending email ===');
    const emailBody = `${markdown}\n\n---\n\n## LinkedIn Post\n${linkedin}\n\n## Twitter Thread\n${twitter}\n\n## Reddit Post\n${reddit}`;
    await sendDigestEmail(emailBody, dateStr);

    console.log(`\n✅ ALL DONE. Files saved in digests/ with date ${dateStr}:`);
    console.log(`   - digest-${dateStr}.md`);
    console.log(`   - digest-${dateStr}.json`);
    console.log(`   - linkedin-${dateStr}.txt`);
    console.log(`   - twitter-${dateStr}.txt`);
    console.log(`   - reddit-${dateStr}.txt`);
}

module.exports = { runFullDigest };