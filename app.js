var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var Racetrack = require("./models/racetrack");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var seedDB = require("./seeds");
var methodOverride = require("method-override");

//requiring routes
var commentRoutes = require("./routes/comments");
var racetrackRoutes = require("./routes/racetracks");
var indexRoutes = require("./routes/index");


var url = process.env.DATABASEURI || "mongodb://localhost:27017/track_attack";
//seedDB();
//mongoose.connect("mongodb://localhost:27017/track_attack", { useNewUrlParser: true });

mongoose.connect(process.env.DATABASEURI, { useNewUrlParser: true });
//console.log(process.env.databaseURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret: "This is the secret sentence",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/racetracks",racetrackRoutes);
app.use("/racetracks/:id/comments",commentRoutes);

//Spin up server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The TrackAttack Server has started");
});