import { Formik } from 'formik';
import { buildApiRequest } from '@src/utils/utils';
import { BASE_SEARCH_URL, SearchFormProps } from './types';
import { loadApiMedicines } from './utils';
import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import SearchButton from './SearchButton';

const SearchForm = ({ onLoad }: SearchFormProps) => {
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={params => {
        try {
          const request = buildApiRequest(BASE_SEARCH_URL, params);
          loadApiMedicines(request, onLoad);
        } catch (e) {
          console.log(e);
        }
      }}>
      {({ values, handleChange, handleSubmit }) => (
        <>
          <Input
            placeholder={t('medicinesScreen.placeholder')}
            onChangeText={handleChange('name')}
            value={values.name}
          />
          <SearchButton onPress={handleSubmit} />
        </>
      )}
    </Formik>
  );
};

export default SearchForm;
