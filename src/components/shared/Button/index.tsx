import { Button as RNEButton } from '@rneui/themed';
import Icons from '@src/components/Icons';
import useThemeColors from '@src/config/useThemeColors';
import { pickColorBasedOnRGB } from '@src/utils/utils';
import { find, get, isArray } from 'lodash';

const Button = (props: any) => {
  let updatedProps = { ...props };

  function getBackgroundColor(objects: any) {
    const obj = isArray(objects) ? find(objects, 'backgroundColor') : objects;
    return get(obj, 'backgroundColor', useThemeColors().customBtnBackground);
  }

  if (updatedProps) {
    let backgroundColor = props.color;
    if (!backgroundColor) {
      backgroundColor = getBackgroundColor(props.buttonStyle);
    }

    const { light, dark } = useThemeColors();

    const newColor = pickColorBasedOnRGB(backgroundColor, light, dark);
    const titleStyle = props.titleStyle || {};
    const icon = props.icon || {};

    const updatedTitleStyle = {
      ...titleStyle,
      color: newColor,
    };

    updatedProps = {
      ...updatedProps,
      titleStyle: updatedTitleStyle,
    };

    if (icon && icon.props && !icon.props.hasOwnProperty('color')) {
      updatedProps.icon = <Icons {...icon.props} color={newColor} />;
    }
  }

  return <RNEButton {...updatedProps} />;
};

export default Button;
