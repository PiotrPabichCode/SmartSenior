import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import { Tag } from '@src/models';
import { goBack } from '@src/navigation/navigationUtils';
import { addUserTag, updateUserTag } from '@src/redux/auth/auth.actions';
import { selectTags } from '@src/redux/auth/auth.slice';
import { store } from '@src/redux/common';

export const onSubmit = async (newTag: Tag) => {
  try {
    const tags = selectTags(store.getState());
    if (!newTag.name) {
      return CustomToast('error', t('message.error.missingData'));
    }
    if (tags && tags.findIndex(t => t.name === newTag.name && !route.params?.key) !== -1) {
      return CustomToast('error', t('message.error.duplicateTag'));
    }

    if (newTag.id) {
      await store.dispatch(updateUserTag(newTag)).unwrap();
      CustomToast('success', t('message.success.updateTag'));
    } else {
      await store.dispatch(addUserTag(newTag)).unwrap();
      CustomToast('success', t('message.success.addTag'));
    }
    goBack();
  } catch (error) {
    console.log(error);
  }
};
