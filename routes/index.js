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
	res.render('helloworld', { title: 'Hello, World!' });
};

/*
 * GET DB Output page
 */


/* USER PAGE */ 
exports.userpage = function(req, res) {
	res.render('userpage', { title: 'user page' });
};

/*CONTROLLER PAGE*/ 
exports.controlpage = function(req, res) {
	res.render('controlpage', { title: 'Controller Page'});
};

exports.userpage_people = function(req, res) {
	res.render('userpage_people', { title: 'user page'});
};
