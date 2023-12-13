import { Divider } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

type Props = {
  title: string;
  detail: string;
};

const DetailsItem = ({ title, detail }: Props) => {
  return (
    <>
      <Divider style={styles.divider} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </>
  );
};

export default DetailsItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  detail: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'black',
    height: 1,
  },
});
