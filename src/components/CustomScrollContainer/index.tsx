import useThemeColors from '@src/config/useThemeColors';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomScrollContainerProps = {
  children?: React.ReactNode;
};

const CustomScrollContainer = ({ children }: CustomScrollContainerProps) => {
  const styles = useStyles();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.innerContainer}>
        <View style={styles.itemsContainer}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default CustomScrollContainer;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flexGrow: 1,
      backgroundColor: theme.mainBackground,
    },
    itemsContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
      borderRadius: 25,
      margin: 10,
      padding: 10,
      gap: 15,
      elevation: 5,
    },
  });
