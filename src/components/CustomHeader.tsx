import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icons from '@src/components/Icons';
import { goBack, navigationRef } from '@src/navigation/navigationUtils';

type HeaderProps = {
  title: string;
  nested?: boolean;
  more?: boolean;
};

const CustomHeader = ({ title, nested, more }: HeaderProps) => {
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
        {more && (
          <View style={styles.moreContainer}>
            <Icons
              name="more"
              onPress={() => {
                navigationRef.dispatch(DrawerActions.openDrawer());
              }}
            />
          </View>
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
  moreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomHeader;
