var settings = require('../settings');
var { MongoClient } = require('mongodb');

var client = new MongoClient(`mongodb://${settings.host}:${settings.port}`, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client.db(settings.db);
