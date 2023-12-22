import { CustomButton, Icons } from '@src/components';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';

const AddMedicineButton = () => {
  return (
    <CustomButton
      onPress={() => navigate('Medicines')}
      title={t('favouriteMedicines.add')}
      icon={<Icons name="pills" />}
    />
  );
};

export default AddMedicineButton;
