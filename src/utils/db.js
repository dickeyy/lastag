// import mongo
const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to connect to the server
async function run() {
    try {
        // Connect the client to the server
        await client.connect().then(() => {
            console.log('Connected successfully to db');
        });
    } catch (error) {
        console.log(error);
    }
}

// Run the function
run().catch(console.dir);

// Export the client
module.exports = client;