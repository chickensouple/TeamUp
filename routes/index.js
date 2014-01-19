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
 
exports.userpage = function(req, res) {
	var cookieTemp = req.headers.cookie;
	res.render('userpage', { username: parseCookie(cookieTemp) });
};

exports.controlpage = function(req, res) {
	res.render('controlpage', { title: 'Controller Page'});
};

exports.teammates_page = function(req,res){
	res.render('teammates_page', { title: 'teammates page'}); 
};

exports.about_page = function(req,res){
	res.render('about_page', { title: 'about page'});
};
exports.contact_page = function(req,res){
	res.render('contact_page', { title: 'contact_page'});
};

