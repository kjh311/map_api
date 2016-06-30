// Dependencies
// var express         = require('express');
var mongoose        = require('mongoose');
var User            = require('./model.js');
// var router          = express.Router();

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
    app.get('/users', function(req, res, next) {

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
    app.post('/users', function(req, res, next){

        // Creates a new User based on the Mongoose schema and the post body
        var newUser = new User({type: req.body.type, name: req.body.name, description: req.body.description, website: req.body.website, photo: req.body.photo, location: req.body.location});

        // New User is saved in the db.
        newUser.save(function(err){
            console.log('new user posted to db routes.js');
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });

//         // get one user
//     app.get("/users/:id", function(req, res) {
//   db.collection(test).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to get user");
//     } else {
//       res.status(200).json(doc);
//     }
//   });
// });

//PATCH
app.put('/users/:id', function(req, res, next) {
    var id = {_id: req.params.id};
    var update = {type: req.body.type, name: req.body.name, description: req.body.description, website: req.body.website, photo: req.body.photo, location: req.body.location};
    var options = {new: true};

    User.findOneAndUpdate(id, update, options, function(err, data){
        if (err) {
            res.json(err.message);

        }
        else {
            res.json(data);
        }
    });
});


//DELETE
app.delete('/users/:id', function(req, res, next) {
    User.findOneAndRemove({_id: req.params.id}, function(err, data){
        if (err) {
          res.json({message: 'cant delete cause I suck.'});
            res.json(err.message);
        }
        else if (data.length===0) {
            res.json({message: 'A user with that id does not exist in this database.'});
        }
        else {
            res.json({message: 'Success. Item deleted.'});
        }
    });
});

    });
};

