// import mongo
const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export the client
module.exports = client;