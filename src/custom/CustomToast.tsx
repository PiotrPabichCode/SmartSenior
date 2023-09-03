import Toast from 'react-native-root-toast';

type CustomToastType = {
  type: string;
  duration: number;
};

export const SHORT_MESSAGE = 3000;
export const LONG_MESSAGE = 5000;

const CustomToast = (message: string, { type, duration }: CustomToastType) => {
  switch (type) {
    case 'success':
      return Toast.show(message, {
        duration: duration,
        position: Toast.positions.BOTTOM,
        hideOnPress: true,
        opacity: 1,
        backgroundColor: '#355E3B',
        textColor: '#FFFFFF',
      });
    case 'error':
      return Toast.show(message, {
        duration: duration,
        position: Toast.positions.BOTTOM,
        hideOnPress: true,
        opacity: 1,
        backgroundColor: '#FF0000',
        textColor: '#FFFFFF',
      });
    default:
      return Toast.show(message, {
        duration: duration,
        position: Toast.positions.BOTTOM,
        hideOnPress: true,
        opacity: 1,
        backgroundColor: '#808080',
        textColor: '#000000',
      });
  }
};

export default CustomToast;
