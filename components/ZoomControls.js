import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeZoom } from '../actions/zoom'

class ZoomControls extends Component {
  zoomIn = () => {
    const { zoom, dispatch } = this.props
    if (zoom >= 2) return
    changeZoom(zoom + 0.1)(dispatch)
  }

  zoomOut = () => {
    const { zoom, dispatch } = this.props
    if (zoom <= 0.2) return
    changeZoom(zoom - 0.1)(dispatch)
  }

  render() {
    return (
      <div className={'zoomControls'}>
        <span className={'zoomIn'} onClick={this.zoomIn}>
          +
        </span>
        <span className={'zoomOut'} onClick={this.zoomOut}>
          -
        </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    zoom: state.zoom
  }
}

export default connect(mapStateToProps)(ZoomControls)
