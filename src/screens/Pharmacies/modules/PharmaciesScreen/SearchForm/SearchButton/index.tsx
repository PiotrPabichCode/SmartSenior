import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { Button } from '@src/components/shared';

type SearchButtonProps = {
  onPress: () => void;
};

const SearchButton = ({ onPress }: SearchButtonProps) => {
  const backgroundColor = useThemeColors().customBtnBackground;
  return (
    <Button
      title={t('button.search')}
      buttonStyle={{ backgroundColor }}
      onPress={() => onPress()}
    />
  );
};

export default SearchButton;
