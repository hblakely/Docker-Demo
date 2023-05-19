const { MongoClient } = require('mongodb');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.json()); // Required to parse JSON request bodies

app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
});

// Connecting to MongoDB only worked after making async.
app.get('/get-profile', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://admin:password@mongodb', {
      useUnifiedTopology: true
    });

    console.log('Successfully connected to MongoDB.');

    const db = client.db('user-account');
    const query = { userid: 1 };

    const result = await db.collection('users').findOne(query);

    const profile = {
      name: result.name,
      email: result.email,
      interests: result.interests
    };

    client.close();

    res.send(profile);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

// Connecting to MongoDB only worked after making async.
app.post('/update-profile', async (req, res) => {
  const userObj = req.body;

  console.log('Connecting to the database...');

  try {
    const client = await MongoClient.connect('mongodb://admin:password@mongodb', {
      useUnifiedTopology: true
    });

    const db = client.db('user-account');
    const query = { userid: 1 };
    const newValues = { $set: userObj };

    console.log('Successfully connected to the user-account database.');

    db.collection('users').updateOne(query, newValues, { upsert: true }, (err, result) => {
      if (err) {
        console.error('Error updating or inserting the document:', err);
        client.close();
        return res.status(500).send('An error occurred while updating or inserting the document.');
      }

      console.log('Successfully updated or inserted the document.');
      client.close();
      res.send(userObj);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

app.get('/profile-picture', function (req, res){
        var img = fs.readFileSync(path.resolve(__dirname,'./images/profile-1.jpeg'));
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
});

app.listen(3000, function (){
        console.log("app listening on port 3000!");
});
