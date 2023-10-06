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
        events: [...state.events, payload],
      };
    case types.EVENT_CREATION_FAIL:
      return {
        ...state,
        error: payload,
      };
    case types.LOAD_ACTIVE_EVENTS_SUCCESS:
      return {
        ...state,
        events: payload,
      };
    case types.LOAD_ACTIVE_EVENTS_FAIL: {
      return {
        ...state,
        error: payload,
      };
    }
    case types.CLEAR_EVENTS: {
      return {
        ...state,
        initialState,
      };
    }
    default:
      return state;
  }
};

export default eventsReducer;
