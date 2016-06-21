// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');

// not sure where this goes
// https://github.com/soplakanets/node-forecastio
// var ForecastIo = require('forecastio');

// var forecastIo = new ForecastIo('3230f84c79e173d82bf07aa89fa056b8');
// forecastIo.forecast('51.506', '-0.127').then(function(data) {
//   console.log(JSON.stringify(data, null, 2));
// });


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
            console.log('get all users from db routes.js');
        });
    });



    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            console.log('new user posted to db routes.js');
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });

        // get one user
    app.get("/users/:id", function(req, res) {
  db.collection(test).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

// patch one user
    app.put("/users/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(test).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      res.status(204).end();
    }
  });
});

// delete one user
  app.delete("/users/:id", function(req, res) {
  db.collection(test).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(204).end();
    }
  });
});

    });


};

