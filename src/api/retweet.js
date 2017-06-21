'use strict';

const Twit = require('twit');
const unique = require('unique-random-array');
const config = require('../config');

const param = config.twitterConfig;
const queryString = unique(param.retweetQueryString.split(','));

const bot = new Twit(config.twitterKeys);

const retweet = () => {

  const query = queryString();
  
  bot.get('search/tweets', {
    q: query,
    result_type: param.resultType,
    lang: param.language,
    filter: 'safe',
    count: param.searchCount
  }, (err, data, response) => {
    if (err) {
      console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err);
    } else {
      // grab tweet ID to retweet
      const rando = Math.floor(Math.random() * param.searchCount) + 1;
      let retweetId, screenName;

      //console.log(data.statuses[rando]);

      try {
        retweetId = data.statuses[rando].id_str;
        screenName = data.statuses[rando].screen_name;
      } catch (e) {
        console.log(e);
        console.log('ERRORDERP: Cannot assign retweet ID');
        return;
      }
      
      /**
       * Sometimes the search will bring back a result based on the user name, 
       * not the content of the tweet. For this reason, we're wrapping the 
       * function call with a check to make sure the tweet contains the text 
       * "Captain Jack Sparrow".
       * 
       * Also, make sure we don't retweet something we've tweeted ourselves. #yodawg
       */
      if (data.statuses[rando].text.toLowerCase().indexOf('captain jack sparrow') != -1
          && screenName !== config.twitterConfig.username) {
      
        bot.post('statuses/retweet/:id', {
          id: retweetId
        }, (err, response) => {
          if (err) {
            console.log('ERRORDERP: Retweet!');
          }
          console.log('SUCCESS: RT: ', data.statuses[rando].text);
        });
        
      } else {
        console.log('ERROR: tweet does not contain proper text, rerunning search.');
        retweet();
      }
      
    }
  });
};

module.exports = retweet;