import React, { Component } from 'react'

class ViewOne extends Component {
    state = {
        isHidden: true,
        mostPopular: []
    }

    dateInput = React.createRef()

    getMostPopular = (date) => {
        const mostPopular = Object.values(this.props.dailyReports[date])
         .sort((a,b) => b.length - a.length)
         .slice(0,10)
        //console.log(mostPopular.map(device => device[0].id))

        this.setState({
            mostPopular: mostPopular
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const date = this.dateInput.current.value
        await this.getMostPopular(date)
        this.setState({
            isHidden: false
        })
    }

    render() {
        return (
            <div>
                <h4>Select a day to get the 10 most popular devices</h4>
                <form onSubmit={this.handleSubmit}>
                    <select className="" ref={this.dateInput}>
                        {Object.keys(this.props.dailyReports).map((date) => {
                            return <option value={date} key={`key-${date}`}>{date}</option>
                        })}
                    </select>
                    <button type="submit">Show devices</button>
                </form>
                {!this.state.isHidden && this.state.mostPopular.map(device => {
                        return (
                            <div  key={device[0].id}>
                                <h4>{device[0].id}</h4>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default ViewOne