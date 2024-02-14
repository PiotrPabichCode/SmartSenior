import { Text } from '@rneui/themed';
import { StyleSheet } from 'react-native';

type DetailTextProps = {
  text: string;
};

const DetailText = ({ text }: DetailTextProps) => {
  return <Text style={styles.detail}>{text}</Text>;
};

export default DetailText;

const styles = StyleSheet.create({
  detail: {
    fontSize: 18,
    fontWeight: '700',
  },
});
