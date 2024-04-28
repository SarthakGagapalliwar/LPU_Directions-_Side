const express=require("express")
const app=express()
const hbs=require("hbs")
const path=require("path")
const collection=require("./mongodb")
const multer = require("multer"); // for handling file uploads
const Upload = require("./mongodb2"); // Import the Upload model
const { default: mongoose } = require("mongoose")
const tempelatePath=path.join(__dirname,'../tempelates')
const upload2 = multer({ dest: 'uploads/' })
// const nodemailer = require('nodemailer');
let nameG = null;
let emailG=null;
app.use(express.static('public'));
app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.static("js"));
app.use(express.static("tempelates"));
app.use(express.urlencoded({extended:false}))
// app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/home", async (req, res) => {
    try {
        const regNo = req.query['reg-no'];
        const user = await collection.findOne({ reg_no: regNo });
        if (user) {
            res.render("home", { name: user.name });
        } else {
            res.render("home", { errorMessage: "User not found" });
        }
    } catch (error) {
        console.error("Error rendering home page:", error);
        res.render("home", { errorMessage: "Something went wrong" });
    }
});


app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({reg_no: req.body['reg-no']});
        if (check) {
            // res.redirect("/home");
            res.redirect(`/home?reg-no=${req.body['reg-no']}`);
        } else {
            res.render("login", { errorMessage: "Wrong reg-no"});
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.render("login", { errorMessage: "Something went wrong" });
    }
});


app.get("/direction", (req, res) => {
    // Render a template related to navigation
    res.render("direction");
});

app.get("/help",(req,res)=>{
    res.render("help");
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    try {
        
            const data = {
                name: req.body.name,
                reg_no: req.body['reg-no']
            };
            

        await collection.insertMany([data]);
        res.redirect("home");
    } catch (error) {
        console.error("Error during signup:", error);
        res.render("signup", { errorMessage: "Error signing up" });
    }
});








const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // save uploaded files to 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // append timestamp to filename
    }
});

const upload = multer({ storage: storage });

// Handle form submission for file upload
// Handle form submission for file upload
app.post('/upload', upload.array('images'), (req, res) => {


    // Create a new document with form data
    const uploadData = new Upload({
        title: req.body.title,
        caption: req.body.caption,
        images: req.files.map(file => file.path) // Save file paths to MongoDB
    });

    // Save the document to MongoDB
    uploadData.save()
        .then(() => {
            res.send('Upload successful');
        })
        .catch((err) => {
            console.error('Error uploading:', err);
            res.status(500).send('Upload failed');
        });
});

app.listen(3000,()=>{
    console.log("Server is running");
})  