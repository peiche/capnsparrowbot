'use strict';

const Twit = require('twit');
const unique = require('unique-random-array');
const config = require('../config');
const randomQuote = unique(config.responses.quotes);

const bot = new Twit(config.twitterKeys);

function tweetNow(text) {
  
  //console.log(text);

  if (tweet.length <= 140) { // just in case
  
      let tweet = {
        status: text
      };
      
      bot.post('statuses/update', tweet, (err, data, response) => {
      if (err) {
        console.log('ERRORDERP Tweet', err);
      }
      console.log('SUCCESS: Tweeted: ', text);
      //console.log(data);
      
    });
  }

}

const tweet = () => {
    
    tweetNow(randomQuote());
    
};

module.exports = tweet;