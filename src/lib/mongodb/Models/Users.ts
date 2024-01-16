import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    photo: { 
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Users = models.Users || model('Users', UserSchema); 

export default Users;