var express = require('express');
var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');

router.post('/', function(req, res, next) {

  const requset = req;
  // console.log("req: ", req.body.urlData.url);

  const options = {
    uri: req.body.urlData.url,
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
