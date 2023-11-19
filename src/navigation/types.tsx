import { NavigatorScreenParams } from '@react-navigation/native';
import { Events } from '@src/models';

export type RootStackParamList = {
  Initial: undefined;
  Inside: undefined;
  SideDrawer: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  FirstLoginWizard: undefined;
  SeniorDashboard: {
    uid: string;
    title: string;
  };
  BottomBar: NavigatorScreenParams<BottomBarParamList>;
  AccountItemDetails: {
    screenType: string;
    title: string;
  };
  AddConnectedUser: undefined;
  AddTag: undefined;
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
    eventKey: string;
  };
  FilterPanel: {
    title: string;
    filters: any;
  };
};

export type BottomBarParamList = {
  Home: undefined;
  Calendar: undefined;
  Events: {
    onBack: any;
    filteredData: Events;
  };
  Chat: undefined;
  Account: undefined;
};
