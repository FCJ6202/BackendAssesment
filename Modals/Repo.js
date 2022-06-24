const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const { Schema } = mongoose;

const RepoSchema = new Schema({
    repoName : {
        type : String,
        required : true
    },

    repoDescription : {
        type : String,
        required : true
    },

    createrName : {
        type : String,
        required : true
    },

    stargazers : {
        type : Array,
        default : []
    },

    contributors : {
        type : Array,
        default : []
    },

    forks : {
        type : Array,
        default : []
    },

    commits : { // it nothing but array of object where first field is commit message and second field is date
        type : Array,
        default : []
    },

    visibility : {
        type : Boolean,
        default : false  // true for visibility for everyone but false for visibility only for creater and contributers
    },
    
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Repo', RepoSchema);