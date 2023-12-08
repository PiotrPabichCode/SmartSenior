import { useEffect, useState } from 'react';
import { selectTagById } from '@src/redux/auth/auth.slice';
import { store } from '@src/redux/common';
import { Tag } from '@src/models';

export const useActiveTag = (key: string) => {
  const selectedTag = selectTagById(store.getState(), key);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState<Tag>({
    id: '',
    name: '',
    color: '#555555',
  });
  useEffect(() => {
    const loadTag = () => {
      if (selectedTag) {
        setActiveTag(selectedTag);
      }
      setIsReady(true);
    };

    loadTag();
  }, [key]);

  return { isReady, activeTag };
};
