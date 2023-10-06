import { View, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import Styles from '@src/common/Styles';

interface RowProps {
  children?: ReactNode | ReactNode[];
  style?: ViewStyle | ViewStyle[];
  backgroundColor?: string;
}

export const Row = ({ children, style, backgroundColor }: RowProps) => {
  return (
    <View style={[Styles.rowView, { backgroundColor }, style]}>{children}</View>
  );
};
