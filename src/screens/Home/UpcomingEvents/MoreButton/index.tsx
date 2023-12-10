import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { Theme } from '@src/models';
import Colors from '@src/constants/Colors';
import { StyleSheet } from 'react-native';

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

const useStyles = (theme: Theme) => {
  const currentTheme = Colors[theme];
  return StyleSheet.create({
    moreButtonContainerStyle: {
      marginBottom: 10,
      minWidth: '90%',
      elevation: 5,
    },
    moreButtonStyle: {
      backgroundColor: currentTheme.upcomingEventsMoreBtn,
    },
    moreButtonTitle: {
      fontSize: 16,
      fontWeight: '400',
      color: Colors.white,
    },
  });
};
