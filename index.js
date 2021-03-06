// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

//var databaseUri = 'mongodb://test:test123@ds025892-a0.mlab.com:25892,ds025892-a1.mlab.com:25892/heroku_qh1r0w7w?replicaSet=rs-ds025892';
var databaseUri = 'mongodb://test:test123@iad2-c11-2.mongo.objectrocket.com:53470,iad2-c11-1.mongo.objectrocket.com:53470,iad2-c11-0.mongo.objectrocket.com:53470/heroku_qh1r0w7w?replicaSet=def1cd68b2034c3d9e0d65e850794f19&retryWrites=false'

//var databaseUri = 'mongodb://heroku_qh1r0w7w:4mdednr5ib0i9r12gp93mpggd4@ds025892-a0.mlab.com:25892,ds025892-a1.mlab.com:25892/heroku_qh1r0w7w?replicaSet=rs-ds025892';
//var databaseUri = 'mongodb+srv://heroku_qh1r0w7w:terb1406@herokuqh1r0w7w.vcucm.mongodb.net/heroku_qh1r0w7w?retryWrites=true&w=majority';

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'thewrapappdlIeo58sl149jNeroU34',
  masterKey: process.env.MASTER_KEY || 'kgfiW2955dPfkLKwnbe82', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  enableAnonymousUsers: process.env.ANON_USERS || false,
  allowClientClassCreation: process.env.CLIENT_CLASS_CREATION || false,
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website1.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
