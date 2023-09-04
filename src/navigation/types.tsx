import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Initial: undefined;
  Inside: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  BottomBar: NavigatorScreenParams<BottomBarParamList>;
  AccountItemDetails: {
    screenType: string;
    title: string;
  };
  Medicines: undefined;
  MedicinesItemDetails: undefined;
};

export type BottomBarParamList = {
  Home: undefined;
  Calendar: undefined;
  Events: undefined;
  Chat: undefined;
  Account: undefined;
};

export type WelcomeProps = NativeStackScreenProps<
  RootStackParamList,
  'Welcome'
>;
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export type BottomBarProps = NativeStackScreenProps<
  RootStackParamList,
  'BottomBar'
>;

export type AccountItemDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'AccountItemDetails'
>;

export type MedicinesProps = NativeStackScreenProps<
  RootStackParamList,
  'Medicines'
>;

export type MedicinesItemDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'MedicinesItemDetails'
>;

export type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type CalendarProps = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'Calendar'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type EventsProps = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'Events'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ChatProps = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'Chat'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type AccountProps = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'Account'>,
  NativeStackScreenProps<RootStackParamList>
>;
