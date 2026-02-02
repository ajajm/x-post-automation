import fetchArticleData from '../controller/dev.controller.js';
import main from '../controller/summarise.controller.js';
import postArticle from '../controller/x.controller.js';

const pipeline = async (_, res) => {
  try {
    const articleData = await fetchArticleData();
    const summary = await main(articleData);
    const postTweet =await postArticle(summary);

    res.status(200).json({ postTweet });
    return postTweet;

  } catch (error) {
    console.error("Error in pipeline:", error);
    res.status(500).json({ error: error.message })
  }
}

export default pipeline;