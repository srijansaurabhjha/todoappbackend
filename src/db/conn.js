const mongoose=require('mongoose');

//Connecting to MongoDB atlas
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB).then(()=>{
    console.log(`Connection with server is established`);
}).catch((err)=>{
    console.log(`Connection is not established`);
    console.log(err);
})