import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import useThemeColors from '@src/config/useThemeColors';
import { Button } from '@src/components/shared';

type ActionButtonProps = {
  groupKey: string;
  date: Timestamp;
};

const ActionButton = ({ groupKey, date }: ActionButtonProps) => {
  const styles = useStyles();
  return (
    <Button
      key={'execute-button-event'}
      title={t('button.execute')}
      containerStyle={styles.actionButtonContainerStyle}
      buttonStyle={styles.actionButtonStyle}
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

const useStyles = (theme = useThemeColors()) => {
  return StyleSheet.create({
    actionButtonStyle: {
      backgroundColor: theme.upcomingEventsActionBtn,
    },
    actionButtonContainerStyle: {
      minWidth: '90%',
      marginBottom: 10,
      elevation: 5,
    },
  });
};
