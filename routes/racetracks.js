var express= require("express");
var router = express.Router();
var Racetrack = require("../models/racetrack");
var middleware = require("../middleware/index.js");

//index show all racetracks
router.get("/", function(req,res){
    
    //get all racetracks from DB
    Racetrack.find({}, function(err, allracetracks){
        if(err){
            console.log(err);
        } else{
            res.render("racetracks/index", {racetracks:allracetracks, currentUser: req.user});
        }
    });
    //res.render("racetracks",{racetracks:racetracks});
});

//post route to add to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form and add to racetracks array
    //redirect back to racetracks page
    var name = req.body.name;
    var image = req.body.image;
    var price  =req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRacetrack={name:name, price: price, image: image, description: desc, author: author};
    //racetracks.push(newRacetrack);
    //create a new racetrack and save to DB
    Racetrack.create(newRacetrack, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/racetracks");
        }
    });
    //res.redirect("/racetracks");
    
});

//new form to create racetrack
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("racetracks/new");
});

//show more info about 1 racetrack
router.get("/:id", function(req,res){
    //find racetrack with provided id
    Racetrack.findById(req.params.id).populate("comments").exec(function(err, foundRacetrack){
        if(err){
            console.log(err);
        }else{
            res.render("racetracks/show", {racetrack: foundRacetrack});
        }
    });

});

//edit racetrack route
router.get("/:id/edit", middleware.checkRacetrackOwnership, function(req, res){
 
        Racetrack.findById(req.params.id, function(err, foundRacetrack){
            
                    res.render("racetracks/edit", {racetrack: foundRacetrack});
                

        });
    
});

//update racetrack route
router.put("/:id", middleware.checkRacetrackOwnership, function(req, res){
    
    //find and update correct racetrack and redirect somewhere
    Racetrack.findByIdAndUpdate(req.params.id, req.body.racetrack, function(err, updatedRacetrack){
        if(err){
            res.redirect("/racetrack");
        } else {
            res.redirect("/racetracks/" + req.params.id);
        }
    });
});

//destroy racetrack route
router.delete("/:id", middleware.checkRacetrackOwnership, function(req,res){
    Racetrack.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/racetracks");
        } else {
            res.redirect("/racetracks");
        }

    });

});

router.get("/:comment_id/edit", function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
        res.render("comments/edit", {racetrack_id: req.params.id, comment: foundComment});
       }
    });
   
});






module.exports = router;