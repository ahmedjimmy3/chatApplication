import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/chatApp')
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error))
}

export default dbConnection