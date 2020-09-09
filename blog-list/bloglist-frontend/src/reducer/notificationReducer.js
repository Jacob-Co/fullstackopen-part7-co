let timerId;

export const createNotification = (message, status) => {
  return async (dispatch) => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => dispatch(clearNotification()), 5000);
    dispatch({
      type: 'NEW_NOTIF',
      data: {
        message,
        status
      }
    })
  }
}

export const clearNotification = () => {
  timerId = null;
  return {
    type: 'CLEAR_NOTIF'
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIF':
      return action.data;
    case 'CLEAR_NOTIF':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;