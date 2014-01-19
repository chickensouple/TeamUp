var express = require('express');
var routes = require('./routes');
var user = require('./routes/user')
var http = require('http');
var path = require('path');
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/teamup');
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

userbase = []
eventbase = []

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/userpage', routes.userpage(userbase));
app.get('/controlpage', routes.controlpage(userbase));
app.get('/about_logged', routes.about_logged);
app.get('/about_unlogged', routes.about_unlogged);
app.get('/eventinfo', routes.eventinfo(userbase, eventbase))


function findElement(array, id, fn) {
	for (var i = array.length - 1; i >= 0; i--) {
		if (fn(array[i], id)) {
			return i;
		}
	};
	return -1;
}


app.post('/sign', function(req, res){

	var userName = req.body.username;
	var userPass = req.body.userpass;

console.log("userbase name: " + userbase[0].name);
		console.log("userbase pass: " + userbase[0].password);
	for (var i = userbase.length - 1; i >= 0; i--) {
		


		if (userbase[i].name == userName && userbase[i].password == userPass) {
			res.location('userpage');
			res.cookie('id', userbase.length - 1);
			// And forward to success page
			res.redirect('userpage');
		}
	};
	res.redirect('/');
});

app.post('/regevent', function(req, res){


	var eventName = req.body.eventname;
	var locationName = req.body.locationname;
	var dateandtime= req.body.dateandtime;
	var description = req.body.description;

	var newEvent = new Object();
	newEvent.name = eventName;
	newEvent.location = locationName;
	newEvent.dateandtime = dateandtime;
	newEvent.description = description;

	eventbase.push(newEvent);

	// res.location('userpage');
	// res.cookie('username', userName);
	// And forward to success page
	// res.redirect('userpage');
	res.redirect('/')
});

app.post('/reguser', function(req, res){

	var userName = req.body.username;
	var userPass = req.body.userpass;
	var userEmail = req.body.email;
	var userPhone = req.body.phonenumber;
	var userEvent = req.body.eventname;

	if (findElement(eventbase, userEvent, function(a, b) {
		if (a.name == userEvent) {
			return true;
		}
		return false;
	}) != -1) {
		var user = new Object();
		user.name = userName;
		user.password = userPass;
		user.email = userEmail;
		user.phone = userPhone;
		user.event = userEvent;

		user.task = "no task";
		user.task_location = "no location";
		user.task_time = "no time";
		user.task_desc = "nothing";
		user.id = userbase.length;


		userbase.push(user);

		console.log(userbase);

		res.location('userpage');
		res.cookie('id', userbase.length - 1);
		// And forward to success page
		res.redirect('userpage');
	} else {
		res.redirect('/');
	}
	
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



