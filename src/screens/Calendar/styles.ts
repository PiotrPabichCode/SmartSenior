import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    name: {
      fontSize: 20,
      fontWeight: '500',
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30,
    },
    customDay: {
      margin: 10,
      fontSize: 24,
      color: 'green',
    },
    dayItem: {
      marginLeft: 34,
    },
  });
};
