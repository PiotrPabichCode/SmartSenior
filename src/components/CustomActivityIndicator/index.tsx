import { View, StyleSheet, ActivityIndicator } from 'react-native';

const CustomActivityIndicator = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});
