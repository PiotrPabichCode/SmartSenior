import { ButtonProps } from '@rneui/base';
import { Button as RNEButton } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { pickColorBasedOnRGB } from '@src/utils/utils';

const Button = (props: ButtonProps) => {
  const backgroundColor = props.buttonStyle?.backgroundColor;
  const { light, dark } = useThemeColors();

  let updatedProps: ButtonProps = { ...props };

  if (backgroundColor) {
    const newColor = pickColorBasedOnRGB(backgroundColor, light, dark);
    const titleStyle = props.titleStyle || {};

    updatedProps = {
      ...updatedProps,
      titleStyle: {
        ...titleStyle,
        color: newColor,
      },
    };
  }

  return <RNEButton {...updatedProps} />;
};

export default Button;
