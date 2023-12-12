import { useAppSelector } from '@src/redux/types';
import { selectTags } from '@src/redux/auth/auth.slice';
import EmptyTags from './EmptyTags';
import TagsMapper from './TagsMapper';

const AccountTags = () => {
  const tags = useAppSelector(state => selectTags(state));

  if (!tags || !tags.length) {
    return <EmptyTags />;
  }

  return <TagsMapper tags={tags} />;
};

export default AccountTags;
