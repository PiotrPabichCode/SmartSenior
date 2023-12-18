import Calendar from '@src/components/Calendar';
import Localization from '@src/localization/Localization';
import { changeLanguage } from '@src/redux/auth/auth.actions';
import { changeTheme } from '@src/redux/auth/auth.slice';
import { store } from '@src/redux/common';
import { useEffect, useState } from 'react';

export const useAppSetup = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Calendar.setupCalendar();
        await Localization.setupI18nConfig();
        store.dispatch(changeLanguage(Localization.getLocale()));
        store.dispatch(changeTheme('dark'));
        setIsAppReady(true);
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, []);

  return isAppReady;
};