import { View, StyleSheet, ActivityIndicator } from 'react-native';

const CustomActivityIndicator = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size='large' />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CustomActivityIndicator;
