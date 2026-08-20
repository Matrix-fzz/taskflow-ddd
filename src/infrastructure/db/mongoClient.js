const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

async function connect() {
    // In newer drivers, isConnected is deprecated/removed. 
    // We can just call connect() which is idempotent or check client.topology
    // For simplicity following the PDF but adapting slightly if needed.
    // Actually, let's stick to the PDF logic but be aware it might need tweak for v6 driver.
    // v4+ connect() is safe to call multiple times? 
    // Let's just call connect.
    await client.connect()
    return client.db('taskflow')
}

module.exports = { connect }
