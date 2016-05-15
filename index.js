// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var mongoose = require('mongoose');
var users = require('./routes/users');
var posts = require('./routes/posts');
var likes = require('./routes/likes');
var comments = require('./routes/comments');
var bodyParser = require('body-parser');
var cors = require('cors')

var databaseUri = 'mongodb://localhost/fashionshare';

mongoose.connect(databaseUri);

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost/fashionshare',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'fashionshare',
  masterKey: process.env.MASTER_KEY || 'master', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

app.use('/api/v1', users);
app.use('/api/v1', posts);
app.use('/api/v1', likes);
app.use('/api/v1', comments);

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);

mongoose.connection.once('open', function() {
  httpServer.listen(port, function() {
      console.log('parse-server-example running on port ' + port + '.');
  });
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
