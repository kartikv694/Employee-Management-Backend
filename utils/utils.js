// Import Files
import bcrypt from "bcrypt";

// pasword Hashing
export const hashedPassword = async (password)=>{
    try {
        const saltRound = 10;
       return await bcrypt.hash(password,saltRound)
    } catch (error) {
        console.log(error)
    }
}

// comparing password
export const comparePassword = async (password,hashPass) => {
   try {
     return await bcrypt.compare(password,hashPass)
   } catch (error) {
    console.log(error)
   }
   
}