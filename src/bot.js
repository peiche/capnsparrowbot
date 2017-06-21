// bot features
const config = require('./config');
const reply = require('./api/reply');
const retweet = require('./api/retweet');
const tweet = require('./api/tweet');

// Post random quote
tweet();
setInterval(tweet, config.twitterConfig.rate);

// retweet tweets with 'Captain Jack Sparrow'
retweet();
setInterval(retweet, config.twitterConfig.rate);

// reply to 'Jack Sparrow' but not 'Captain Jack Sparrow'
reply();
setInterval(reply, config.twitterConfig.rate);