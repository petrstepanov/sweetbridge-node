var express = require('express');
var router = express.Router();

var prettyjson = require('prettyjson');

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var twitterMentions;
client.get('statuses/mentions_timeline', {"count": 10}, function(error, tweets, response) {
  if(error) throw error;
  // console.log(prettyjson.render(tweets));  // The mentions.
  // console.log(response);  // Raw response object.
  twitterMentions = tweets;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    mentions: twitterMentions
  });
});

module.exports = router;
