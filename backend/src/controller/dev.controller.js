/**
 * Fetches article data from DEV.to API
 * 
 * @route GET /v1/dev/article-data
 * @description Retrieves a specific article's title and HTML content from DEV API
 * @access Public
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with article title and body_html
 * 
 * @throws {500} Internal server error if API request fails
 */

const fetchArticleData = async(req, res) => {
    try {
        // Make authenticated request to DEV API for specific article
        // Article ID is hardcoded for now - should be dynamic via req.params
        const response = await fetch('https://dev.to/api/articles/3205431', {
            headers: {
                'api-key': process.env.DEV_TO_API_KEY,
            }
        })
        const article = await response.json()

        // Return only required fields to minimize payload size
        res.status(200).json({
            title: article.title, 
            body_html: article.body_html
        });

    } catch (error) {
        // Log error for debugging and return user-friendly message
        console.error("Error fetching article data:", error);
        res.status(500).json({ error: error.message })
    }
}

export default fetchArticleData;   