import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const auth=(role)=>{
    
    return async(req,res,next)=>{
        try{
         if(req.headers.authorization===undefined){
              return res.status(203).send('token required');
         }
         const token=req.headers.authorization.split(" ")[1];
         
         jwt.verify(token,process.env.JWT_SEACRET,(err,decode)=>{
            if(err)console.log(err);
          
            req.session.user=decode;
            req.user=decode;
            if(role.includes(decode.role)){
                next();
            }
            else{
              return res.status(403).send("User does not access to this operation")
            }
          
         })
        }catch(err){
            console.log(err);
        }
    }
}