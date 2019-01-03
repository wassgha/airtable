import randomColor from 'randomcolor'
import moment from 'moment'

import { ZOOM_UNIT_MAP } from '../constants'

export const preprocessItems = items => {
  return items.map(item => {
    if (!item.color) {
      item.color = randomColor({
        luminosity: 'dark',
        hue: 'random'
      })
    }
    return item
  })
}

export const getUnitForZoom = zoom => {
  const minZoomArray = Object.keys(ZOOM_UNIT_MAP).sort()
  for (let minZoom of minZoomArray) {
    if (zoom < minZoom) return ZOOM_UNIT_MAP[minZoom]
  }
  return ZOOM_UNIT_MAP[minZoomArray[minZoomArray.length - 1]]
}

export const convertUnitToDays = unit => {
  const date = moment(Date.now())
  return date
    .clone()
    .add(1, unit + 's')
    .diff(date, 'days')
}

export const formatDate = (date, unit) => {
  const format =
    unit == 'day' || unit == 'week' ? 'MM-DD-YYYY' : unit == 'month' ? 'MMM YY' : 'YYYY'
  return date.format(format)
}
