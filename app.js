var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");

app.get("/", function(req, res){
    res.render("search");
})

app.get("/result",function(req, res){
    var query = req.query.search;
    var options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/find',
        qs: {q: query},
        headers: {
          'x-rapidapi-host': '<api host>',
          'x-rapidapi-key': '<api Key>',
          useQueryString: true
        }
      };
    request(options, function(error, response, body){
        if(!error && response.statusCode === 200){
            var data = JSON.parse(body);
            res.render("results", {data: data.results});
        }
    });
});

app.listen(process.env.PORT || 3000,process.env.IP,function(){
    console.log("server started");
});
