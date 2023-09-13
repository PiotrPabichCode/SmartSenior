import Toast from 'react-native-toast-message';

const CustomToast = (type: string, text1: string, text2?: string) => {
  switch (type) {
    case 'success': {
      return Toast.show({
        type: 'success',
        text1: text1,
        text2: text2,
        visibilityTime: 2000,
      });
    }
    case 'error': {
      return Toast.show({
        type: 'error',
        text1: text1,
        text2: text2,
        visibilityTime: 2000,
      });
    }
    case 'info': {
      return Toast.show({
        type: 'info',
        text1: text1,
        text2: text2,
        visibilityTime: 2000,
      });
    }
    default:
      return;
  }
};

export default CustomToast;
