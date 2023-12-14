import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import type { PropsWithChildren } from 'react';
import { renderIcon } from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { changeTheme, selectTheme } from '@src/redux/auth/auth.slice';
import { store } from '@src/redux/common';

type AccountItemProps = PropsWithChildren<{
  type?: string;
  icon: string;
  iconStyle?: object;
  title: string;
  onPress?: () => void;
}>;

const renderRightItems = (type?: string) => {
  const theme = selectTheme(store.getState());

  switch (type) {
    case 'language': {
      return (
        <View style={styles.rightItemsStacked}>
          <Text style={styles.languageName}>{t('languageName')}</Text>
          {renderIcon({ name: 'arrow-right' })}
        </View>
      );
    }
    case 'theme': {
      return (
        <View style={styles.rightItemsStacked}>
          <TouchableOpacity onPress={() => store.dispatch(changeTheme('light'))}>
            {theme === 'light'
              ? renderIcon({ name: 'theme-light', focused: true })
              : renderIcon({ name: 'theme-light' })}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => store.dispatch(changeTheme('dark'))}>
            {theme === 'dark'
              ? renderIcon({ name: 'theme-dark', focused: true })
              : renderIcon({ name: 'theme-dark' })}
          </TouchableOpacity>
        </View>
      );
    }
    default:
      return renderIcon({ name: 'arrow-right' });
  }
};

const AccountItem = ({ type, icon, iconStyle, title, onPress }: AccountItemProps) => {
  return onPress ? (
    <TouchableOpacity style={styles.viewStyle} onPress={onPress}>
      <View style={styles.iconTitleStyle}>
        <View style={{ width: 70 }}>{renderIcon({ name: icon, style: iconStyle })}</View>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      {renderRightItems(type)}
    </TouchableOpacity>
  ) : (
    <View style={styles.viewStyle}>
      <View style={styles.iconTitleStyle}>
        <View style={{ width: 70 }}>{renderIcon({ name: icon, style: iconStyle })}</View>
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
