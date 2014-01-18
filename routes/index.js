/*
 * GET home page
 */

exports.index = function(db) {
	return function(req, res){
		res.render('index', { title: 'Express' });

		var username = req.body.username;
		var password = req.body.password;
		console.log(username);
		console.log(password);
	};
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

exports.adduser = function(db) {
	return function(req, res) {

		// Get our form values. These rely on the 'name' attributes
		var userName = req.body.username;
		var userEmail = req.body.useremail;

		// Set our collection
		var collection = db.get('usercollection');

		// Submit to the DB
		collection.insert({
			'username' : userName,
			'email' : userEmail
		}, function (err, doc) {
			if (err) {
				// If it failed, return error
				res.send('There was a problem adding the information to the database.');
			}
			else {
				// If it worked, set the header so the address bar doesn't still say /adduser
				res.location('userlist');
				// And forward to success page
				res.redirect('userlist');
			}
		});

	}
}

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