import { goBack } from '@src/navigation/navigationUtils';
import * as api from '../api/eventsAPI';
import * as types from '../constants/eventsConstants';

import { store, useAppDispatch, useAppSelector } from '../store';
import { changeLanguageAction } from './authActions';

export const useAuthStore = () => {
  const state = useAppSelector(state => state.auth);

  return {
    state,
    getUser: () => {
      return store.getState().auth;
    },
    getUserDetails: () => {
      return store.getState().auth.userDetails;
    },
    getError: () => {
      return store.getState().auth.error;
    },
    getLanguage: () => {
      return store.getState().auth.language;
    },
    getTheme: () => {
      return store.getState().auth.theme;
    },
    getRole: () => {
      return store.getState().auth.role;
    },
    getConnectedUsers: () => {
      return store.getState().auth.connectedUsers;
    },
    setLanguage: (language: string) => {
      store.dispatch(changeLanguageAction(language));
    },
  };
};

export const createEventAction =
  (newEventData: any) =>
  async (dispatch = useAppDispatch()) => {
    try {
      let response = await api.createEvent(newEventData);
      const { error, data } = response;
      if (error) {
        dispatch({
          type: types.EVENT_CREATION_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.LOAD_ACTIVE_EVENTS_SUCCESS,
          payload: data,
        });
        goBack();
      }
    } catch (error) {
      dispatch({
        type: types.EVENT_CREATION_FAIL,
        payload: error,
      });
    }
  };
export const loadActiveEventsAction =
  () =>
  async (dispatch = useAppDispatch()) => {
    try {
      let response = await api.loadActiveEvents();
      const { error, data } = response;
      if (error) {
        dispatch({
          type: types.LOAD_ACTIVE_EVENTS_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.LOAD_ACTIVE_EVENTS_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOAD_ACTIVE_EVENTS_FAIL,
        payload: error,
      });
    }
  };

export const clearEventsAction =
  () =>
  async (dispatch = useAppDispatch()) => {
    dispatch({
      type: types.CLEAR_EVENTS,
    });
  };

export const updateEventAction =
  (eventKey: string, changeEventData: any) =>
  async (dispatch = useAppDispatch()) => {
    try {
      let response = await api.updateEvent(eventKey, changeEventData);
      const { error, data } = response;
      if (error) {
        dispatch({
          type: types.UPDATE_EVENT_FAIL,
          payload: error,
        });
      } else {
        dispatch({
          type: types.UPDATE_EVENT_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: types.UPDATE_EVENT_FAIL,
        payload: error,
      });
    }
  };
