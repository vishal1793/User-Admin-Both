const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const router = require("./controller/router/router");
const mongoose = require("mongoose")
const app = express();
dotenv.config();

const PORT = process.env.Port
app.use(express.json())
app.use(cors());
app.use('/api', router)

mongoose.connect(process.env.DB)
.then(()=>{
    console.log('DB connected successfully')
})
.catch((err)=>{
    console.log('error found', err)
})


app.listen(PORT, ()=>{
    console.log(`connected to ${PORT}`);
    
})