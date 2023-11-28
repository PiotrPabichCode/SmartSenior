import { useAppSelector } from '@src/redux/types';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Details from './Details';
import { PharmacyItemScreenDetails } from '@src/navigation/types';

const PharmacyItemDetails = ({ route }: PharmacyItemScreenDetails) => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  const { pharmacy } = route.params;

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Details pharmacyItem={pharmacy} />
    </CustomScrollContainer>
  );
};

export default PharmacyItemDetails;
