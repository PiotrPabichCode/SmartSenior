import { createTheme } from '@rneui/themed';

const theme = createTheme({
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
  },
});

export default theme;
