const express =require('express');
const router = express.Router();

const Contact = require('../model/contacts');
//retriving contacts
router.get('/contacts',(req,res,next)=>{
    Contact.find(function(err,contacts){
        res.json(contacts);
    })
})

//add contact
router.post('/contacts',(req,res,next)=>{
    let newContact = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone
    })
    //saving new contact into database
    newContact.save((err,contact)=>{
        if(err){
            res.json({msg: 'Failed to add contacts'});
        }
        else{
            res.json({msg: 'Contacts added successfully'});
        }
    });
});

//delete contacts
router.delete('/contacts/:id',(req, res, next)=>{
    Contact.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


module.exports = router;