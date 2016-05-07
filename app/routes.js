// Dependencies
var mongoose        = require('mongoose');
var User            = require('./usermodel.js');
var Scuba            = require('./scubamodel.js');

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
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    // Skateboard Routes
    // Camping Routes
    // Hiking Routes
    // Scuba Routes
        // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all scuba locations in the db
    app.get('/scubas', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Scuba.find({});
        query.exec(function(err, scubas){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all scuba locations
            res.json(scubas);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new scuba locations in the db
    app.post('/scubas', function(req, res){

        // Creates a new Scuba location based on the Mongoose schema and the post bo.dy
        var newscuba = new Scuba(req.body);

        // New Scuba is saved in the db.
        newscuba.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new scuba
            res.json(req.body);
        });
    });

};
