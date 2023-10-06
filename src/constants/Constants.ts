import AccountScreen from '@src/screens/Account/AccountScreen';
import EventsScreen from '@src/screens/Events/EventsScreen';
import HomeScreen from '@src/screens/Home/HomeScreen';
import MedicinesScreen from '@src/screens/Medicines/MedicinesScreen';
import PharmaciesScreen from '@src/screens/Pharmacies/PharmaciesScreen';

export const constants = {
  borderRadius: 10,
  titleFontSize: 24,
  textFontSize: 16,
  subTextFontSize: 14,
  spacing: 15,
  iconSizeS: 20,
  iconSizeM: 24,
  iconSizeL: 28,
  iconSizeXL: 32,
};

export const SideMenuTabsArray = [
  {
    label: 'Strona główna',
    route: 'Home',
    icon: 'home-bottom-nav',
    component: HomeScreen,
  },
  {
    label: 'Profil',
    route: 'Account',
    icon: 'account-bottom-nav',
    component: AccountScreen,
  },
  {
    label: 'Lista leków',
    route: 'Medicines',
    icon: 'pills',
    component: MedicinesScreen,
  },
  {
    label: 'Lista aptek',
    route: 'Pharmacies',
    icon: 'pharmacy',
    component: PharmaciesScreen,
  },
  {
    label: 'Wydarzenia',
    route: 'Events',
    icon: 'events-bottom-nav',
    component: EventsScreen,
  },
];
