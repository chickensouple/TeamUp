function parseCookie (cookie) {
    var n = cookie.indexOf("=");
    console.log("n: "  + n)
    console.log(cookie.substring(n + 1, cookie.length));
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
		var username = parseCookie(req.headers.cookie);

		console.log(userbase.find({name: username}));
		userbase.find({name: username}, function(e, docs) {
			res.render('userpage', { username: parseCookie(cookieTemp) });
		});
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

exports.eventinfo = function(req,res) {
	var cookieTemp = req.headers.cookie;
	res.render('eventinfo', { username: parseCookie(cookieTemp) });
}
