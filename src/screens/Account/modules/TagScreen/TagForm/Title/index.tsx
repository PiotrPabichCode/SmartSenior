import { Text } from 'react-native';
import { useStyles } from './styles';
import { TitleProps } from './types';
import { t } from '@src/localization/Localization';

const Title = ({ isUpdate }: TitleProps) => {
  const styles = useStyles();
  return <Text style={styles.title}>{isUpdate ? t('tags.updateTitle') : t('tags.new')}</Text>;
};

export default Title;
