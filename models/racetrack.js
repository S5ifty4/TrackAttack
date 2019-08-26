var mongoose = require("mongoose");
var racetrackSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});
//var Racetrack = mongoose.model("Racetrack", racetrackSchema);

module.exports = mongoose.model("Racetrack", racetrackSchema);