var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/", function(req,res){
    res.render("landing");
});


//Register Form Route
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to TrackAttack " + req.body.username);
            res.redirect("/racetracks");
        });
    });
    
});

//show login form
router.get("/login", function(req, res){

    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local", 
    {
    successRedirect: "/racetracks",
    failureRedirect: "/login"
    }), function(req, res){

});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/racetracks");
})



module.exports = router;