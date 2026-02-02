import crypto from 'crypto';

const generateOAuthHeader = (method, url, params = {}) => {
    const oauth = {
        oauth_consumer_key: process.env.X_API_KEY,
        oauth_token: process.env.X_ACCESS_TOKEN,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_nonce: crypto.randomBytes(32).toString('base64').replace(/\W/g, ''),
        oauth_version: '1.0',
    };

    const allParams = { ...oauth, ...params };
    const sortedParams = Object.keys(allParams)
        .sort()
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
        .join('&');

    const signatureBase = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`;
    const signingKey = `${encodeURIComponent(process.env.X_API_SECRET)}&${encodeURIComponent(process.env.X_ACCESS_TOKEN_SECRET)}`;
    const signature = crypto.createHmac('sha1', signingKey).update(signatureBase).digest('base64');

    oauth.oauth_signature = signature;

    return 'OAuth ' + Object.keys(oauth)
        .sort()
        .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauth[key])}"`)
        .join(', ');
};

const postArticle = async (tweetText) => {
    try {
        const url = 'https://api.x.com/2/tweets';
        const authHeader = generateOAuthHeader('POST', url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: tweetText
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`X API Error: ${JSON.stringify(data)}`);
        }

        console.log("Tweet posted successfully:", data);
        return data;
    } catch (error) {
        console.error("Error posting to X:", error);
        throw error;
    }
};

export default postArticle; 