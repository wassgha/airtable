export const UPDATE_EVENT = Symbol('UPDATE_EVENT')

export function updateEvent(payload) {
  return dispatch =>
    dispatch({
      type: UPDATE_EVENT,
      payload
    })
}
