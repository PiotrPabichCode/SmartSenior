import Localization from '@src/localization/Localization';
import * as types from '../constants/authConstants';

const initialState = {
  user: null,
  userDetails: null,
  error: null,
  language: Localization.getLocale(),
  theme: 'light',
  role: null,
  connectedUsers: [],
};

const authReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case types.SIGN_IN_SUCCESS:
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: payload,
        error: null,
      };
    case types.SIGN_IN_FAIL:
    case types.SIGN_UP_FAIL:
    case types.GET_USER_DETAILS_FAIL:
    case types.GET_CONNECTED_USERS_FAIL:
    case types.ADD_CONNECTED_USER_FAIL:
    case types.DELETE_CONNECTED_USER_FAIL:
      return {
        ...state,
        error: payload,
      };
    case types.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: payload,
      };
    case types.GET_CONNECTED_USERS_SUCCESS:
    case types.DELETE_CONNECTED_USER_SUCCESS:
      return {
        ...state,
        connectedUsers: payload,
      };
    case types.ADD_CONNECTED_USER_SUCCESS:
      return {
        ...state,
        connectedUsers: [...state.connectedUsers, payload],
      };
    case types.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: payload,
      };
    }
    case types.CHANGE_ROLE: {
      return {
        ...state,
        role: payload,
      };
    }
    case types.CHANGE_THEME: {
      return {
        ...state,
        theme: payload,
      };
    }
    case types.LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
