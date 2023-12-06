import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 25,
      minHeight: 150,
      maxHeight: 200,
      backgroundColor: 'white',
      elevation: 5,
      margin: 10,
    },
    innerContainer: {
      gap: 5,
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      textAlign: 'center',
      maxWidth: '90%',
      marginTop: 10,
    },
    divider: {
      width: '100%',
    },
    subtitle: {
      color: 'black',
    },
    datesContainer: {
      flexDirection: 'row',
    },
    singleDate: { alignItems: 'center', flex: 1 },
    singleDateTitle: { fontSize: 15, fontWeight: 'bold' },
    singleDateTimestamp: {
      fontWeight: '500',
      fontSize: 15,
    },
    smallerNoteCard: {
      flexGrow: 1,
      alignItems: 'center',
    },
    description: {
      textAlign: 'center',
      textAlignVertical: 'bottom',
      maxWidth: '90%',
      fontSize: 14,
      marginBottom: 10,
    },
  });
};
