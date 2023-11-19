import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icons from '@src/components/Icons';
import { goBack, navigate } from '@src/navigation/navigationUtils';

type HeaderProps = {
  title: string;
  nested?: boolean;
  more?: boolean;
  filter?: boolean;
  onBack?: any;
  filters?: any;
};

const CustomHeader = ({ title, nested, more, filter, onBack, filters }: HeaderProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsView}>
        {nested ? (
          <TouchableOpacity onPress={goBack} style={styles.back}>
            <Icons name="arrow-left" />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
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
    fontWeight: '500',
  },
  more: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomHeader;
