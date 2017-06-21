'use strict';

const Twit = require('twit');
const unique = require('unique-random-array');
const config = require('../config');

const param = config.twitterConfig;
const queryString = unique(param.replyQueryString.split(','));
const randomReply = unique(config.responses.replies);

const bot = new Twit(config.twitterKeys);

function tweetNow(id, text) {
  
  //console.log(id);
  //console.log(text);
  
  let tweet = {
    status: text,
    in_reply_to_status_id: id
  };
  
  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.log('ERRORDERP Reply', err);
    }
    console.log('SUCCESS: Replied: ', text);
    //console.log(data);
  });
  
}

const reply = () => {

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
      
      const rando = Math.floor(Math.random() * param.searchCount) + 1;
      let status = data.statuses[rando];
      let id = status.id_str;
      let screenName = status.user.screen_name;
      const response = randomReply();
      const res = response.replace('${screenName}', screenName);
      
      //console.log('REPLYING TO: ' + status.text);
      
      /**
       * Sometimes the search will bring back a result based on the user name, 
       * not the content of the tweet. For this reason, we're wrapping the 
       * function call with a check to make sure the tweet contains the text 
       * "Jack Sparrow".
       */
      if (status.text.toLowerCase().indexOf('jack sparrow') != -1) {
        //console.log('respond');
        tweetNow(id, res);
      } else {
        console.log('ERROR: tweet does not contain proper text, rerunning search.');
        reply();
      }
      
    }
  });
};

module.exports = reply;