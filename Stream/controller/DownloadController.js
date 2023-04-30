const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

//import the env credentials
dotenv.config();

//download the csv file
exports.download = async (req, res) => {
    //get the all data from books collection
    dotenv.config();
    const mongoUri = process.env.MONGO_URI;
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('items');
    const data = await db.collection('books').find().toArray();
    //make the response as csv file and send
    res.setHeader('Content-Type','text/csv');
    res.setHeader('Content-Disposition','attachment; filename=\"'+ 'books.csv'+'\"');
    const csvData = [
        ['ID', 'Name', 'Price'].join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
    // Send the CSV data in the response
    res.send(csvData);
    client.close();
}