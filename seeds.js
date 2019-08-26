var mongoose = require("mongoose");
var Racetrack = require("./models/racetrack");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "WeatherTech Raceway Laguna Seca", 
        image: "https://www.weathertechraceway.com/sites/main/files/imagecache/lightbox/main-images/img_6612.jpg?1559647569",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Sonoma Raceway", 
        image: "http://www.sonomaraceway.com/images/DJI_0117-lg.JPG",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Nurburgring", 
        image: "https://images.hgmsites.net/hug/lamborghini-aventador-svj-during-nrburgring-lap-record-attempt_100663989_h.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all racetracks
   Racetrack.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed racetracks!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few racetracks
            data.forEach(function(seed){
                Racetrack.create(seed, function(err, racetrack){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a racetrack");
                        //create a comment
                        Comment.create(
                            {
                                text: "Speed has never killed anyone, suddenly becoming stationary, that's what gets you.",
                                author: "Jeremy Clarkson"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    racetrack.comments.push(comment);
                                    racetrack.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;