require('dotenv').config();

const responses = require('./data/responses.json');

module.exports = {
  twitterKeys: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  twitterConfig: {
    replyQueryString: process.env.REPLY_QUERY_STRING,
    retweetQueryString: process.env.RETWEET_QUERY_STRING,
    resultType: process.env.RESULT_TYPE,
    language: process.env.LANG_LOCALE,
    username: process.env.TWITTER_USERNAME,
    rate: process.env.TWITTER_RATE * 1000 * 60,
    searchCount: process.env.TWITTER_SEARCH_COUNT
  },
  responses: responses
};