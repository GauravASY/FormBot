import mongoose,{ Schema } from "mongoose";


const formSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    content : [{
        Category : String,
        Icon : String,
        Type: String,
        Value : String
    }],
    responses : [{
        email : {
            type : String,
            required : true,
            unique: true
        },
        submittedAt : String,
        data : [{
            value : String,
            category : String
        }]
    }],
    visitCount : {
        type : Number,
        default : 0
    },
    start : {
        type : Number,
        default : 0
    }
});

const folderSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    forms : {
        type : [formSchema],
        default : []
    }
});

const workspaceSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    folders : {
        type: [Schema.Types.ObjectId], 
        ref: "Folder",
        default: [],
    },
    forms : {
        type : [formSchema],
        default : []
    }
});

const Folder = mongoose.model("Folder", folderSchema);
const WorkSpace = mongoose.model('WorkSpace', workspaceSchema);

export  {WorkSpace, Folder};