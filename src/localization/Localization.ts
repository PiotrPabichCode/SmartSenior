import { splitLocale } from '@src/utils/utils';
import * as LocalizationExpo from 'expo-localization';
import i18n, { Scope, TranslateOptions } from 'i18n-js';
import memoize from 'lodash.memoize';

class Localization {
  public static supportedLanguages = {
    POLISH: 'pl',
    ENGLISH: 'en',
  };

  private static getSupportedTranslation: { [language: string]: () => object } =
    {
      [Localization.supportedLanguages.POLISH]: () =>
        require('./pl/translation.json'),
      [Localization.supportedLanguages.ENGLISH]: () =>
        require('./en/translation.json'),
    };

  public static translate = memoize(
    (key: Scope, config?: TranslateOptions) => i18n.t(key, config),
    (key: Scope, config?: TranslateOptions) =>
      config ? key + JSON.stringify(config) : key
  );

  private static findSupportedLanguage = (
    locale: string
  ): string | undefined => {
    for (const language of Object.values(Localization.supportedLanguages)) {
      if (language === splitLocale(locale)) {
        return language;
      }
    }
  };

  public static setupI18nConfig = (): void => {
    if (Localization.translate.cache.clear) {
      Localization.translate.cache.clear();
    }

    const fallback = Localization.supportedLanguages.POLISH;
    const locale = Localization.findSupportedLanguage(LocalizationExpo.locale);
    const language = locale || fallback;

    i18n.locale = language;

    i18n.translations = {
      [language]: Localization.getSupportedTranslation[language](),
    };
  };

  public static changeLanguage = (
    language: string = Localization.supportedLanguages.POLISH
  ): void => {
    if (Localization.translate.cache.clear) {
      Localization.translate.cache.clear();
    }
    i18n.locale = language;
    i18n.translations = {
      [language]: Localization.getSupportedTranslation[language](),
    };
  };
}

export const translate = Localization.translate;
export default Localization;
