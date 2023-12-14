import { Button, Switch, Text, useTheme } from '@rneui/themed';
import { goBack } from '@src/navigation/navigationUtils';
import { useState } from 'react';
import { EventGroups, Events, Tag, Tags } from '@src/models';
import { Formik } from 'formik';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectTags } from '@src/redux/auth/auth.slice';
import { TitlesPicker } from './components';
import DateButton from '../DateButton';
import DatePicker from '../DatePicker';
import { Timestamp } from 'firebase/firestore';
import { Priority, TagsDisplay, TagsPicker } from '@src/screens/Events/modules/components';
import { ScrollView, StyleSheet } from 'react-native';
import { selectEventGroups, selectEvents } from '@src/redux/events/events.slice';
import { SearchTitle } from './components/TitlesPicker';
import { View } from 'react-native';
import useThemeColors from '@src/config/useThemeColors';

const FilterPanel = ({ route }: any) => {
  const { filters } = route.params;
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const tags = useAppSelector(state => selectTags(state));
  const [showDateFrom, setShowDateFrom] = useState<boolean>(false);
  const [showDateTo, setShowDateTo] = useState<boolean>(false);
  const styles = useStyles();
  const INITIAL_VALUES = {
    titles: [] as Array<string>,
    tags: [] as Tags,
    active: null as boolean | null,
    dateFrom: null as Timestamp | null,
    dateTo: null as Timestamp | null,
    priority: 0,
  };

  const getTitles = () => {
    const titles: Array<SearchTitle> = [];
    for (const group of eventGroups) {
      const title = group.title;
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

  const filterData = (groups: EventGroups, conditions: any) => {
    let filteredEventGroups = groups;
    // if (conditions.dateFrom) {
    //   filteredEventGroups = filteredEventGroups.filter(e => e.date?.seconds! >= conditions.dateFrom.seconds);
    // }
    // if (conditions.dateTo) {
    //   filteredEventGroups = filteredEventGroups.filter(e => e.date?.seconds! <= conditions.dateTo.seconds);
    // }
    if (conditions.active) {
      filteredEventGroups = filteredEventGroups.filter(e => e.active === conditions.active);
    }
    if (conditions.priority) {
      filteredEventGroups = filteredEventGroups.filter(e => e.priority === conditions.priority);
    }
    if (conditions.tags) {
      filteredEventGroups = filteredEventGroups.filter(group => {
        return group.tags.some(e => {
          return conditions.tags.some((t: Tag) => t.id === e);
        });
      });
    }
    if (conditions.titles) {
      filteredEventGroups = filteredEventGroups.filter(e => conditions.titles.includes(e.title));
    }

    return filteredEventGroups;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          titles: filters?.titles ?? [],
          tags: filters?.tags ?? [],
          active: filters?.active ?? null,
          dateFrom: filters?.dateFrom?.seconds
            ? Timestamp.fromDate(new Date(1000 * filters?.dateFrom?.seconds))
            : null,
          dateTo: filters?.dateTo?.seconds
            ? Timestamp.fromDate(new Date(1000 * filters?.dateTo?.seconds))
            : null,
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
            const filteredData = filterData(eventGroups, filterConditions);
            console.log(filteredData);
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text h4>{t('filterPanel.activeEvents')}</Text>
              <Switch
                value={values.active}
                onTouchStart={() => setFieldValue('active', !values.active)}
              />
            </View>
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
              onPress={() => handleSubmit()}
            />
            <Button
              title={t('filterPanel.delete')}
              size="lg"
              buttonStyle={{ backgroundColor: 'red' }}
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

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      gap: 20,
      backgroundColor: theme.cardBackground,
      paddingVertical: 15,
    },
  });
