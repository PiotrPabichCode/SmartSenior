import * as api from '../api/authAPI';
import * as types from '../constants/authConstants';
import { useAppDispatch } from '../store';
import { navigate } from '@navigation/navigationUtils';
import { AuthCredentials, UserDetails } from '../types/authTypes';

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
    if (user) {
      dispatch({
        type: types.SIGN_IN_SUCCESS,
        payload: user,
      });
    }
  };

export const verifyUserDetailsAction =
  () =>
  async (dispatch = useAppDispatch()) => {
    try {
      const response = await api.checkIfUserDataExists();
      const { error, data } = response;
      if (error) {
        dispatch({
          type: types.GET_USER_DETAILS_FAIL,
          payload: error,
        });
        return false;
      } else {
        dispatch({
          type: types.GET_USER_DETAILS_SUCCESS,
          payload: data,
        });
        return true;
      }
    } catch (error) {
      dispatch({ type: types.GET_USER_DETAILS_FAIL, payload: error });
      throw error;
    }
  };

export const changeLanguageAction =
  (language: string) =>
  async (dispatch = useAppDispatch()) => {
    dispatch({
      type: types.CHANGE_LANGUAGE,
      payload: language,
    });
  };
