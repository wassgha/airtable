import defaultItems from '../data/timelineItems'
import { preprocessItems } from '../helpers'
import { UPDATE_EVENT } from '../actions/event'
import { CHANGE_ZOOM } from '../actions/zoom'
import { DEFAULT_ZOOM } from '../constants'

const reducer = (
  state = { items: preprocessItems(defaultItems || []), zoom: DEFAULT_ZOOM },
  action
) => {
  switch (action.type) {
    case UPDATE_EVENT:
      return {
        ...state,
        items: [...state.items].map(item => {
          if (item.id == action.payload.id) return action.payload
          return item
        })
      }
    case CHANGE_ZOOM:
      return {
        ...state,
        zoom: action.payload
      }
    default:
      return state
  }
}

export default reducer
