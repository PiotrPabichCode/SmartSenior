import { Tag } from '@src/models';
import Button from '../shared/Button';

type TagCardProps = Tag & {
  onPress?: () => void;
};

const TagCard = ({ name, color, id, onPress }: TagCardProps) => {
  return <Button id={id} title={name} buttonStyle={{ backgroundColor: color }} onPress={onPress} />;
};

export default TagCard;
