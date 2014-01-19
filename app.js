var express = require('express');
var routes = require('./routes');
var user = require('./routes/user')
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/teamup');
var cookies = require("cookies")

var app = express();

var express = require('express');
var engine = require('ejs-locals');

app.engine('ejs', engine);
app.set('view engine', 'ejs');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('my secret here'));
app.use(express.cookieSession());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/helloworld', routes.helloworld);
app.get('/userpage', routes.userpage);
app.get('/controlpage', routes.controlpage);
app.get('/about_logged', routes.about_logged);
app.get('/about_unlogged', routes.about_unlogged);
app.get('/eventinfo', routes.eventinfo)

var userbase = db.get('teamup.users');
var teambase = db.get('teamup.teams');

app.post('/', function(req, res){

	var userName = req.body.username;
	var userPass = req.body.userpass;


	if (typeof req.body.signin !== 'undefined'){
		console.log(req.body.username);
		console.log(req.body.userpass);	
		console.log(userbase.find("Clark"));
		res.location('userpage');
		res.cookie("username", userName);
		res.redirect('userpage');
		res.send();
	}
	else if (typeof req.body.reguser !== 'undefined'){
		console.log(userbase.find("Alex"));
	}
	else if (typeof req.body.regevent !== 'undefined'){
		console.log(userbase.find("Turnips"));
	}
	
	// collection.insert({
	// 	'username' : userName,
	// 	'password' : userPass
	// }, function (err, doc) {
	// 	if (err) {
	// 		// If it failed, return error
	// 		res.send('There was a problem adding the information to the database.');
	// 	}
	// 	else {
	// 		// If it worked, set the header so the address bar doesn't still say /adduser
	// 		res.location('userpage');
	// 		res.cookie('username', userName);
	// 		// And forward to success page
	// 		res.redirect('userpage');
	// 	}
	// });


});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



