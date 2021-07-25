const router = require("express").Router();
const user = require("../models/User")

router.get('/', (req, res) =>{
    res.status(200).send('Hey it is User Route');
})





module.exports = router;