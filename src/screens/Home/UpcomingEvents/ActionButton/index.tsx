import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { ActionButtonProps } from './types';
import { Theme } from '@src/models';
import Colors from '@src/constants/Colors';
import { StyleSheet } from 'react-native';

const ActionButton = ({ groupKey, date }: ActionButtonProps) => {
  const theme = useAppSelector(state => selectTheme(state));
  const styles = useStyles(theme);
  return (
    <Button
      key={'execute-button-event'}
      title={t('button.execute')}
      containerStyle={styles.actionButtonContainerStyle}
      buttonStyle={styles.actionButtonStyle}
      titleStyle={styles.actionButtonTitle}
      onPress={() =>
        navigate('EventItem', {
          groupKey: groupKey,
          date: date,
        })
      }
    />
  );
};

export default ActionButton;

const useStyles = (theme: Theme) => {
  const currentTheme = Colors[theme];
  return StyleSheet.create({
    actionButtonStyle: {
      backgroundColor: currentTheme.upcomingEventsActionBtn,
    },
    actionButtonContainerStyle: {
      minWidth: '90%',
      marginBottom: 10,
      elevation: 5,
    },
    actionButtonTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors.black,
    },
  });
};
