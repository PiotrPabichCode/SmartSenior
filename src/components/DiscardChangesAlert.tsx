import { translate } from '@src/localization/Localization';
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
        translate('alert.discardChanges.title'),
        translate('alert.discardChanges.message'),
        [
          {
            text: translate('alert.discardChanges.no'),
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: translate('alert.discardChanges.yes'),
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
