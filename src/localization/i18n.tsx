import i18n, { ModuleType } from 'i18next';

import { initReactI18next } from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';

import polish from './pl/translation.json';
import english from './en/translation.json';
import { useLocalStorage } from '@src/hooks/useLocalStorage';

/**
 * Constants
 */

// export const USER_PREFERRED_LANGUAGE = RNLocalize.getLocales()[0].languageCode;

const MODULE_TYPE: ModuleType = 'languageDetector';

// const LANGUAGE_DETECTOR = {
//   async: true,
//   cacheUserLanguage: () => {},
//   detect: (cb: (code: string) => void) => {
//     return cb(USER_PREFERRED_LANGUAGE);
//   },
//   init: () => {},
//   type: MODULE_TYPE,
// };

const RESOURCES = {
  pl: polish,
  en: english,
};
console.log(RESOURCES);

/**
 * i18next
 */
const language = useLocalStorage('language').getItem();

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources: RESOURCES,
    // language to use if translations in user language are not available
    fallbackLng: 'pl',
    lng: 'pl',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
