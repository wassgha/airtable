import React, { Component } from 'react'
import Color from 'color'
import Draggable from 'react-draggable'
import moment from 'moment'

import { updateEvent } from '../actions/event'

export default class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: null,
      editable: false,
      dragging: false,
      focused: false
    }
  }

  handleStart = () => {
    this.setState({ dragging: false })
  }

  handleDrag = () => {
    if (this.state.dragging == false) {
      this.setState({ editable: false, dragging: true })
    }
  }

  handleStop = (e, data) => {
    if (!this.state.dragging) return

    const { dispatch, dayFromPosition, left } = this.props
    const { start, end } = this.props.item
    const eventLength = moment(end).diff(moment(start), 'days')
    const newStart = dayFromPosition(left + data.x).format('YYYY-MM-DD')
    const newEnd = moment(newStart)
      .add(eventLength, 'days')
      .format('YYYY-MM-DD')
    updateEvent({
      ...this.props.item,
      start: newStart,
      end: newEnd
    })(dispatch)

    // Reset drag & drop
    this.setState({ position: { x: 0, y: 0 } }, () => {
      this.setState({ position: null })
    })
  }

  handleClick = () => {
    if (this.state.dragging) return this.setState({ dragging: false })
    this.setState({ editable: true }, () => {
      this.nameInput && this.nameInput.focus()
    })
  }

  onBlur = () => {
    this.setState({ focused: false })
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onChange = () => {
    const name = this.nameInput && this.nameInput.value
    const { dispatch } = this.props
    updateEvent({ ...this.props.item, name })(dispatch)
  }

  render() {
    const { item, left = 0, width = 50 } = this.props
    const { name, color } = item
    const { editable, dragging, focused, position } = this.state
    return (
      <Draggable
        axis="x"
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        position={position}
        enableUserSelectHack={false}
      >
        <div className={'event'} onClick={this.handleClick}>
          <textarea
            ref={input => {
              this.nameInput = input
            }}
            className={'name'}
            onChange={this.onChange}
            rows={1}
            disabled={!editable}
            value={name}
          />
          <style jsx>{`
            .event {
              background-color: ${Color(color).mix(Color('white'), 0.9)};
              border-color: ${color};
              z-index: ${dragging || focused ? 1 : 0};
              color: ${color};
              left: ${left}px;
              min-width: ${width}px;
            }
            .name {
              color: ${color};
            }
          `}</style>
        </div>
      </Draggable>
    )
  }
}
