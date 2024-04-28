const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginPage")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("fail to connected");

})

const UploadSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    },
    images: [{
      type: String, // Assuming you are storing file paths
      required: true
    }]
});

  
const Upload = mongoose.model('Upload', UploadSchema);

module.exports=Upload;