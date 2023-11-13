import { Tag as TagModel } from '@src/models';
import { Button } from '@rneui/themed';

const Tag = ({ name, color, id }: TagModel) => {
  return (
    <Button title={name} color={color} containerStyle={{ minWidth: '90%', borderRadius: 25 }} />
  );
};

export default Tag;
