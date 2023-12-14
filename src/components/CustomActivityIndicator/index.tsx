import useThemeColors from '@src/config/useThemeColors';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const CustomActivityIndicator = () => {
  const backgroundColor = useThemeColors().cardBackground;
  return (
    <View style={[styles.activityIndicator, { backgroundColor }]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  activityIndicator: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
