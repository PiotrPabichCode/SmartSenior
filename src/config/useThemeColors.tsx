import { useTheme } from '@rneui/themed';

const useThemeColors = () => {
  return useTheme().theme.colors;
};

export default useThemeColors;
