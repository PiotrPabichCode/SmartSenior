import * as api from './api';
import * as types from './constants';
import { useAppDispatch } from './store';

export const signInAction =
  (userData: any, navigate: any) =>
  async (dispatch = useAppDispatch()) => {
    try {
      const response = await api.signIn(userData);
      const { error } = response;
      if (error) {
        dispatch({
          type: types.SIGN_IN_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.SIGN_IN_SUCCESS,
          payload: null,
        });
        const userData = await api.checkIfUserDataExists();
        const { error, data } = userData;
        console.log(data);
        if (userData) {
          dispatch(firstLoginWizardAction(data, navigate));
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
  (userData: any, navigate: any) =>
  async (dispatch = useAppDispatch()) => {
    try {
      const response = await api.signUp(userData);
      const { error } = response;
      if (error) {
        dispatch({
          type: types.SIGN_UP_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.SIGN_UP_SUCCESS,
          payload: types.SIGN_UP_SUCCESS_MESSAGE,
        });
        const userData = await api.checkIfUserDataExists();
        console.log(userData);
        if (userData) {
          navigate('BottomBar', {
            screen: 'Home',
          });
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

export const firstLoginWizardAction =
  (firstLoginWizardData: any, navigate: any) =>
  async (dispatch = useAppDispatch()) => {
    try {
      const response = await api.setFirstLoginWizardData(firstLoginWizardData);
      const { error, data } = response;
      if (error) {
        dispatch({
          type: types.FIRST_LOGIN_WIZARD_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FIRST_LOGIN_WIZARD_SUCCESS,
          payload: data,
        });
        navigate('BottomBar', {
          screen: 'Home',
        });
      }
    } catch (error) {
      dispatch({ type: types.FIRST_LOGIN_WIZARD, payload: error });
    }
  };

export const setUserData =
  (userData: any) =>
  async (dispatch = useAppDispatch()) => {
    dispatch({ type: types.SET_USER_DATA, payload: userData });
  };
