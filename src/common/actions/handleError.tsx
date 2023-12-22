import CustomToast from '@src/components/CustomToast';

export const handleError = (error: any) => {
  console.log(error);
  if (error.customMessage) {
    return CustomToast('error', error.customMessage);
  }
};
