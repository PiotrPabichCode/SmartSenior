import { Tag as TagModel } from '@src/models';
import { Button } from '@rneui/themed';

type Props = TagModel & {
  onPress: () => void;
};

const Tag = ({ name, color, id, onPress }: Props) => {
  return (
    <Button
      id={id}
      title={name}
      color={color}
      containerStyle={{ minWidth: '90%', borderRadius: 25 }}
      onPress={onPress}
    />
  );
};

export default Tag;
