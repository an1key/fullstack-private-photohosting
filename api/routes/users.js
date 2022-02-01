const express = require('express');
const router = express.Router();

var users = [
    {
        id:1,
        nickName:"an1key",
        passsha1:"d23k23doke",
        status:2
    }
]

router.get('/', (req,res) => {
    console.log(users)
    res.send(users)
});
router.post('/', (req,res) => {
 
    console.log(req.body)
    users.find((user, i) => {
        if(user.id == req.body.id) users[i].status = req.body.status;
    })

    res.send(users)
})

module.exports = router;