import { ThemeProvider as RNEThemeProvider, createTheme } from '@rneui/themed';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useMemo } from 'react';
import { StatusBar } from 'react-native';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeMode = useAppSelector(state => selectTheme(state));

  const theme = useMemo(() => {
    console.log('Theme mode changed', themeMode);
    const newTheme = createTheme({
      mode: themeMode,
      components: {
        Button: (props, theme) => ({
          containerStyle: {
            borderRadius: 25,
            alignSelf: 'stretch',
            marginHorizontal: 10,
          },
          color: theme.colors.text,
        }),
        Text: (props, theme) => ({
          style: {
            color: theme.colors.text,
          },
        }),
        Input: (props, theme) => ({
          inputContainerStyle: {
            width: '100%',
            borderColor: theme.colors.text,
          },
          inputStyle: {
            marginHorizontal: 10,
            color: theme.colors.text,
          },
          placeholderTextColor: theme.colors.text,
          labelStyle: {
            alignSelf: 'center',
            fontSize: 24,
          },
          keyboardAppearance: themeMode,
        }),
        CheckBox: (props, theme) => ({
          containerStyle: {
            backgroundColor: theme.colors.cardBackground,
          },
        }),
      },

      lightColors: {
        light: '#F8F8FF',
        dark: '#1e2124',
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
        speedDial: '#ad1457',
      },
      darkColors: {
        light: '#F8F8FF',
        dark: '#1e2124',
        text: '#F8F8FF',
        mainBackground: '#1e2124',
        cardBackground: '#282b30',
        customBtnBackground: '#36393e',
        customBtnTitle: '#FFFFFF',
        upcomingEventsBackground: '#424549',
        upcomingEventsActionBtn: '#003262',
        upcomingEventsMoreBtn: '#290025',
        upcomingEventsTitle: 'white',
        upcomingEventsDate: 'white',
        divider: '#C0C0C0',
        icon: '#F8F8FF',
        speedDial: '#ad1457',
      },
    });

    StatusBar.setBarStyle(themeMode === 'dark' ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(themeMode === 'dark' ? '#282b30' : 'white');
    return newTheme;
  }, [themeMode]);

  return <RNEThemeProvider theme={theme}>{children}</RNEThemeProvider>;
};

export default ThemeProvider;
