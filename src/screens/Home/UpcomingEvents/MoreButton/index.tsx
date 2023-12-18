import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';
import useThemeColors from '@src/config/useThemeColors';

const MoreButton = () => {
  const styles = useStyles();
  return (
    <Button
      size="lg"
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

const useStyles = (theme = useThemeColors()) => {
  return StyleSheet.create({
    moreButtonContainerStyle: {
      marginBottom: 10,
      minWidth: '90%',
      elevation: 5,
    },
    moreButtonStyle: {
      backgroundColor: theme.upcomingEventsMoreBtn,
    },
    moreButtonTitle: {
      fontSize: 16,
      fontWeight: '400',
      color: theme.text,
    },
  });
};
