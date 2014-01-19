function parseCookie (cookie) {
    var n = cookie.indexOf("=");
    return cookie.substring(n + 1, cookie.length);
}

exports.index = function(req, res){
		res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
	var user = req.cookies.username;
	res.render('helloworld', { username: user });
};
 
exports.userpage = function(userbase) {
	return function(req, res) {
		var id = parseCookie(req.headers.cookie);
		var user = userbase[findElement(userbase, id, function(a, b) {
			if (a.id == b) {
				return true;
			}
			return false; })];
		res.render('userpage', {"user": user});
	};
}

exports.controlpage = function(req, res) {
	var cookieTemp = req.headers.cookie;
	res.render('controlpage', { username: parseCookie(cookieTemp) });
};

exports.about_logged = function(req,res){
	var cookieTemp = req.headers.cookie;
	res.render('about_logged', { username: parseCookie(cookieTemp) });
};

exports.about_unlogged = function(req,res){
	var cookieTemp = req.headers.cookie;
	res.render('about_unlogged', { username: parseCookie(cookieTemp) });
};

exports.eventinfo = function(userbase, eventbase) {
	return function(req,res) {
		var id = parseCookie(req.headers.cookie);
		var user = userbase[findElement(userbase, id, function(a, b) {
			if (a.id == b) {
				return true;
			}
			return false; })];
		var curEvent = eventbase[findElement(eventbase, user.event, function(a, b) {
			if (a.name == b) {
				return true;
			}
			return false;
		})];

		res.render('eventinfo', { "event": curEvent, "username": user.name });
	}
}

function findElement(array, id, fn) {
	for (var i = array.length - 1; i >= 0; i--) {
		if (fn(array[i], id)) {
			return i;
		}
	};
	return -1;
}

