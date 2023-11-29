import { Button } from '@rneui/themed';

type Props = {
  title: string;
  onPress: any;
};

const LanguageButton = ({ title, onPress }: Props) => {
  return (
    <Button
      title={title}
      containerStyle={{ minWidth: '95%', borderRadius: 25, marginTop: 20 }}
      buttonStyle={{ padding: 15, backgroundColor: 'blue', gap: 10 }}
      titleStyle={{ fontSize: 20 }}
      icon={{ type: 'font-awesome', name: 'language', color: 'white' }}
      onPress={onPress}
    />
  );
};

export default LanguageButton;
