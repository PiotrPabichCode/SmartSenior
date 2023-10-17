import * as Localization from 'expo-localization';
import { LocaleConfig } from 'react-native-calendars';

class Calendar {
  public static supportedLanguages = {
    POLISH: 'pl',
    ENGLISH: 'en',
  };

  private static getSupportedTranslation: { [language: string]: () => object } =
    {
      [Calendar.supportedLanguages.POLISH]: () => require('./constants/pl'),
      [Calendar.supportedLanguages.ENGLISH]: () => require('./constants/en'),
    };

  private static findSupportedLanguage = (
    locale: string
  ): string | undefined => {
    for (const language of Object.values(Calendar.supportedLanguages)) {
      if (language === locale.split('-')[0]) {
        return language;
      }
    }
  };

  public static setupCalendar = (): void => {
    const fallback = Calendar.supportedLanguages.POLISH;
    const locale = Calendar.findSupportedLanguage(Localization.locale);
    const language = locale || fallback;

    const values = Calendar.getSupportedTranslation[language]();
    LocaleConfig.defaultLocale = language;
  };

  public static changeLanguage = (
    language: string = Calendar.supportedLanguages.POLISH
  ): void => {
    Calendar.getSupportedTranslation[language]();
    LocaleConfig.defaultLocale = language;
  };
}

export default Calendar;
