import { Button, Header, Input, Text } from '@rneui/themed';
import { goBack } from '@src/navigation/navigationUtils';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Event, Events, Tags } from '@src/models';
import { Formik } from 'formik';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectTags } from '@src/redux/auth/auth.slice';
import { DateButton, DatePicker, TitlesPicker } from './components';
import { Timestamp } from 'firebase/firestore';
import { Priority, TagsDisplay, TagsPicker } from '@src/screens/Events/components';
import { ScrollView } from 'react-native';
import { selectEvents } from '@src/redux/events/events.slice';
import { SearchTitle } from './components/TitlesPicker';
import MultiSelectComponent from '../MultiSelectDropdown';

type FilterEventsCondition = (event: Event) => boolean;

type FilterEventsConditions = FilterEventsCondition[];

const eventsFilter = (items: Events, conditions: FilterEventsConditions): Events => {
  return items.filter(item => {
    return conditions.every(condition => condition(item));
  });
};

const FilterPanel = ({ route }: any) => {
  const { type }: { type: string } = route.params;
  const events = useAppSelector(state => selectEvents(state));
  const tags = useAppSelector(state => selectTags(state));
  const insets = useSafeAreaInsets();
  const [showDateFrom, setShowDateFrom] = useState<boolean>(false);
  const [showDateTo, setShowDateTo] = useState<boolean>(false);

  if (type === 'events') {
  } else {
    goBack();
    return null;
  }

  const getTitles = () => {
    const titles: Array<SearchTitle> = [];
    for (const event of events) {
      const title = event.title;
      if (titles.findIndex(t => t.value === title) !== -1) {
        continue;
      }
      titles.push({
        label: title,
        value: title,
      });
    }
    return titles;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: '100%',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'white',
        paddingTop: insets.top * 1.5,
        paddingBottom: 15,
      }}>
      <Formik
        initialValues={{
          titles: [] as Array<string>,
          tags: [] as Tags,
          dateFrom: null as Timestamp | null,
          dateTo: null as Timestamp | null,
          priority: 0,
          isNotification: true,
        }}
        onSubmit={values => {
          try {
            // goBack();
            console.log(values);
          } catch (error) {
            console.log(error);
          }
        }}>
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <>
            {/* <Input
              placeholder={t('createEvent.button.placeholder.title')}
              onChangeText={handleChange('title')}
              value={values.title}
            /> */}
            <TitlesPicker
              data={getTitles()}
              fieldName={'titles'}
              selectedValues={values.titles}
              onChange={setFieldValue}
            />
            <DateButton
              date={values.dateFrom}
              onPress={setShowDateFrom}
              label={'filterPanel.dateFrom'}
              labelEmpty={'filterPanel.dateFromEmpty'}
            />
            <DatePicker
              date={values.dateFrom}
              fieldName={'dateFrom'}
              maximumDate={values.dateTo}
              isVisible={showDateFrom}
              onChange={setFieldValue}
              onClose={setShowDateFrom}
            />
            <DateButton
              date={values.dateTo}
              onPress={setShowDateTo}
              label={'filterPanel.dateTo'}
              labelEmpty={'filterPanel.dateToEmpty'}
            />
            <DatePicker
              date={values.dateTo}
              fieldName={'dateTo'}
              minimumDate={values.dateFrom}
              isVisible={showDateTo}
              onChange={setFieldValue}
              onClose={setShowDateTo}
            />
            <TagsDisplay selectedTags={values.tags} fieldName={'tags'} onPress={setFieldValue} />
            <TagsPicker
              tags={tags}
              selectedTags={values.tags}
              fieldName={'tags'}
              onChange={setFieldValue}
            />
            <Priority onChange={setFieldValue} fieldName={'priority'} priority={values.priority} />
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
    </ScrollView>
  );
};

export default FilterPanel;
