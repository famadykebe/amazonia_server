const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRoute = require('./route/userRoute');
const productRoute = require('./route/productRoute')
dotenv.config();
const mongodbUrl = process.env.MONGODB_URL;
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/api',userRoute)
app.use('/api',productRoute);



mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(res => {
    console.log('db connected !!!')
    
}).catch(error => {
    console.log(error.message)
})


app.listen(4000,(error) => {
   if(error){

   }else{
        console.log('serveur tourne')
   }
})
