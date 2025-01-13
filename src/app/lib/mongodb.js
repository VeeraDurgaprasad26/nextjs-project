import mongoose from "mongoose";

const MONGODB_URL =process.env.MONGODB_URL
const mongoConnect = async() => {

    try{
  await mongoose.connect(MONGODB_URL)
  console.log("db connected");
    } catch(error){

console.log(error);

    }
}

export default mongoConnect