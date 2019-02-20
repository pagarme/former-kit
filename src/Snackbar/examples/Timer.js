import React, { Component } from 'react'
import Proptypes from 'prop-types'
import style from './style.css'

class TimerExample extends Component {
  constructor () {
    super()

    this.state = {
      time: 0,
    }

    this.counter = this.counter.bind(this)
  }

  componentDidMount () {
    this.timer = setInterval(this.counter, 50)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  counter () {
    this.setState({
      time: new Date() - this.props.start,
    })
  }

  render () {
    const elapsedTime = Math.round(this.state.time / 100)
    const seconds = (elapsedTime / 10).toFixed(1)
    return (
      <span className={style.timer}><b>{seconds} seconds</b></span>
    )
  }
}

TimerExample.propTypes = {
  start: Proptypes.number,
}

TimerExample.defaultProps = {
  start: 0,
}

export default TimerExample
