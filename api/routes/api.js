const express = require('express');
const router = express.Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt')
var dbManager = require('../db/dbManager.js')

router.get('/reg', (req,res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/registration.html')
});
router.post('/reg', (req,res) => {
    if(!req.body.nickName || !req.body.password) return res.send('Unknown User!')
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) return (err);
                console.log(`${hash}     `);
                var user = {
                    nickName: req.body.nickName,
                    uuid: uuidv4(),
                    permissionStatus: 0,
                    passwordHash: hash,
                    salt: salt
                };
                console.log(user.passwordHash);
                dbManager.addUser(user);
            });
        });
    }

})




module.exports = router;