
import { Schema,model } from "mongoose";

const userSchema=new Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
       type:String,
       require:true
    },
    role:{
        type:String,
        enum:['Adopter', 'PetCareProvider', 'Shelter','Rescue','Customer'],
        require:true,
        default:"Customer"
    }
    
},{collection:'users'})

export const USER=model('users',userSchema);
