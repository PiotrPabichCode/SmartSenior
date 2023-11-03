import { useLocalStorage } from '@src/hooks/useLocalStorage';
import * as LocalizationExpo from 'expo-localization';
import i18n, { Scope, TranslateOptions } from 'i18n-js';

class Localization {
  public static supportedLanguages = {
    POLISH: 'pl',
    ENGLISH: 'en',
  };
  public static localStorageLanguage = useLocalStorage('language');
  public static localizationReady = false;

  private static getSupportedTranslation: { [language: string]: () => object } = {
    [Localization.supportedLanguages.POLISH]: () => require('./pl/translation.json'),
    [Localization.supportedLanguages.ENGLISH]: () => require('./en/translation.json'),
  };

  public static translate = (key: Scope, config?: TranslateOptions) => {
    const res = i18n.translate(key, config);

    return res;
  };

  private static findSupportedLanguage = (locale: string): string | undefined => {
    for (const language of Object.values(Localization.supportedLanguages)) {
      if (language === locale.split('-')[0]) {
        return language;
      }
    }
  };

  public static setupI18nConfig = async (): Promise<void> => {
    const fallback = Localization.supportedLanguages.POLISH;
    const locale = Localization.findSupportedLanguage(LocalizationExpo.locale);
    const localStorage = await this.localStorageLanguage.getItem();
    const language = localStorage || locale || fallback;
    if (!localStorage) {
      this.localStorageLanguage.setItem(language);
    }

    i18n.defaultLocale = language;
    i18n.locale = language;
    i18n.translations = {
      [language]: Localization.getSupportedTranslation[language](),
    };
    this.localizationReady = true;
  };

  public static changeLanguage = async (
    language: string = Localization.supportedLanguages.POLISH,
  ): Promise<void> => {
    i18n.translations = {
      [language]: Localization.getSupportedTranslation[language](),
    };
    i18n.locale = language;
    await this.localStorageLanguage.setItem(language);
  };

  public static getLocale = () => {
    return i18n.locale;
  };
}

export const t = Localization.translate;
export default Localization;
