import { goBack } from '@src/navigation/navigationUtils';
import * as api from '../api/eventsAPI';
import * as types from '../constants/eventsConstants';

import { useAppDispatch } from '../store';

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
