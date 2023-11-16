import { useLocalStorage } from '@src/hooks/useLocalStorage';
import * as Localization from 'expo-localization';
import { LocaleConfig } from 'react-native-calendars';

class Calendar {
  public static supportedLanguages = {
    POLISH: 'pl',
    ENGLISH: 'en',
  };

  private static getSupportedTranslation: { [language: string]: () => object } = {
    [Calendar.supportedLanguages.POLISH]: () => require('./constants/pl'),
    [Calendar.supportedLanguages.ENGLISH]: () => require('./constants/en'),
  };

  private static findSupportedLanguage = (locale: string): string | undefined => {
    for (const language of Object.values(Calendar.supportedLanguages)) {
      if (language === locale.split('-')[0]) {
        return language;
      }
    }
  };

  public static setupCalendar = async (): Promise<void> => {
    const fallback = Calendar.supportedLanguages.POLISH;
    const locale = Calendar.findSupportedLanguage(Localization.locale);
    const localStorage = await useLocalStorage('language').getItem();
    const language = localStorage || locale || fallback;

    Calendar.getSupportedTranslation[language]();
    LocaleConfig.defaultLocale = language;
  };

  public static changeLanguage = async (
    language: string = Calendar.supportedLanguages.POLISH,
  ): Promise<void> => {
    Calendar.getSupportedTranslation[language]();
    LocaleConfig.defaultLocale = language;
  };
}

export default Calendar;
