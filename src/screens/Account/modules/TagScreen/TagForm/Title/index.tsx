import { StyleSheet, Text } from 'react-native';
import { TitleProps } from './types';
import { t } from '@src/localization/Localization';

const Title = ({ isUpdate }: TitleProps) => {
  return <Text style={styles.title}>{isUpdate ? t('tags.updateTitle') : t('tags.new')}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
