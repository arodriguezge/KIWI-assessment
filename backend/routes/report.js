const express = require('express')
const router = express.Router()

const {
    newReport,
    getReports
} = require('../controllers/reportController')  

router.post('/', newReport)

router.get('/', getReports)

module.exports = router