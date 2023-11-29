import { Tag } from '@src/models';
import { Button } from '@rneui/themed';

type Props = Tag & {
  onPress?: () => void;
};

const TagCard = ({ name, color, id, onPress }: Props) => {
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

export default TagCard;
