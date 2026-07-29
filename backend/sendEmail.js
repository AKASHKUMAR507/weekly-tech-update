require('dotenv').config();

async function sendDigestEmail(markdownContent, dateStr) {
    // Very basic Markdown-to-HTML conversion — just enough to make it readable in email
    const htmlContent = markdownContent
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
        .replace(/\n/gim, '<br>');

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: 'Tech Digest <onboarding@resend.dev>',
            to: [process.env.MY_EMAIL],
            subject: `📰 Your Weekly Tech Digest — ${dateStr}`,
            html: htmlContent,
        }),
    });

    const data = await response.json();

    if (data.error || !response.ok) {
        console.log('Email error:', data);
        return false;
    }

    console.log('Email sent! ID:', data.id);
    return true;
}

module.exports = { sendDigestEmail };