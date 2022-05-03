const express=require('express')
const sendQuoteMail=require('../controller/SendQuoteMail')
const router=express.Router();
router.post('/sendQuoteMail',sendQuoteMail.sendQuoteMail)
module.exports=router
