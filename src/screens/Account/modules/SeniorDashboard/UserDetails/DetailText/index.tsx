import { Text } from '@rneui/themed';
import { StyleSheet } from 'react-native';

type Props = {
  text: string;
};

const DetailText = ({ text }: Props) => {
  return <Text style={styles.detail}>{text}</Text>;
};

export default DetailText;

const styles = StyleSheet.create({
  detail: {
    fontSize: 18,
    fontWeight: '700',
  },
});
