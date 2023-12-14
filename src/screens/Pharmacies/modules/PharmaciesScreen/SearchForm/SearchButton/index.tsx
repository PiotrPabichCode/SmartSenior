import { Button } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';

type Props = {
  onPress: () => void;
};

const SearchButton = ({ onPress }: Props) => {
  const backgroundColor = useThemeColors().customBtnBackground;
  return (
    <Button
      size="lg"
      title={t('button.search')}
      buttonStyle={{ backgroundColor }}
      onPress={() => onPress()}
    />
  );
};

export default SearchButton;
