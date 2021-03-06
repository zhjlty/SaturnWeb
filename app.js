var path = require('path');

var express = require('express');

var exphbs  = require('express-handlebars');
var parser = require('ua-parser-js');

//express
var app = express();


app.engine('handlebars', exphbs({defaultLayout: 'pc'}));

// Set view path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
	var ua = parser(req.headers['user-agent']);
	var isMobile = ua.device.type == "mobile";
    isMobile?res.render('index-mobile/index',{layout: 'mobile'}):res.render('index-pc/index');
});

app.get('/detail', function (req, res) {
    var ua = parser(req.headers['user-agent']);
	var isMobile = ua.device.type == "mobile";
    isMobile?res.render('detail-mobile/index',{layout: 'mobile'}):res.render('detail-pc/index');
});

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));

//port
var port = 9002;
app.listen(port);

console.log('Server is Up and Running at Port : ' + port);
