const { MongoClient } = require('mongodb');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
        extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/get-profile', function (req, res) {
  MongoClient.connect('mongodb://admin:password@mongodb', function (err, client) {
    if (err) throw err;
    
    console.log('Successfully connected to mongodb client.');

    var db = client.db('user-account');
    var query = { userid: 1 };
    db.collection('users').findOne(query, function (err, result) {
      if (err) throw err;
      client.close();
      // Instead of sending the entire 'result' object, we'll send a subset of properties.
      var profile = {
        name: result.name,
        email: result.email,
        interests: result.interests
      };

      res.send(profile);
    });
  });
});

app.post('/update-profile', function (req, res) {
  var userObj = req.body;
  var response = res;

  console.log('connecting to the db...');

   MongoClient.connect('mongodb://admin:password@mongodb', function (err, client) {
    if (err) throw err;

    var db = client.db('user-account');
    userObj['userid'] = 1;
    var query = { userid: 1 };
    var newValues = { $set: userObj };

    console.log('successfully connected to the user-account db');

    db.collection('users').updateOne(query, newValues, { upsert: true }, function (err, res) {
      if (err) throw err;
      console.log('successfully updated or inserted');
      client.close();
      response.send(userObj);
    });
  });
});


app.get('/profile-picture', function (req, res){
        var img = fs.readFileSync(path.resolve(__dirname,'./images/profile-1.jpeg'));
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
});

app.listen(3000, function (){
        console.log("app listening on port 3000!");
});
