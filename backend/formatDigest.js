require('dotenv').config();

async function generateTLDR(digest) {
    // Flatten all headlines into one text block for the AI to summarize
    const allHeadlines = digest
        .map(section => section.items.map(item => `- ${item.headline}`).join('\n'))
        .join('\n');

    const prompt = `Below are this week's tech headlines across several topics. Write a 3-4 bullet point TL;DR summarizing the most important overall themes of the week. Keep each bullet under 20 words. Return ONLY the bullet points as plain text, one per line, starting with "- ".

Headlines:
${allHeadlines}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 200,
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

function formatAsMarkdown(digest, tldr, dateStr) {
    let markdown = `# 📰 Weekly Tech Digest — ${dateStr}\n\n`;
    markdown += `## TL;DR\n${tldr}\n\n`;
    markdown += `---\n\n`;

    for (const section of digest) {
        markdown += `## ${section.topic}\n\n`;
        for (const item of section.items) {
            markdown += `### ${item.headline}\n`;
            markdown += `${item.summary}\n`;
            markdown += `🔗 [Read more](${item.url})\n\n`;
        }
    }

    return markdown;
}

module.exports = { generateTLDR, formatAsMarkdown };