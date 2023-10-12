import { useEffect } from 'react';
import { Alert } from 'react-native';

type Props = {
  navigation: any;
  isUpdate: boolean;
};

const DiscardChangesAlert = ({ navigation, isUpdate }: Props) => {
  useEffect(() => {
    return navigation.addListener('beforeRemove', (e: any) => {
      if (!isUpdate) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        'Porzucić zmiany?',
        'Czy masz niezapisane zmiany. Czy na pewno chcesz je porzucić i opuścić ekran?',
        [
          { text: 'Zostań', style: 'cancel', onPress: () => {} },
          {
            text: 'Porzuć zmiany',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, [navigation, isUpdate]);

  return null;
};

export default DiscardChangesAlert;
