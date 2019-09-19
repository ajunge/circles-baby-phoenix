import update from 'immutability-helper';

import ActionTypes from '~/store/app/types';

const initialState = {
  isConnected: false,
  isReady: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.APP_INITIALIZE:
      return update(state, {
        isReady: { $set: false },
      });
    case ActionTypes.APP_INITIALIZE_READY:
      return update(state, {
        isReady: { $set: true },
      });
    case ActionTypes.APP_CONNECT_SUCCESS:
      return update(state, {
        isConnected: { $set: true },
      });
    case ActionTypes.APP_CONNECT_ERROR:
      return update(state, {
        isConnected: { $set: false },
      });
    default:
      return state;
  }
};

export default appReducer;
