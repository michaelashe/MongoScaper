// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape the NYTimes website
var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("https://www.newsarama.com/comics").then(function(res) {
    var $ = cheerio.load(res.data);
    // Make an empty array to save our article info
    var articles = [];
    // console.log(res.data)
    // Now, find and loop through each element that has the "theme-summary" class
    // (i.e, the section holding the articles)
    $(".post-header").each(function(i, element) {
        var head = $(element).children("a").attr("title");
        var url = $(element).children("a").attr("href");
            url = "https://www.newsarama.com" + url;
        var sum = $(element).children(".post-content").children(".post-desc").text().trim();   

      // So long as our headline and sum and url aren't empty or undefined, do the following
       if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
         var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
         var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

         var dataToAdd = {
           headline: headNeat,
           summary: sumNeat,
           url: url
         };

         articles.push(dataToAdd);
       }
    });
     return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;