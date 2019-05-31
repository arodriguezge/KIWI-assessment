const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    timestamp: String,
    id: String,
    type: String,
    status: String
}) 

module.exports = mongoose.model('Report', ReportSchema)