import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    username :{
        type : String,
        required: true
    },
    email : {
        type: String,
        unique : true,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    mySpace : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "WorkSpace",
    },
    sharedSpaces : [{
        sharedSpace : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'WorkSpace',
        }, 
        permission: {
            type : String,
            default : "Edit"
        }
    }],
})

const User = mongoose.model('Users', userSchema);
export default User;