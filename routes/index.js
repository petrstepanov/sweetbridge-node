var express = require('express');
var router = express.Router();

var prettyjson = require('prettyjson');
// var prettyjsonOptions = {
//   noColor: true
// };

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: '2vzKk5lHOP9rWU77aLDKiYO7F',
  consumer_secret: 'WRVynNFoSV17Yp3rw3BQgQOvVdOFcKngFqDcEpSKOagZMK1VC7',
  access_token_key: '294332999-PfUnJ8Sqo3WIzyhyXCWuRik0hWaVtS7IJtTpSAkc',
  access_token_secret: 'isuhfQkF7en4WUuNW0T5hlKBs0aQTkRlAuetvAmk3bZZ4'
});

var twitterMentions;
client.get('statuses/mentions_timeline', function(error, tweets, response) {
  if(error) throw error;
  console.log(prettyjson.render(tweets));  // The mentions.
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
