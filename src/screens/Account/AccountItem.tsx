import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import type { PropsWithChildren } from 'react';
import { renderIcon } from '@custom/Icons';

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
          {renderIcon('arrow-right')}
        </View>
      );
    }
    case 'theme': {
      return (
        <View style={styles.rightItemsStacked}>
          <TouchableOpacity onPress={() => setThemeMode('light')}>
            {themeMode === 'light'
              ? renderIcon('theme-light', true)
              : renderIcon('theme-light')}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setThemeMode('dark')}>
            {themeMode === 'dark'
              ? renderIcon('theme-dark', true)
              : renderIcon('theme-dark')}
          </TouchableOpacity>
        </View>
      );
    }
    default:
      return renderIcon('arrow-right');
  }
};

const AccountItem = ({ type, icon, title, onPress }: AccountItemProps) => {
  return onPress ? (
    <TouchableOpacity style={styles.viewStyle} onPress={onPress}>
      <View style={styles.iconTitleStyle}>
        <View style={{ width: 70 }}>{renderIcon(icon)}</View>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      {renderRightItems(type)}
    </TouchableOpacity>
  ) : (
    <View style={styles.viewStyle}>
      <View style={styles.iconTitleStyle}>
        <View style={{ width: 70 }}>{renderIcon(icon)}</View>
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
