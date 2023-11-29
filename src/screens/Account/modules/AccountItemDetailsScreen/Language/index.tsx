import { View, Text } from 'react-native';
import Localization, { t } from '@src/localization/Localization';
import { useAppDispatch } from '@src/redux/types';
import { changeLanguage } from '@src/redux/auth/auth.actions';
import LanguageButton from './LanguageButton';

const Language = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={{ width: '100%', gap: 10, alignItems: 'center' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{t('account.language.title')}</Text>
      <Text style={{ fontSize: 20, fontWeight: '600', color: '#808080' }}>{t('languageName')}</Text>
      <LanguageButton
        title={t('account.language.polish')}
        onPress={async () => await dispatch(changeLanguage(Localization.supportedLanguages.POLISH))}
      />

      <LanguageButton
        title={t('account.language.english')}
        onPress={async () =>
          await dispatch(changeLanguage(Localization.supportedLanguages.ENGLISH))
        }
      />
    </View>
  );
};

export default Language;
