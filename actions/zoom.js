export const CHANGE_ZOOM = Symbol('CHANGE_ZOOM')

export function changeZoom(payload) {
  return dispatch =>
    dispatch({
      type: CHANGE_ZOOM,
      payload
    })
}
