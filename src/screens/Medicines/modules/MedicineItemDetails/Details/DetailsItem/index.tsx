import { Divider, Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { StyleSheet } from 'react-native';

type Props = {
  title: string;
  detail: string;
};

const DetailsItem = ({ title, detail }: Props) => {
  const styles = useStyles();
  return (
    <>
      <Divider style={styles.divider} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </>
  );
};

export default DetailsItem;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    title: {
      fontSize: 22,
      fontWeight: '500',
      color: theme.text,
    },
    detail: {
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'center',
      color: theme.text,
    },
    divider: {
      width: '100%',
      marginVertical: 10,
      backgroundColor: theme.divider,
      height: 1,
    },
  });
