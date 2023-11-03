import { t } from '@src/localization/Localization';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const renderItem = (item: any) => {
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  );
};

const CustomDropdown = (props: any) => {
  const updatedData = Object.values(props.data).map((item: any) => ({
    ...item,
    label: !item.multiLang ? item.label : t(item.label, item.values),
  }));
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={updatedData}
      maxHeight={180}
      labelField="label"
      valueField="value"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleChange}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default CustomDropdown;
