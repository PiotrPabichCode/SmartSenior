import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import Localization, { t } from '@src/localization/Localization';
import { useAppDispatch } from '@src/redux/types';
import { changeLanguage } from '@src/redux/auth/auth.actions';
import LanguageButton from './LanguageButton';

const Language = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text h3>{t('account.language.title')}</Text>
      <Text h4 style={styles.currentLanguage}>
        {t('languageName')}
      </Text>
      <View style={styles.buttonsContainer}>
        {Object.values(Localization.supportedLanguages).map(language => {
          return (
            <LanguageButton
              key={language}
              title={t(`account.language.${language}`)}
              onPress={async () => await dispatch(changeLanguage(language))}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  currentLanguage: {
    color: '#808080',
  },
  buttonsContainer: {
    gap: 20,
    width: '100%',
  },
});
