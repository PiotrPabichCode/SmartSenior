import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Theme } from '@src/models';
import Colors from '@src/constants/Colors';
import { StyleSheet } from 'react-native';
import { Timestamp } from 'firebase/firestore';

type Props = {
  groupKey: string;
  date: Timestamp;
};

const ActionButton = ({ groupKey, date }: Props) => {
  const theme = useAppSelector(state => selectTheme(state));
  const styles = useStyles(theme);
  return (
    <Button
      size="lg"
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
      color: Colors.black,
    },
  });
};
