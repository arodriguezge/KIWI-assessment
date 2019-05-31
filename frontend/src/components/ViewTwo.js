import React, { Component } from 'react'
import '../styles/main.css'

class ViewTwo extends Component {
    state = {
        isHidden: true,
        reportByType: []
    }

    typeInput = React.createRef()

    getReportByType = (type) => {
        let reportByType = {}
        Object.keys(this.props.dailyReports).map((date) => {
            reportByType[date] = reportByType[date] || []
            Object.values(this.props.dailyReports[date]).map((array) => {
                array.map(report => {
                    if(report.type === type) {
                        reportByType[date][report.id] = reportByType[date][report.id] || []
                        reportByType[date][report.id].push(report)
                    }
                })
            })
        })

        this.setState({
            reportByType: reportByType
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const type = this.typeInput.current.value
        await this.getReportByType(type)
        this.setState({
            isHidden: false
        })
        
    }

    render() {
        return (
            <div>
                <h4>Select a type</h4>
                <form onSubmit={this.handleSubmit}>
                    <select className="" ref={this.typeInput}>
                        <option value="sensor">sensor</option>
                        <option value="gateway">gateway</option>
                    </select>
                    <button type="submit">Show devices</button>
                </form>
                <div>
                    {!this.state.isHidden && Object.keys(this.state.reportByType).map(date => {
                        return (
                            <table>
                                <thead>
                                    <tr>
                                        <th>{date}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(this.state.reportByType[date]).map(device => {
                                        return (
                                            <tr>
                                                <td>{device}</td> 
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ViewTwo