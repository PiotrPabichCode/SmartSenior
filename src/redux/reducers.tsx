import * as types from './constants';

const initialState = {
  userData: null,
  authenticated: false,
};

const authReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case types.SIGN_IN_SUCCESS:
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case types.FIRST_LOGIN_WIZARD_SUCCESS:
      return {
        ...state,
        userData: payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        userData: null,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
