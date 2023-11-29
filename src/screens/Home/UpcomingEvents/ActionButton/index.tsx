import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useStyles } from './styles';
import { ActionButtonProps } from './types';

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
