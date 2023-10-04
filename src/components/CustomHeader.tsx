import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { PropsWithChildren } from 'react';
import Icons from '@src/components/Icons';

type HeaderProps = PropsWithChildren<{
  title: string;
  nested?: boolean;
  more?: boolean;
}>;

const CustomHeader = ({ title, nested, more }: HeaderProps) => {
  const navigation = useNavigation();

  const handleBackClick = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      {nested && (
        <TouchableOpacity onPress={handleBackClick} style={styles.back}>
          <Icons name='arrow-left' />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {more && (
        <View style={styles.more}>
          <Icons name='more' />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 0,
    paddingStart: 10,
    paddingBottom: 10,
  },
  title: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: '500',
    color: 'blue',
  },
  more: {
    paddingBottom: 10,
    position: 'absolute',
    right: 0,
    paddingEnd: 10,
  },
});

export default CustomHeader;
