import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { Button } from '@src/components/shared';

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
