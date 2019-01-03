import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

// Components
import Event from '../components/Event'
import ZoomControls from '../components/ZoomControls'

// Helpers
import { getUnitForZoom, convertUnitToDays, formatDate } from '../helpers'

// Constants
const DAY_WIDTH = 200 /* px */

class Index extends Component {
  getRange = items => {
    const firstDate = _.min(items.map(item => moment(item.start)))
    const lastDate = _.max(items.map(item => moment(item.end)))
    const range = moment.range(firstDate, lastDate)
    return range
  }

  buildRows = items => {
    const sorted = _.sortBy(items, item => item.start)
    let rows = []
    let row = 0
    for (let item of sorted) {
      // If the current row has an event that conflicts with the item we want
      // to add then move to the next row
      while (
        !!~_.findIndex(rows[row], cur =>
          moment.range(cur.start, cur.end).intersect(moment.range(item.start, item.end))
        )
      ) {
        row++
      }
      if (!rows[row]) rows[row] = []
      rows[row].push(item)
      row = 0
    }
    return rows
  }

  dayFromPosition = (daysRange, x) => {
    const { zoom } = this.props
    return daysRange[
      _.clamp(
        Math.max(0, Math.ceil(x / (zoom * DAY_WIDTH)) - 1),
        /* min */ 0,
        /* max */ daysRange.length
      )
    ]
  }

  render() {
    const { items, zoom, dispatch } = this.props
    const unit = getUnitForZoom(zoom) /* day, month or year */
    const unitInDays = convertUnitToDays(unit)
    const rows = this.buildRows(items)
    const range = this.getRange(items)
    const daysRange = Array.from(range.by('day'))
    const unitRange = Array.from(range.by(unit))

    return (
      <div className={'wrapper'}>
        <ZoomControls dispatch={dispatch} />
        <div className={'timeline'}>
          <div className={'grid'}>
            {unitRange.map(step => {
              const label = formatDate(step, unit)
              return (
                <div key={step} className={'gridCol'}>
                  <div className={'gridHeader'}>
                    <span>{label}</span>
                  </div>
                  <div className={'gridContent'} />
                  <style jsx>{`
                    .gridCol {
                      width: ${unitInDays * zoom * DAY_WIDTH}px;
                    }
                  `}</style>
                </div>
              )
            })}
          </div>
          {rows.map((row, index) => (
            <div className={'eventRow'} key={`row-${index}`}>
              {row.map(item => {
                const dayIndex = _.findIndex(daysRange, day => day.isSame(item.start, 'day'))
                const duration = moment(item.end).diff(moment(item.start), 'days')
                return (
                  <Event
                    key={item.id}
                    item={item}
                    left={dayIndex * zoom * DAY_WIDTH}
                    width={Math.max(DAY_WIDTH, duration * zoom * DAY_WIDTH)}
                    dispatch={dispatch}
                    dayFromPosition={x => this.dayFromPosition(daysRange, x)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    zoom: state.zoom
  }
}

export default connect(mapStateToProps)(Index)
