const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema =mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        
    },    
    photo:{
        type:String,
        required:false
    } ,   
    username:{
        type:String,
        required:true,

    },
    likes:{
        type:Number,
        default:0   
    },
    comments:[{
        text:String,
        postedBy: {type: ObjectId, ref: "User"},
        postedByUser: {type: String, ref: "User"},
    }]    
    ,
    categories:{
        type:Array,
        required:false,

    },
    
},
{timestamps:true}
);

module.exports = mongoose.model("Post",postSchema);

