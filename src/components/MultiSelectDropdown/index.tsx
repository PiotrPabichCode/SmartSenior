import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { t } from '@src/localization/Localization';
import useThemeColors from '@src/config/useThemeColors';
import Icons from '../Icons';
import { SetFieldValueType } from '@src/models';

type SearchType = {
  label: string;
  value: string;
};

type MultiSelectDropdownProps = {
  onChange: SetFieldValueType;
  fieldName: string;
  selectedValues: Array<string>;
  placeholder: string;
  data: Array<SearchType>;
};

const MultiSelectDropdown = (props: MultiSelectDropdownProps) => {
  const { fieldName, selectedValues, placeholder, data, onChange } = props;
  const styles = useStyles();
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        activeColor={colors.grey5}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.searchContainer}
        itemTextStyle={styles.itemText}
        iconStyle={styles.iconStyle}
        iconColor={colors.icon}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder ? placeholder : 'Select item'}
        searchPlaceholder={`${t('search')}...`}
        value={selectedValues}
        onChange={item => {
          onChange(fieldName, item);
        }}
        renderLeftIcon={() => <Icons name="safety" size={20} style={{ marginRight: 10 }} />}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectDropdown;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: { padding: 16, minWidth: '95%' },
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: theme.text,
    },
    selectedTextStyle: {
      fontSize: 14,
      color: theme.text,
    },
    searchContainer: {
      backgroundColor: theme.cardBackground,
      color: theme.text,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      borderWidth: 0,
      backgroundColor: theme.cardBackground,
      color: theme.text,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
    itemText: {
      color: theme.text,
    },
  });
