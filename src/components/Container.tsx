import { View, ViewStyle } from 'react-native';
import Styles from '@src/common/Styles';

type ContainerProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
};

export const Container = ({ children, style, backgroundColor }: ContainerProps) => {
  return <View style={[Styles.container, { backgroundColor }, style]}>{children}</View>;
};
