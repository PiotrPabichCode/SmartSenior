import { CustomScrollContainer } from '@src/components';
import Details from './Details';
import { MedicineItemScreenDetails } from '@src/navigation/types';

const MedicineItemDetails = ({ route }: MedicineItemScreenDetails) => {
  const { medicine } = route.params;

  return (
    <CustomScrollContainer>
      <Details medicineItem={medicine} />
    </CustomScrollContainer>
  );
};

export default MedicineItemDetails;
