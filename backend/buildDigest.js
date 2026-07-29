const fs = require('fs');
const { researchTopic } = require('./research');
const { summarizeResults } = require('./summarize');

async function buildDigest() {
    // Read our topics.json file
    const topicsData = JSON.parse(fs.readFileSync('topics.json', 'utf-8'));
    const allTopics = topicsData.core.concat(topicsData.optional);

    const digest = [];

    for (const topic of allTopics) {
        const research = await researchTopic(topic);
        const summary = await summarizeResults(research.topic, research.results);

        // Only include this topic in the digest if it actually has content
        if (summary.length > 0) {
            digest.push({
                topic: topic,
                items: summary,
            });
        } else {
            console.log(`⚠️  Skipping "${topic}" — nothing relevant found this week.`);
        }
    }

    return digest;
}

module.exports = { buildDigest };