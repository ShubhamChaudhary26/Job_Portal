import mongoose from "mongoose";

const connectDB =async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("MongoDB Connected SuccesFully");
       
    }catch(error){
        console.log("Error : ",error);
    }
}
export default connectDB