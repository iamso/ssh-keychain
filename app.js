var port = process.env.PORT || 8088,
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	fingerprint = require('ssh-fingerprint'),
	Datastore = require('nedb'),
	db = new Datastore({ filename: 'data/db', autoload: true }),
	pjson = require('./package.json');

app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));

// show help
app.get('/:email/help', function(req,res){
	res.contentType('text/plain');
	res.render('help.ejs', {email: req.params.email, url: urlScheme(req) + req.get('host')});
});

// get upload script
app.get('/:email/upload', function(req,res){
	res.contentType('text/plain');
	db.find({ email: req.params.email }, function (err, docs) {
		if (!docs.length) {
			res.render('upload.ejs', {url: urlScheme(req) + req.get('host') + '/' + req.params.email, keypath: req.query.keypath});
		}
		else {
			res.send('echo -e "\\033[31mSorry I just can\'t do it!\\033[0m"');
		}
	});
});

// get install script
app.get('/:email/install', function(req,res){
	res.contentType('text/plain');
	db.find({ email: req.params.email }, function (err, docs) {
		if (docs.length === 1) {
			res.render('install.ejs', {key: docs[0].key, fingerprint: fingerprint(docs[0].key)});
		}
		else {
			res.send('echo -e "\\033[31mNo key to install.\\033[0m"');
		}
	});
});

// get ssh key fingerprint
app.get('/:email/fingerprint', function(req,res){
	res.contentType('text/plain');
	db.find({ email: req.params.email }, function (err, docs) {
		if (docs.length === 1) {
			res.send(fingerprint(docs[0].key) + "\n");
		}
		else {
			res.send('No key found.');
		}
	});
});

// upload ssh key
app.put('/:email', function(req,res){
	res.contentType('text/plain');
	db.find({ email: req.params.email }, function (err, docs) {
		if (!docs.length) {
			db.insert({email: req.params.email, key: req.body.key, created: Date.now()}, function (err, newDoc){
				if (err === null) {
					res.send(fingerprint(req.body.key) + "\n");
				}
				else {
					res.send('Error uploading key.\n');
				}
			});
		}
	});
});

// get ssh key
app.get('/:email', function(req,res){
	res.contentType('text/plain');
	db.find({ email: req.params.email }, function (err, docs) {
		if (docs.length === 1) {
			res.send(docs[0].key);
		}
		else {
			res.send('No key found.');
		}
	});
});

// 404 error handling
app.use(function(req, res, next){
	res.contentType('text/plain');
	res.send('Nothing found.');
});

// 500 error handling
app.use(function(err, req, res, next){
	res.contentType('text/plain');
	res.send('Something went wrong.');
});

// return correct url scheme
var urlScheme = function(req) {
	return (req.headers['x-forwarded-proto'] || 'http') + '://';
};

// start server
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
