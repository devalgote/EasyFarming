//require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const expressValidator = require('express-validator')

const cors=require("cors")
const dotenv = require('dotenv'); 
dotenv.config();

//app
const app=express()

//import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const farmerRoutes = require("./routes/farmer");
const vegetablesRoutes = require("./routes/vegetables")

//database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    //useUnifiedTopology= true

}).then(()=>console.log("DB Connected"));


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", farmerRoutes);
app.use("/api", vegetablesRoutes)

const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log('Server is running on ${port}');
});
