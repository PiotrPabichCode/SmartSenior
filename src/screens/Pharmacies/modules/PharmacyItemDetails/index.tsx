import { CustomScrollContainer } from '@src/components';
import Details from './Details';
import { PharmacyItemScreenDetails } from '@src/navigation/types';

const PharmacyItemDetails = ({ route }: PharmacyItemScreenDetails) => {
  const { pharmacy } = route.params;

  return (
    <CustomScrollContainer>
      <Details pharmacyItem={pharmacy} />
    </CustomScrollContainer>
  );
};

export default PharmacyItemDetails;
