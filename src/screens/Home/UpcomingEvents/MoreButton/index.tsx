import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { useStyles } from './styles';

const MoreButton = () => {
  const theme = useAppSelector(state => selectTheme(state));
  const styles = useStyles(theme);
  return (
    <Button
      key={'more-button-event'}
      title={t('button.more')}
      containerStyle={styles.moreButtonContainerStyle}
      buttonStyle={styles.moreButtonStyle}
      titleStyle={styles.moreButtonTitle}
      onPress={() => navigate('Events')}
    />
  );
};

export default MoreButton;
