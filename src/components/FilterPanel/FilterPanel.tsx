import { Button } from '@rneui/themed';
import { goBack } from '@src/navigation/navigationUtils';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Events, Tag, Tags } from '@src/models';
import { Formik } from 'formik';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectTags } from '@src/redux/auth/auth.slice';
import { TitlesPicker } from './components';
import DateButton from '../DateButton';
import DatePicker from '../DatePicker';
import { Timestamp } from 'firebase/firestore';
import { Priority, TagsDisplay, TagsPicker } from '@src/screens/Events/components';
import { ScrollView } from 'react-native';
import { selectEvents } from '@src/redux/events/events.slice';
import { SearchTitle } from './components/TitlesPicker';

const FilterPanel = ({ route }: any) => {
  const { filters } = route.params;
  const events = useAppSelector(state => selectEvents(state));
  const tags = useAppSelector(state => selectTags(state));
  const insets = useSafeAreaInsets();
  const [showDateFrom, setShowDateFrom] = useState<boolean>(false);
  const [showDateTo, setShowDateTo] = useState<boolean>(false);
  const INITIAL_VALUES = {
    titles: [] as Array<string>,
    tags: [] as Tags,
    dateFrom: null as Timestamp | null,
    dateTo: null as Timestamp | null,
    priority: 0,
  };

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

  const filterData = (events: Events, conditions: any) => {
    let filteredEvents = events;
    if (conditions.dateFrom) {
      filteredEvents = filteredEvents.filter(e => e.date?.seconds! >= conditions.dateFrom.seconds);
    }
    if (conditions.dateTo) {
      filteredEvents = filteredEvents.filter(e => e.date?.seconds! <= conditions.dateTo.seconds);
    }
    if (conditions.priority) {
      filteredEvents = filteredEvents.filter(e => e.priority === conditions.priority);
    }
    if (conditions.tags) {
      filteredEvents = filteredEvents.filter(event => {
        return event.tags.some(e => {
          return conditions.tags.some((t: Tag) => t.id === e.id);
        });
      });
    }
    if (conditions.titles) {
      filteredEvents = filteredEvents.filter(e => conditions.titles.includes(e.title));
    }

    return filteredEvents;
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
          titles: filters?.titles ?? ([] as Array<string>),
          tags: filters?.tags ?? ([] as Tags),
          dateFrom: filters?.dateFrom?.seconds
            ? Timestamp.fromDate(new Date(1000 * filters?.dateFrom?.seconds))
            : (null as Timestamp | null),
          dateTo: filters?.dateTo?.seconds
            ? Timestamp.fromDate(new Date(1000 * filters?.dateTo?.seconds))
            : (null as Timestamp | null),
          priority: filters?.priority ?? 0,
        }}
        enableReinitialize
        onSubmit={values => {
          try {
            let filterConditions = JSON.parse(
              JSON.stringify(values, (_, value) => {
                if (value && !(Array.isArray(value) && !value.length)) {
                  return value;
                }
              }),
            );
            const filteredData = filterData(events, filterConditions);
            route.params.onBack({
              filteredData: filteredData,
              filterConditions: filterConditions,
            });
            goBack();
          } catch (error) {
            console.log(error);
          }
        }}>
        {({ values, setFieldValue, handleSubmit, setValues }) => (
          <>
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
              title={t('filterPanel.submit')}
              size="lg"
              buttonStyle={{ backgroundColor: 'green' }}
              containerStyle={{ minWidth: '90%', borderRadius: 25 }}
              onPress={() => handleSubmit()}
            />
            <Button
              title={t('filterPanel.delete')}
              size="lg"
              buttonStyle={{ backgroundColor: 'red' }}
              containerStyle={{ minWidth: '90%', borderRadius: 25 }}
              onPress={() => {
                setValues(INITIAL_VALUES);
              }}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default FilterPanel;
