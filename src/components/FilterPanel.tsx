import { Button, Header, Input, Text } from '@rneui/themed';
import { goBack } from '@src/navigation/navigationUtils';
import { useState } from 'react';
import { View } from 'react-native';
import Icons from './Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Event, Events, Tags } from '@src/models';
import { Formik } from 'formik';
import { t } from '@src/localization/Localization';
import CustomDropdown from './CustomDropdown';
import { priorities } from '@src/redux/events/events.constants';
import TagView from '@src/screens/Account/Tags/Tag';
import { useAppSelector } from '@src/redux/types';
import { selectTags } from '@src/redux/auth/auth.slice';

type FilterEventsCondition = (event: Event) => boolean;

type FilterEventsConditions = FilterEventsCondition[];

const eventsFilter = (items: Events, conditions: FilterEventsConditions): Events => {
  return items.filter(item => {
    return conditions.every(condition => condition(item));
  });
};

const FilterPanel = ({ route }: any) => {
  const { type }: { type: string } = route.params;
  const tags = useAppSelector(state => selectTags(state));
  const insets = useSafeAreaInsets();
  if (type === 'events') {
  } else {
    goBack();
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'white',
        paddingTop: insets.top * 1.5,
      }}>
      <Formik
        initialValues={{
          title: '',
          tags: [] as Tags,
          priority: 0,
          isNotification: true,
        }}
        onSubmit={values => {
          try {
            goBack();
            console.log(values);
          } catch (error) {
            console.log(error);
          }
        }}>
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <>
            <Input
              placeholder={t('createEvent.button.placeholder.title')}
              onChangeText={handleChange('title')}
              value={values.title}
            />
            {values.tags.length > 0 && (
              <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                  {t('tags.selected')}
                </Text>
                {values.tags.map((tag, index) => {
                  return (
                    <TagView
                      key={index}
                      color={tag.color}
                      name={tag.name}
                      id={tag.id}
                      onPress={() => {
                        setFieldValue(
                          'tags',
                          values.tags.filter(t => t.id !== tag.id),
                        );
                      }}
                    />
                  );
                })}
              </View>
            )}
            {tags?.length !== values.tags.length && (
              <CustomDropdown
                data={
                  tags
                    ? tags.filter(tag => !values.tags.some(valueTag => valueTag.name === tag.name))
                    : []
                }
                labelField={'name'}
                valueField={'id'}
                placeholder={t('tags.selectPlaceholder')}
                value={values.tags}
                handleChange={(e: any) => {
                  setFieldValue('tags', [...values.tags, tags?.find(tag => tag.id === e.id)]);
                }}
              />
            )}
            <CustomDropdown
              data={priorities}
              placeholder={t('createEvent.button.placeholder.priority')}
              value={values.priority}
              handleChange={(e: any) => setFieldValue('priority', e.value)}
            />
            <Button
              title={'Zastosuj filtry'}
              size="lg"
              buttonStyle={{ backgroundColor: 'green' }}
              containerStyle={{ minWidth: '90%', borderRadius: 25 }}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default FilterPanel;
