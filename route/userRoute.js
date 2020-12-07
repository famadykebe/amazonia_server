const express = require('express');
const {userModel} = require('../models/Model');
const {getToken} = require('../utils')
const router = express.Router();

router.post('/signin',async(req,res) => {
    const {email,password} = req.body;    
    const result = await userModel.findOne({
        email:email,
        password:password
    })

    if(result){
        res.send(
            {
                _id:result._id,
                name:result.name,
                email:result.email,
                token:getToken(result)
            }
        )
    }else{
        res.status(401).json({msg:'email or password invalid !'})
    }

  
})

router.post('/singup',async (req,res) => {
    const {name,email,password} = req.body;

    console.log('Hellow word ')

    const register = userModel({
        name:name,
        email:email,
        password:password
    })

  
    register.save().then(result => {

        res.send( {
            _id:result._id,
            name:result.name,
            email:result.email,
            token:getToken(result)
        })
       
    }).catch(error => {
        
        if(error.keyPattern.email > 0){
            res.json({msg:"Email address already exists"})
        }
    })
})




module.exports = router
