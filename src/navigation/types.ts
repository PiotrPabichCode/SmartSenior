import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventGroups, Events, Medicine, Pharmacy } from '@src/models';
import { Timestamp } from 'firebase/firestore';

export type RootStackParamList = {
  Initial: undefined;
  Inside: undefined;
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
  TagScreen: {
    key: string;
  };
  Medicines: undefined;
  MedicinesItemDetails: {
    medicine: Medicine;
  };
  Pharmacies: undefined;
  PharmaciesItemDetails: {
    pharmacy: Pharmacy;
  };
  Notes: undefined;
  NoteDetails: {
    key: string;
  };
  CreateNote: undefined;
  CreateEvent: undefined;
  EventItem: {
    groupKey: string;
    date: Timestamp;
    eventKey: string;
  };
  EventsGroup: {
    groupKey: string;
  };
  EventsGroupDetails: {
    groupKey: string;
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
    filteredData: EventGroups;
    filterConditions: any;
  };
  Chat: undefined;
  Account: undefined;
};

export type TagScreenProps = NativeStackScreenProps<RootStackParamList, 'TagScreen'>;

export type EventItemScreenProps = NativeStackScreenProps<RootStackParamList, 'EventItem'>;
export type EventsScreenProps = NativeStackScreenProps<BottomBarParamList, 'Events'>;
export type EventsGroupScreenProps = NativeStackScreenProps<RootStackParamList, 'EventsGroup'>;
export type EventsGroupDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'EventsGroupDetails'
>;
export type PharmacyItemScreenDetails = NativeStackScreenProps<
  RootStackParamList,
  'PharmaciesItemDetails'
>;
export type MedicineItemScreenDetails = NativeStackScreenProps<
  RootStackParamList,
  'MedicinesItemDetails'
>;

export type NoteDetailsProps = NativeStackScreenProps<RootStackParamList, 'NoteDetails'>;
