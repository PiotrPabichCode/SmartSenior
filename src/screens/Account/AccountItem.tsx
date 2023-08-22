import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icons from '../../custom/Icons';

import type { PropsWithChildren } from 'react';

type AccountItemProps = PropsWithChildren<{
  type?: string;
  icon: string;
  title: string;
  onPress?: () => void;
}>;

const renderRightItems = (type?: string) => {
  const [themeMode, setThemeMode] = useState('light');

  switch (type) {
    case 'language': {
      return (
        <View style={styles.rightItemsStacked}>
          <Text style={styles.languageName}>Polski</Text>
          <Icons name='arrow-right' />
        </View>
      );
    }
    case 'theme': {
      return (
        <View style={styles.rightItemsStacked}>
          <Icons
            name={
              themeMode === 'light'
                ? 'light-mode-active-account'
                : 'light-mode-account'
            }
            onPress={() => setThemeMode('light')}
          />
          <Icons
            name={
              themeMode === 'dark'
                ? 'dark-mode-active-account'
                : 'dark-mode-account'
            }
            onPress={() => setThemeMode('dark')}
          />
        </View>
      );
    }
    default:
      return <Icons name='arrow-right' />;
  }
};

const AccountItem = ({ type, icon, title, onPress }: AccountItemProps) => {
  return onPress ? (
    <TouchableOpacity style={styles.viewStyle} onPress={onPress}>
      <View style={styles.iconTitleStyle}>
        <View style={{ width: 70 }}>
          <Icons name={icon} />
        </View>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      {renderRightItems(type)}
    </TouchableOpacity>
  ) : (
    <View style={styles.viewStyle}>
      <View style={styles.iconTitleStyle}>
        <View style={{ width: 70 }}>
          <Icons name={icon} />
        </View>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      {renderRightItems(type)}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  iconTitleStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  arrowStyle: {
    alignSelf: 'flex-end',
  },
  rightItemsStacked: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  languageName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#808080',
  },
});

export default AccountItem;
