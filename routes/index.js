/*
 * GET home page
 */

exports.index = function(req, res){
		res.render('index', { title: 'Express' });
};

/*
 * GET Hello World page
 */
exports.helloworld = function(req, res){
	var user = req.cookies.username;
	res.render('helloworld', { username: user });
};

/*
 * GET DB Output page
 */
function parseCookie (cookie) {
    var n = cookie.indexOf("=");
    console.log("n: "  + n)
    console.log(cookie.substring(n + 1, cookie.length));
    return cookie.substring(n + 1, cookie.length);
}

/* USER PAGE */ 
exports.userpage = function(req, res) {
	var cookieTemp = req.headers.cookie;
	res.render('userpage', { username: parseCookie(cookieTemp) });
};

/*CONTROLLER PAGE*/ 
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
