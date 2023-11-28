import { Formik } from 'formik';
import { buildApiRequest } from '@src/utils/utils';
import { BASE_SEARCH_URL, SearchFormProps } from './types';
import { loadApiMedicines } from './utils';
import { Button, Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { useStyles } from './styles';

const SearchForm = ({ onLoad }: SearchFormProps) => {
  const styles = useStyles();
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
