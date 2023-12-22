import { createTheme } from '@rneui/themed';

const themeContainer = createTheme({
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
    icon: '#FFFFFF',
  },
  darkColors: {
    text: '#FFFFFF',
    mainBackground: '#000000',
    cardBackground: '#EAEAEA',
    customBtnBackground: '#FF6347',
    customBtnTitle: '#FFFFFF',
    upcomingEventsBackground: '#E6E6FA',
    upcomingEventsActionBtn: '#008080',
    upcomingEventsMoreBtn: '#FFD700',
    upcomingEventsTitle: '#000080',
    upcomingEventsDate: '#2E8B57',
    divider: '#C0C0C0',
    icon: '#000000',
  },
});

export default themeContainer;
