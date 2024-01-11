// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {timeElapsedInSec: 0, activeBtn: 'reset'}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearStopWatch()
  }

  clearStopWatch = () => clearInterval(this.timerId)

  getTimeString = () => {
    const {timeElapsedInSec} = this.state
    const minutes = Math.floor(timeElapsedInSec / 60)
    const seconds = Math.floor(timeElapsedInSec % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementTimeElapsed = () => {
    this.setState(prevState => ({
      timeElapsedInSec: prevState.timeElapsedInSec + 1,
    }))
  }

  onStart = () => {
    this.timerId = setInterval(this.incrementTimeElapsed, 1000)
    this.setState({activeBtn: 'start'})
  }

  onStop = () => {
    this.clearStopWatch()
    this.setState({activeBtn: 'stop'})
  }

  onReset = () => {
    this.clearStopWatch()
    this.setState(initialState)
  }

  render() {
    const {activeBtn} = this.state
    return (
      <div className="stopwatch-app-container">
        <div className="sub-stopwatch-app-container">
          <h1 className="app-title">Stopwatch</h1>
          <div className="stopwatch-container">
            <div className="stopwatch-img-name-container">
              <img
                className="stopwatch-img"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="stopwatch-desc">Timer</p>
            </div>
            <h1 className="stopwatch-value">{this.getTimeString()}</h1>
            <div className="btn-container">
              <button
                type="button"
                className="button"
                onClick={this.onStart}
                disabled={activeBtn === 'start'}
              >
                Start
              </button>
              <button
                type="button"
                className="button btn-stop"
                onClick={this.onStop}
                disabled={activeBtn === 'stop'}
              >
                Stop
              </button>
              <button
                type="button"
                className="button btn-reset"
                onClick={this.onReset}
                disabled={activeBtn === 'reset'}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
