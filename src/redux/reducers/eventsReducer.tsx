import * as types from '../constants/eventsConstants';

const initialState = {
  events: [],
  error: '',
};

const eventsReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case types.EVENT_CREATION_SUCCESS:
      return {
        ...state,
        events: payload,
      };
    case types.EVENT_CREATION_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;
