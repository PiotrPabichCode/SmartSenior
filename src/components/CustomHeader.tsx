import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { PropsWithChildren } from 'react';
import Icons from '../custom/Icons';

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
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  back: {
    paddingTop: 25,
    paddingStart: 10,
    position: 'absolute',
    left: 0,
  },
  title: {
    paddingTop: 25,
    position: 'absolute',
    left: 50,
    right: 50,
    fontSize: 18,
    fontWeight: '500',
    color: 'blue',
    textAlign: 'center',
  },
  more: {
    paddingTop: 25,
    paddingEnd: 10,
    position: 'absolute',
    right: 0,
  },
});

export default CustomHeader;
