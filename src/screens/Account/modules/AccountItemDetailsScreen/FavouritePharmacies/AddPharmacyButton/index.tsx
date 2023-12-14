import { CustomButton, Icons } from '@src/components';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';

const AddPharmacyButton = () => {
  return (
    <CustomButton
      onPress={() => navigate('Pharmacies')}
      title={t('favouritePharmacies.add')}
      icon={<Icons name="pharmacy" />}
    />
  );
};

export default AddPharmacyButton;
