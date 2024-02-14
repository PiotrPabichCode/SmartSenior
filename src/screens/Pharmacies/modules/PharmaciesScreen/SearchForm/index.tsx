import { Formik } from 'formik';
import { buildApiRequest } from '@src/utils/utils';
import { loadApiPharmacies } from './utils';
import { Input } from '@rneui/themed';
import CustomDropdown from '@src/components/CustomDropdown';
import { t } from '@src/localization/Localization';
import { BASE_SEARCH_URL, SearchFormProps, provinces } from './types';
import SearchButton from './SearchButton';

const SearchForm = ({ onLoad }: SearchFormProps) => {
  return (
    <Formik
      initialValues={{ name: '', pharmacyCity: '', pharmacyProvince: '' }}
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
            onChangeText={handleChange('pharmacyCity')}
            value={values.pharmacyCity}
          />
          <CustomDropdown
            data={provinces}
            placeholder={t('pharmaciesScreen.placeholder.province')}
            value={values.pharmacyProvince}
            handleChange={e => setFieldValue('pharmacyProvince', e.value)}
          />
          <SearchButton onPress={handleSubmit} />
        </>
      )}
    </Formik>
  );
};

export default SearchForm;
