const Report = require("../models/Report")

module.exports = {

    getReports: async (req, res) => {
    try {
      const reports = await Report.find({})
      res.status(200).json(reports)
    } catch(err) {
      res.status(422).json({
        error: err.message,
        success: false,
        message: 'There was an error. Please try again later'
      })
    }
  },

  newReport: async (req, res) => {
    try {
      const newReport = new Report(req.body)
      const report = await newReport.save()
      res.status(200).json(report)
    } catch(err) {
      res.status(422).json({
        error: err.message,
        success: false,
        message: 'There was an error. Please try to add your report again later'
      })
    }
  }

}