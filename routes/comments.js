var express= require("express");
var router = express.Router({mergeParams: true});
var Racetrack = require("../models/racetrack");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find racetrack by id
    Racetrack.findById(req.params.id, function(err, racetrack){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {racetrack: racetrack});
        }
    });
 
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   Racetrack.findById(req.params.id, function(err, racetrack){
       if(err){
           console.log(err);
           res.redirect("/racetracks");
       } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    racetrack.comments.push(comment);
                    racetrack.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/racetracks/" + racetrack._id);
                }
            });
        }
   });
});

//comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
        res.render("comments/edit", {racetrack_id: req.params.id, comment: foundComment});
       }
    });
   
});

//comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/racetracks/" + req.params.id);
        }

    });
});

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findbyidandrmeove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success","Comment deleted");
            res.redirect("/racetracks/" + req.params.id);
        }
    });
});





module.exports = router;