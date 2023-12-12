import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  onPress: () => void;
};

const SearchButton = ({ onPress }: Props) => {
  return <Button size="lg" title={t('button.search')} onPress={() => onPress()} />;
};

export default SearchButton;
