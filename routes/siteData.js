var express = require('express');
var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');

const ineed = require('ineed');
// const fss = require('fast-string-search');
// const stringSearcher = require('string-search');

scrapeWebsite1 = (req, res, next) => {
  // Scrape website using request-promise
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
      websiteText = $('p').map(function (i, el) {
        // this === el
        return { text: $(this).text() };
      }).get();
      // console.log(websiteText);

      res.json(websiteText);
    })
    .catch((err) => {
      console.log(err);
      websiteText = err;

      res.json(websiteText);
    });
}

scrapeWebsite2 = (req, res, next) => {
  // Scrape website using ineed
  const keywordsArray = req.body.urlData.keywords;
  const webURL = req.body.urlData.url;
  let textArray = [], texts = [], relevantTextArray = [], relevantTextArrayObj = {};
  ineed.collect.texts.from(webURL, function (err, response, result) {
    console.log(result);
    console.log("--------------------------------------------");
    console.log(response.statusCode);
    console.log(response.headers);
    textArray = result.texts;
    // res.json(textArray);

    if (keywordsArray.length > 0) {
      for (let i = 0; i < keywordsArray.length; i++) {
        let wordCount = 0;
        const keyword = keywordsArray[i];
        for (let j = 0; j < textArray.length; j++) {
          const str = textArray[j];
          console.log("*******************************************");
          // console.log("str", str);
          // console.log("keyword ", keyword);
          const wordsMap = {};
          const wordsArray = str.split(/\s+/);
          wordsArray.forEach(function (key) {
            if (wordsMap.hasOwnProperty(key)) {
              wordsMap[key]++;
            } else {
              wordsMap[key] = 1;
            }
          });

          console.log("wordsMap: ", wordsMap)

          if (wordsMap.hasOwnProperty(keyword)) {
            texts.push(str);
            wordCount = wordCount + 1;
          }

        }

        if(texts.length === 0) {
          texts.push("No matching text found");
        }

        relevantTextArrayObj = {
          word: keyword,
          wordCount: wordCount,
          texts: texts
        }

        console.log("relevantTextArrayObj: ", relevantTextArrayObj)
        relevantTextArray.push(relevantTextArrayObj);
      }
      console.log("relevantTextArray:  ", relevantTextArray);
      res.json(relevantTextArray);
    } else {
      res.json(textArray);
    }
  });
}

router.post('/', function (req, res, next) {
  scrapeWebsite2(req, res, next);
});

module.exports = router;
