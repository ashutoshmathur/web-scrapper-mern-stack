var express = require('express');
var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');


/* GET users listing. */
router.post('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  const requset = req;
  // console.log("req: ", req);

  // And insert something like this instead:
  const options = {
    uri: `http://www.theglitch.in/index.php/`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  let websiteText = "";

  rp(options)
  .then(($) => {
    websiteText = $('p').map(function(i, el) {
      // this === el
      return {text: $(this).text()};
    }).get();
    // console.log(websiteText);

    res.json(websiteText);
  })
  .catch((err) => {
    console.log(err);
    websiteText = err;
    
    res.json(websiteText);
  });

});

module.exports = router;
