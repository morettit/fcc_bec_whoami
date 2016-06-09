var express = require('express');
var app = express();

app.set('views', __dirname + '/html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/',function(req,res) {
	res.render('default.html');
});

app.get('/api/whoami', function(req,res) {
    var headers = req.headers;
    var json = "{" +
               "\"ipaddress\": \"" + req.get("x-forwarded-for") + "\" , " +
               "\"language\": \"" + req.get("accept-language").split(',')[0] + "\" , " +
               "\"os\": \"" + req.get("user-agent").split(')')[0].split('(')[1] + "\"" +
               "}";
    res.end(JSON.stringify(JSON.parse(json)));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});