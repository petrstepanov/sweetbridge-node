var express = require('express');
var router = express.Router();

var prettyjson = require('prettyjson');

// Get twitter mentions
var Twitter = require('twitter');
var twit = new Twitter({
  consumer_key: '2vzKk5lHOP9rWU77aLDKiYO7F',
  consumer_secret: 'WRVynNFoSV17Yp3rw3BQgQOvVdOFcKngFqDcEpSKOagZMK1VC7',
  access_token_key: '294332999-PfUnJ8Sqo3WIzyhyXCWuRik0hWaVtS7IJtTpSAkc',
  access_token_secret: 'isuhfQkF7en4WUuNW0T5hlKBs0aQTkRlAuetvAmk3bZZ4'
});

// Get home page
router.get('/', function(req, res, next) {
  twit.get('statuses/mentions_timeline', {"count": 10}, function(error, tweets, response) {
    if(error) throw error;
    // console.log(prettyjson.render(tweets));
    // console.log(response);
    res.render('index', {
      title: 'Sweetbridge. The economy of possible',
      mentions: tweets
    });
  });
});

module.exports = router;
