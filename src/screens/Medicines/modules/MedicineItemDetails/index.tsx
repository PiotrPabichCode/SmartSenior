import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Details from './Details';
import { MedicineItemScreenDetails } from '@src/navigation/types';

const MedicineItemDetails = ({ route }: MedicineItemScreenDetails) => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  const { medicine } = route.params;

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Details medicineItem={medicine} />
    </CustomScrollContainer>
  );
};

export default MedicineItemDetails;
