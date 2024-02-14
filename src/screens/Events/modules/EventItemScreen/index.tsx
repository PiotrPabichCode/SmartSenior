import { EventItemScreenProps } from '@src/navigation/types';
import { convertTimestampToDate, getUpdatedFields } from '@src/utils/utils';
import { useState } from 'react';
import { Formik } from 'formik';
import FormikObserver from '@src/utils/FormikObserver';
import { t } from '@src/localization/Localization';
import {
  CustomScrollContainer,
  CustomActivityIndicator,
  DiscardChangesAlert,
  MultipleImagePicker,
  CustomToast,
} from '@src/components';
import { goBack } from '@src/navigation/navigationUtils';
import { Timestamp } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { CompleteButton, DateButton, Description, TagsDisplay, Title } from '../components';
import { Text } from '@rneui/themed';
import { completeEvent } from '@src/redux/events/events.actions';
import { selectEventsStatus } from '@src/redux/events/events.slice';
import { ChangeEventSchema } from './utils';
import { usePrepareEvent } from './usePrepareEvent';

const EventItemScreen = ({ route, navigation }: EventItemScreenProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => selectEventsStatus(state));
  const { groupKey, date } = route.params;
  const { event, isReady, initialValues, setInitialValues } = usePrepareEvent(groupKey, date);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  if (!isReady || status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (!event) {
    goBack();
    return null;
  }

  return (
    <CustomScrollContainer>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={values => {
          try {
            values.updatedAt = Timestamp.now();
            ChangeEventSchema.validate(values)
              .then(async () => {
                delete values.days;
                await dispatch(completeEvent({ groupKey: groupKey, data: values })).unwrap();
                setInitialValues(values);
                CustomToast('success', t('eventItemScreen.message.success.complete'));
                goBack();
              })
              .catch(error => {
                console.log(error);
                CustomToast('error', t('eventItemScreen.message.error.complete'));
              });
          } catch (error) {
            console.log(error);
            CustomToast('error', t('error.unknown'));
          }
        }}>
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <>
            {event.completed && (
              <Text h3 style={{ textAlign: 'center' }}>
                {t('eventItemScreen.completedTitle', {
                  date: convertTimestampToDate(event.completed, 'DD-MM-YYYY HH:mm'),
                })}
              </Text>
            )}

            <Title value={values.title} onChange={handleChange} disabled={true} />
            <DateButton date={values.date} disabled={true} />
            <TagsDisplay selectedTags={values.tags} disabled={true} />
            <Description value={values.description} onChange={handleChange} />
            <MultipleImagePicker onChange={setFieldValue} initialValues={values.images} />
            {!event.completed && event.active && (
              <CompleteButton
                fieldName={'completed'}
                onChange={setFieldValue}
                onPress={handleSubmit}
              />
            )}
            <FormikObserver
              onChange={data => {
                const changedFields = getUpdatedFields(data.initialValues, data.values);
                if (Object.keys(changedFields).length > 0) {
                  setIsUpdate(true);
                } else {
                  setIsUpdate(false);
                }
              }}
            />
            <DiscardChangesAlert navigation={navigation} isUpdate={isUpdate} />
          </>
        )}
      </Formik>
    </CustomScrollContainer>
  );
};

export default EventItemScreen;
