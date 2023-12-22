import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icons from '@src/components/Icons';
import { goBack, navigate } from '@src/navigation/navigationUtils';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

type HeaderProps = {
  title: string;
  nested?: boolean;
  more?: boolean;
  filter?: boolean;
  onBack?: any;
  filters?: any;
};

const CustomHeader = ({ title, nested, more, filter, onBack, filters }: HeaderProps) => {
  const theme = useThemeColors();
  const styles = useStyles();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top * 1.5, paddingBottom: 15 }]}>
      <View style={styles.itemsView}>
        {nested ? (
          <TouchableOpacity onPress={goBack} style={styles.back}>
            <Icons name="arrow-left" color={theme.icon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.back} />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {more || filter ? (
          <TouchableOpacity style={styles.more}>
            <Icons
              name={more ? 'more' : 'less'}
              color={theme.icon}
              onPress={() => {
                filter
                  ? goBack()
                  : navigate('FilterPanel', {
                      filters: filters,
                      onBack: item => onBack(item),
                    });
              }}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.more} />
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.cardBackground,
    },
    itemsView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    back: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      flex: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    more: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
