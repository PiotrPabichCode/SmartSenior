import { t } from '@src/localization/Localization';
import { Text } from '@rneui/themed';

type Props = {
  isUpdate: boolean;
};

const Title = ({ isUpdate }: Props) => {
  return <Text h4>{isUpdate ? t('tags.updateTitle') : t('tags.new')}</Text>;
};

export default Title;
