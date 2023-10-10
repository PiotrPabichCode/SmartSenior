import { NavigatorScreenParams } from '@react-navigation/native';
import { EventDetails } from '@src/redux/types/eventsTypes';

export type RootStackParamList = {
  Initial: undefined;
  Inside: undefined;
  SideDrawer: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  FirstLoginWizard: undefined;
  BottomBar: NavigatorScreenParams<BottomBarParamList>;
  AccountItemDetails: {
    screenType: string;
    title: string;
  };
  Medicines: undefined;
  MedicinesItemDetails: {
    item: any;
  };
  Pharmacies: undefined;
  PharmaciesItemDetails: {
    item: any;
  };
  CreateEvent: undefined;
  EventItem: {
    event: EventDetails;
  };
  AddKeeper: undefined;
};

export type BottomBarParamList = {
  Home: undefined;
  Calendar: undefined;
  Events: undefined;
  Chat: undefined;
  Account: undefined;
};
