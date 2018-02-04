var express = require('express');
var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');


/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  const options = {
    uri: `http://www.theglitch.in/index.php/`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  let mytext = "D0loresH4ze";
  let m = "admasmd.as,md.,asm";

  rp(options)
  .then(($) => {
    mytext = $('p').map(function(i, el) {
      // this === el
      return $(this).text();
    }).get().join(' \n \n \n \n');
    console.log(mytext);

    res.json([{
      id: 1,
      username: m
    }, {
      id: 2,
      username: mytext
    }]);
  })
  .catch((err) => {
    console.log(err);
    mytext = err;
    
    res.json([{
      id: 1,
      username: m
    }, {
      id: 2,
      username: err
    }]);
  });

});

module.exports = router;
