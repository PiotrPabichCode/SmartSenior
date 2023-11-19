import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { t } from '@src/localization/Localization';

type SearchType = {
  label: string;
  value: string;
};

const MultiSelectComponent = (props: any) => {
  const onChange = props.onChange;
  const fieldName = props.fieldName;
  const selectedValues = props.selectedValues;
  const placeholder = props.placeholder;

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={props.data as Array<SearchType>}
        labelField="label"
        valueField="value"
        placeholder={placeholder ? placeholder : 'Select item'}
        searchPlaceholder={`${t('search')}...`}
        value={selectedValues}
        onChange={item => {
          onChange(fieldName, item);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16, minWidth: '95%' },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
