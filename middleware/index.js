//all the middleware goes here
var Comment = require("../models/comment");
var Racetrack = require("../models/racetrack");
var middlewareObj = {};

middlewareObj.checkRacetrackOwnership = function(req,res,next){
        //is user logged in
        if(req.isAuthenticated()){
         
         Racetrack.findById(req.params.id, function(err, foundRacetrack){
             if(err){
                 res.redirect("back");
             } else {
                 //does user own racetrack?
                 if(foundRacetrack.author.id.equals(req.user._id)){
                     next();
                 } else {
                     res.redirect("back");
                 }
                 
             }
         });
     } else {
 
         res.redirect("back");
     }

 }

 middlewareObj.checkCommentOwnership = function(req,res,next){
        //is user logged in
        if(req.isAuthenticated()){
         
         Comment.findById(req.params.comment_id, function(err, foundComment){
             if(err){
                 req.flash("error", "Racetrack not found");
                 res.redirect("back");
             } else {
                 //does user own comment?
                 if(foundComment.author.id.equals(req.user._id)){
                     next();
                 } else {
                    req.flash("error", "You don't have permission to do that");
                     res.redirect("back");
                 }
                 
             }
         });
     } else {
        req.flash("error", "You need to be logged in to do that");
         res.redirect("back");
     }
    
    }
    
 middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}
 


module.exports = middlewareObj;