import { EventItemScreenProps } from '@src/navigation/types';
import { convertTimestampToDate, getUpdatedFields } from '@src/utils/utils';
import { priorities } from '@src/redux/events/events.constants';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomToast from '@src/components/CustomToast';
import Colors from '@src/constants/Colors';
import FormikObserver from '@src/utils/FormikObserver';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { goBack } from '@src/navigation/navigationUtils';
import { Timestamp } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTags, selectTheme } from '@src/redux/auth/auth.slice';
import { Event, Frequency, Image, Notifications, Tag, Tags } from '@src/models';
import MultipleImagePicker from '@src/components/MultipleImagePicker';
import { CompleteButton, DateButton, Description, TagsDisplay, Title } from './components';
import { getEventForGroupAndDate } from '@src/redux/events/events.api';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { Text } from '@rneui/themed';
import { completeEvent } from '@src/redux/events/events.actions';
import { selectEventsStatus } from '@src/redux/events/events.slice';

const EventItemScreen = ({ route, navigation }: EventItemScreenProps) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState<boolean>(false);
  const theme = useAppSelector(state => selectTheme(state));
  const tags = useAppSelector(state => selectTags(state));
  const status = useAppSelector(state => selectEventsStatus(state));
  const [event, setEvent] = useState<Event | null>(null);
  const [initialValues, setInitialValues] = useState<any>({});
  const currentTheme = Colors[theme];
  const { groupKey, date } = route.params;
  // const event = useAppSelector(state => selectEventByKey(state, eventKey));

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    const prepareEvent = async () => {
      try {
        if (groupKey && date) {
          const event = await getEventForGroupAndDate(groupKey, date);
          setEvent(event);
          setIsReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    prepareEvent();
  }, [groupKey, date]);

  useEffect(() => {
    if (event) {
      setInitialValues({
        title: event.title,
        tags: event.tags,
        images: event.images,
        description: event.description,
        date: event.date,
        days: event.days,
        frequency: event.frequency,
        notifications: event.notifications,
        priority: event.priority,
        deleted: event.deleted,
        completed: event.completed,
        userUid: event.userUid,
      });
    }
  }, [event]);

  if (!isReady || status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (!event) {
    goBack();
    return null;
  }

  const ChangeEventSchema = Yup.object().shape({
    title: Yup.string().min(1).required(),
    tags: Yup.mixed<Tag>(),
    images: Yup.mixed<Image>(),
    description: Yup.string(),
    date: Yup.mixed<Timestamp>().nonNullable().required(),
    frequency: Yup.mixed<Frequency>().required(),
    notifications: Yup.mixed<Notifications>().required(),
    priority: Yup.number()
      .test('is-valid-priority', 'Invalid priority value', function (value) {
        return priorities.some(p => p.value === value);
      })
      .required(),
    deleted: Yup.boolean().required(),
  });

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={values => {
          try {
            values.updatedAt = Timestamp.now();
            ChangeEventSchema.validate(values)
              .then(async () => {
                delete values.days;
                await dispatch(completeEvent({ group: groupKey, data: values })).unwrap();
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
              <Text h3 style={{ textAlign: 'center' }}>{`Zadanie ukończone ${convertTimestampToDate(
                event.completed,
                'DD-MM-YYYY HH:mm',
              )}`}</Text>
            )}

            <Title value={values.title} onChange={handleChange} disabled={true} />
            <DateButton date={values.date} />
            <TagsDisplay selectedTags={values.tags} />
            <Description value={values.description} onChange={handleChange} />
            <MultipleImagePicker onChange={setFieldValue} initialValues={values.images} />
            {!event.completed && (
              <CompleteButton
                fieldName={'completed'}
                onChange={setFieldValue}
                onPress={handleSubmit}
              />
            )}
            <FormikObserver
              onChange={(data: any) => {
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
