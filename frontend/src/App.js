import React, { Component } from 'react'
import axios from 'axios'
import ViewOne from './components/ViewOne'
import ViewTwo from './components/ViewTwo'

class App extends Component {
  state = {
    dailyReports: []
  }

  loadItems = () => {
    let dailyReports = {}
    axios.get(`http://localhost:5000/api/reports/`)
      .then((res) => {
        res.data.map((report) => {
          const date = (report.timestamp).slice(0, 10)
          dailyReports[date] = dailyReports[date] || [] 
          dailyReports[date][report.id] = dailyReports[date][report.id] || []
          dailyReports[date][report.id].push(report)
        })
        
        this.setState({
          dailyReports: dailyReports
        })
      })
  }

  componentDidMount = () => {
    this.loadItems()
  }

  render() {
    return (
      <div>
       <ViewOne dailyReports={this.state.dailyReports}/>
       <ViewTwo dailyReports={this.state.dailyReports}/>
      </div>
    )
  }
}

export default App
