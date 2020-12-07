const express = require('express');
const {productsModel} = require('../models/Model');
const getToken = require('../utils')
const router = express.Router();

router.get('/products',(req,res) => {
    productsModel.find({},(err,result) =>{
        if(err){
            res.send({message:err})
        }else{
            res.json(result)
        }
    })
})

router.get('/product/:id',(req,res) => {

    const productId = req.params.id;

    productsModel.findById({_id : productId},(error,result) => {
        if(error){
            res.send({msg:error})
        }else{
            res.send(result)
        }
    })
})

router.delete('/product/:id',async(req,res) => {
    try{
        const result  = await  productsModel.findById({_id:req.params.id});

        if(result){
            result.remove();
            res.json({msg:'votre Article à bien était supprimer'})
        }
    
    }catch(error){
        res.status(401).send({msg:'id of this article was not found'})
    }
    
})

module.exports = router