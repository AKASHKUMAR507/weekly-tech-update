require('dotenv').config();

async function callGroq(prompt, maxTokens = 400) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: maxTokens,
            messages: [{ role: 'user', content: prompt }],
        }),
    });
    const data = await response.json();
    return data.choices[0].message.content.trim();
}

async function generateLinkedIn(tldr, digest) {
    const prompt = `Write a LinkedIn post summarizing this week's tech news, based on this TL;DR:
${tldr}

Style rules:
- Professional but personable tone, like a developer sharing insight, not a company posting an ad
- Start with a hook line (a question or bold statement)
- 3-5 short paragraphs or bullet points covering the key themes
- End with a genuine question to spark discussion
- No hashtag spam — max 3 relevant hashtags at the very end
- Do not use overly salesy language or emojis in every line

Return ONLY the post text, nothing else.`;

    return await callGroq(prompt, 500);
}

async function generateTwitter(tldr, digest) {
    const prompt = `Write a Twitter/X thread (4-5 tweets) summarizing this week's tech news, based on this TL;DR:
${tldr}

Style rules:
- Tweet 1: a punchy hook that makes people want to read more
- Tweets 2-4: one key story/theme per tweet, short and punchy
- Final tweet: a light closing thought or question
- Each tweet under 260 characters
- Number each tweet like "1/", "2/", etc.
- No hashtag spam, 1-2 max if any

Return ONLY the tweets, one per line, nothing else.`;

    return await callGroq(prompt, 500);
}

async function generateReddit(tldr, digest) {
    const prompt = `Write a Reddit post (like for r/technology) summarizing this week's tech news, based on this TL;DR:
${tldr}

Style rules:
- Conversational, neutral tone — Reddit hates anything that sounds like marketing
- Start with something like "Weekly tech roundup, thought this sub might find it interesting"
- Present it as genuinely useful info, not self-promotion
- Use plain paragraphs, no corporate buzzwords
- End with an open question to encourage discussion in comments

Return ONLY the post text, nothing else.`;

    return await callGroq(prompt, 500);
}

module.exports = { generateLinkedIn, generateTwitter, generateReddit };