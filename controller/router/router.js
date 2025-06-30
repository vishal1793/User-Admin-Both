const express = require("express")
const { getData, postData, putData, deleteData, loginData, verifyToken, readData } = require("../CRUD/crud")
const router = express.Router()

router.get('/readdata', readData)
router.get('/data', verifyToken, getData)
router.post('/savedata', postData)
router.put('/editdata/:id', putData)
router.delete('/deletedata/:id', deleteData)
router.post('/logindata', loginData)

module.exports = router