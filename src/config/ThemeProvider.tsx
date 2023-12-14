import { ThemeProvider as RNEThemeProvider, createTheme } from '@rneui/themed';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useMemo } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeMode = useAppSelector(state => selectTheme(state));

  const theme = useMemo(() => {
    console.log('Theme mode changed', themeMode);
    return createTheme({
      mode: themeMode,
      components: {
        Button: {
          containerStyle: {
            borderRadius: 25,
            alignSelf: 'stretch',
            marginHorizontal: 10,
          },
          color: 'primary',
        },
        Input: {
          inputContainerStyle: {
            width: '100%',
          },
          inputStyle: {
            marginHorizontal: 10,
          },
          labelStyle: {
            alignSelf: 'center',
            fontSize: 24,
          },
        },
      },

      lightColors: {
        primary: 'blue',
        text: '#000000',
        mainBackground: '#FFFFFF',
        cardBackground: '#FDFDFD',
        customBtnBackground: '#7EF9FF',
        customBtnTitle: '#3D0C02',
        upcomingEventsBackground: '#F9F9EF',
        upcomingEventsActionBtn: '#F0F8FF',
        upcomingEventsMoreBtn: '#6F00FF',
        upcomingEventsTitle: '#3C3C3C',
        upcomingEventsDate: '#251D40',
        divider: '#251D40',
        icon: '#000000',
      },
      darkColors: {
        primary: 'blue',
        text: '#F8F8FF',
        mainBackground: '#1e2124',
        cardBackground: '#282b30',
        customBtnBackground: '#36393e',
        customBtnTitle: '#FFFFFF',
        upcomingEventsBackground: '#424549',
        upcomingEventsActionBtn: '#7289da',
        upcomingEventsMoreBtn: '#290025',
        upcomingEventsTitle: 'white',
        upcomingEventsDate: 'white',
        divider: '#C0C0C0',
        icon: '#35012C',
      },
    });
  }, [themeMode]);

  return <RNEThemeProvider theme={theme}>{children}</RNEThemeProvider>;
};

export default ThemeProvider;
