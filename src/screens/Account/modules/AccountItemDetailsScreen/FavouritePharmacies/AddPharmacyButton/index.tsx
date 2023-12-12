import { CustomButton, Icons } from '@src/components';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';

const AddPharmacyButton = () => {
  return (
    <CustomButton
      onPress={() => navigate('Pharmacies')}
      title={t('favouritePharmacies.add')}
      color={'black'}
      backgroundColor={Colors.customBtnBackground}
      icon={<Icons name="pharmacy" color="black" />}
    />
  );
};

export default AddPharmacyButton;
