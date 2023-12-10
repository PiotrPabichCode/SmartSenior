import { createTheme } from '@rneui/themed';

const theme = createTheme({
  components: {
    Button: {
      containerStyle: {
        borderRadius: 25,
      },
    },
    Text: {},
  },
});

export default theme;
