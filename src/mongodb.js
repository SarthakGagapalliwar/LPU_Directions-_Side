const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginPage")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("fail to connected");

})

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    reg_no:{
        type:Number,
        require: true
    }
})

const collection=new mongoose.model("Reg_numbers",LoginSchema);

module.exports=collection;