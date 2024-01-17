import { getBackgroundColor, pickColorBasedOnRGB, renderDayValue } from '@src/utils/utils';
import { StyleSheet } from 'react-native';
import useThemeColors from '@src/config/useThemeColors';
import { Avatar } from '@rneui/themed';
import React from 'react';

export interface Day {
  value: number;
  active: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export type Days = Day[];

const DayField = ({ value, active, disabled, onPress }: Day) => {
  const title = renderDayValue(value, false);
  const styles = useStyles();
  const day = (
    <Avatar
      size={'small'}
      rounded
      title={title.length > 1 ? title.slice(0, 2) : title}
      containerStyle={[active ? styles.dayActive : styles.dayInactive, disabled && styles.disabled]}
      onPress={!disabled ? onPress : () => {}}
    />
  );
  const backgroundColor = getBackgroundColor(
    day.props.containerStyle,
    useThemeColors().mainBackground,
  );
  const titleColor = pickColorBasedOnRGB(backgroundColor, 'white', 'black');

  const existingTitleStyle = day.props.titleStyle || {};

  const extendedTitleStyle = {
    ...existingTitleStyle,
    color: titleColor,
  };

  return React.cloneElement(day, {
    titleStyle: extendedTitleStyle,
  });
};

export default DayField;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    dayActive: {
      backgroundColor: theme.lightblue,
    },
    dayInactive: {
      borderWidth: 1,
      borderColor: theme.lightblue,
    },
    disabled: {
      backgroundColor: theme.disabled,
    },
    titleDark: {
      color: 'black',
    },
    titleLight: {
      color: 'white',
    },
  });
