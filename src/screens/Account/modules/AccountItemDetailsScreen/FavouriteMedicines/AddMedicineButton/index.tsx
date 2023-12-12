import { CustomButton, Icons } from '@src/components';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';

const AddMedicineButton = () => {
  return (
    <CustomButton
      onPress={() => navigate('Medicines')}
      title={t('favouriteMedicines.add')}
      color={'black'}
      backgroundColor={Colors.customBtnBackground}
      icon={<Icons name="pills" color="black" />}
    />
  );
};

export default AddMedicineButton;
