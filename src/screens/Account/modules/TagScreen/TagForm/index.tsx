import { View } from 'react-native';
import { useStyles } from './styles';
import { Formik } from 'formik';
import NameInput from './NameInput';
import ColorPicker from './ColorPicker';
import ActionButtons from './ActionButtons';
import Title from './Title';
import { TagFormProps } from './types';
import { useAppDispatch } from '@src/redux/types';
import { addUserTag, updateUserTag } from '@src/redux/auth/auth.actions';
import { t } from '@src/localization/Localization';
import CustomToast from '@src/components/CustomToast';
import { TagSchema } from './utils';
import { goBack } from '@src/navigation/navigationUtils';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';

const TagForm = ({ isUpdate, tag }: TagFormProps) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          id: tag.id ?? '',
          name: tag.name ?? '',
          color: tag.color ?? '',
        }}
        validationSchema={TagSchema}
        onSubmit={async values => {
          try {
            if (isUpdate) {
              await dispatch(updateUserTag(values)).unwrap();
              CustomToast('success', t('message.success.updateTag'));
            } else {
              await dispatch(addUserTag(values)).unwrap();
              CustomToast('success', t('message.success.addTag'));
            }
            goBack();
          } catch (e) {
            console.log(e);
          }
        }}>
        {({ values, handleSubmit, setFieldValue, isSubmitting }) => (
          <>
            {isSubmitting ? (
              <CustomActivityIndicator />
            ) : (
              <>
                <Title isUpdate={isUpdate} />
                <NameInput value={values.name} onChange={setFieldValue} fieldName={'name'} />
                <ColorPicker
                  color={values.color}
                  name={values.name}
                  onChange={setFieldValue}
                  fieldName="color"
                />
                <ActionButtons isUpdate={isUpdate} onSubmit={handleSubmit} />
              </>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default TagForm;
