var express = require('express');
var router = express.Router();

var testTitle = "";
var testDescription = "";
var FeedParser = require('feedparser')
  , request = require('request');

var req = request('http://shortandsweet9.tumblr.com/rss')
  , feedparser = new FeedParser();

req.on('error', function (error) {
	  // handle any request errors
	  console.log('req error');
	});
	req.on('response', function (res) {
	  var stream = this;

	  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

	  stream.pipe(feedparser);
	});


	feedparser.on('error', function(error) {
	  // always handle errors
	  console.log('parse error');
	});
	feedparser.on('readable', function() {
	  // This is where the action is!
	  var stream = this
	    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
	    , item;

	  while (item = stream.read()) {
	    // console.log(item);
	    testTitle = item.title;
	    testDescription = item.description;
	    console.log(item.title);
	    console.log(item.description);
	  }
	});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: testTitle , description: testDescription});
});

module.exports = router;
