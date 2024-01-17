import Calendar from '@src/components/Calendar';
import Localization from '@src/localization/Localization';
import { changeLanguage, changeTheme } from '@src/redux/auth/auth.actions';
import { store } from '@src/redux/common';
import { useEffect, useState } from 'react';

export const useAppSetup = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Calendar.setupCalendar();
        await Localization.setupI18nConfig();
        await store.dispatch(changeTheme());
        store.dispatch(changeLanguage(Localization.getLocale()));
        setIsAppReady(true);
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, []);

  return isAppReady;
};
