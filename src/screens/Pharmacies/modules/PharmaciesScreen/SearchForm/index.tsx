import { Formik } from 'formik';
import { buildApiRequest } from '@src/utils/utils';
import { loadApiPharmacies } from './utils';
import { Button, Input } from '@rneui/themed';
import CustomDropdown from '@src/components/CustomDropdown';
import { t } from '@src/localization/Localization';
import { useStyles } from './styles';
import { BASE_SEARCH_URL, SearchFormProps, provinces } from './types';

const SearchForm = ({ onLoad }: SearchFormProps) => {
  const styles = useStyles();
  return (
    <Formik
      initialValues={{ name: '', companyCity: '', companyProvince: '' }}
      onSubmit={params => {
        try {
          const request = buildApiRequest(BASE_SEARCH_URL, params);
          loadApiPharmacies(request, onLoad);
        } catch (e) {
          console.log(e);
        }
      }}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <>
          <Input
            placeholder={t('pharmaciesScreen.placeholder.name')}
            onChangeText={handleChange('name')}
            value={values.name}
          />
          <Input
            placeholder={t('pharmaciesScreen.placeholder.city')}
            onChangeText={handleChange('companyCity')}
            value={values.companyCity}
          />
          <CustomDropdown
            data={provinces}
            placeholder={t('pharmaciesScreen.placeholder.province')}
            value={values.companyProvince}
            handleChange={(e: any) => setFieldValue('companyProvince', e.value)}
          />
          <Button
            title={t('button.search')}
            containerStyle={styles.buttonSearchContainer}
            buttonStyle={styles.buttonSearchStyle}
            onPress={() => handleSubmit()}
          />
        </>
      )}
    </Formik>
  );
};

export default SearchForm;
