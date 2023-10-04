import * as api from '../api';
import * as types from '../constants';
import { useAppDispatch, useAppSelector } from '../store';
import { navigate } from '@navigation/navigationUtils';

type AuthCredentials = {
  email: string;
  password: string;
};

type UserDetails = {
  firstName: string;
  lastName: string;
  birthDate: null | string;
  gender: string;
  email: string | null | undefined;
};

export const signInAction =
  (userData: AuthCredentials) =>
  async (dispatch = useAppDispatch()) => {
    try {
      let response = await api.signIn(userData);
      const { error, data } = response;
      if (error) {
        dispatch({
          type: types.SIGN_IN_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.SIGN_IN_SUCCESS,
          payload: data,
        });
        const response = await api.checkIfUserDataExists();
        if (response.data) {
          dispatch(UserDetailsAction(response.data));
        } else {
          navigate('FirstLoginWizard');
        }
      }
    } catch (error) {
      dispatch({
        type: types.SIGN_IN_FAIL,
        payload: error,
      });
    }
  };

export const signUpAction =
  (userData: AuthCredentials) =>
  async (dispatch = useAppDispatch()) => {
    try {
      const response = await api.signUp(userData);
      const { error, data } = response;
      if (error) {
        dispatch({
          type: types.SIGN_UP_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.SIGN_UP_SUCCESS,
          payload: data,
        });
        const response = await api.checkIfUserDataExists();
        if (response.data) {
          dispatch(UserDetailsAction(response.data));
        } else {
          navigate('FirstLoginWizard');
        }
      }
    } catch (error) {
      dispatch({
        type: types.SIGN_UP_FAIL,
        payload: error,
      });
    }
  };

export const logoutAction =
  () =>
  async (dispatch = useAppDispatch()) => {
    try {
      await api.logout();
      dispatch({ type: types.LOGOUT });
    } catch (error) {
      dispatch({ type: types.LOGOUT, payload: types.ERROR_MESSAGE });
    }
  };

export const UserDetailsAction =
  (userDetails: UserDetails) =>
  async (dispatch = useAppDispatch()) => {
    try {
      const response = await api.setUserDetails(userDetails);
      const { error } = response;
      if (error) {
        dispatch({
          type: types.GET_USER_DETAILS_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.GET_USER_DETAILS_SUCCESS,
          payload: userDetails,
        });

        navigate('BottomBar', {
          screen: 'Home',
        });
      }
    } catch (error) {
      dispatch({ type: types.GET_USER_DETAILS_FAIL, payload: error });
    }
  };

export const verifyAuth =
  (user: any) =>
  async (dispatch = useAppDispatch()) => {
    const response = await api.checkIfUserDataExists();
    const { data } = response;

    if (data) {
      dispatch({
        type: types.GET_USER_DETAILS_SUCCESS,
        payload: data,
      });
      dispatch({ type: types.SIGN_IN_SUCCESS, payload: user });
      navigate('BottomBar', {
        screen: 'Home',
      });
    } else {
      dispatch({ type: types.SIGN_IN_SUCCESS, payload: user });
      navigate('FirstLoginWizard');
    }
  };
