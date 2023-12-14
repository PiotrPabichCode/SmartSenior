import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { useRef, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const CustomDropdown = (props: any) => {
  const labelField = props.labelField ? props.labelField : 'label';
  const valueField = props.valueField ? props.valueField : 'value';
  const updatedData = Object.values(props.data).map((item: any) => ({
    ...item,
    label: !item.multiLang ? item.label : t(item.label, item.values),
  }));
  const [dropdownPosition, setDropdownPosition] = useState<'auto' | 'bottom' | 'top' | undefined>(
    'auto',
  );
  const dropdownRef = useRef<View>(null);
  const [positionFixed, setPositionFixed] = useState<boolean>(false);
  const styles = useStyles();

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label ? item.label : item[labelField]}</Text>
      </View>
    );
  };

  const onLayout = () => {
    dropdownRef?.current?.measureInWindow((fx, fy, width, height) => {
      if (fy + 250 >= Dimensions.get('window').height) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
      setPositionFixed(true);
    });
  };

  return (
    <View collapsable={false} ref={dropdownRef} style={[{ width: '95%' }, props.viewStyle]}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.textItem}
        data={updatedData}
        maxHeight={180}
        search={props.search}
        disable={!updatedData.length}
        containerStyle={{
          display: positionFixed ? 'flex' : 'none',
          borderWidth: 0,
        }}
        labelField={labelField}
        valueField={valueField}
        placeholder={props.placeholder}
        value={props[valueField] ? props[valueField] : props.value}
        onChange={props.handleChange}
        renderItem={renderItem}
        dropdownPosition={dropdownPosition}
        onBlur={() => {
          setPositionFixed(false);
        }}
        onFocus={onLayout}
      />
    </View>
  );
};

export default CustomDropdown;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    dropdown: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 12,
      elevation: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
    },
    placeholderStyle: {
      fontSize: 16,
      lineHeight: 18,
      color: theme.text,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: theme.text,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });
