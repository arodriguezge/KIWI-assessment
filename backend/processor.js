const CSVToJSON = require('csvtojson')
const axios = require('axios')

const main = async () => {
    const data = await CSVToJSON().fromFile('./report.csv') //convert CVS file to JSON
    data.map(report => {
        axios.post('http://localhost:5000/api/reports/', report)
        .then(res => {
            console.log('The report has been successfully saved in your database')
        })
        .catch(err => {
            console.log(err)
        })
    })
}

(async () => {
    try {
        await main()
    } catch (e) {
        console.log(e)
    }
})()