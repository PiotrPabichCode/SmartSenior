import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';
import useThemeColors from '@src/config/useThemeColors';

const MoreButton = () => {
  const styles = useStyles();
  return (
    <Button
      key={'more-button-event'}
      title={t('button.more')}
      containerStyle={styles.moreButtonContainerStyle}
      buttonStyle={styles.moreButtonStyle}
      onPress={() => navigate('Events')}
    />
  );
};

export default MoreButton;

const useStyles = (theme = useThemeColors()) => {
  return StyleSheet.create({
    moreButtonContainerStyle: {
      elevation: 5,
      marginVertical: 5,
    },
    moreButtonStyle: {
      backgroundColor: theme.upcomingEventsMoreBtn,
    },
  });
};
