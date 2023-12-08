import { View, Text } from 'react-native';
import { useAppSelector } from '@src/redux/types';
import { selectTags } from '@src/redux/auth/auth.slice';
import { Button } from '@rneui/themed';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import TagCard from './TagCard';

const AccountTags = () => {
  const tags = useAppSelector(state => selectTags(state));

  const addButton = () => {
    return (
      <Button
        title={t('tags.addTitle')}
        titleStyle={{ fontSize: 20 }}
        color={'green'}
        onPress={() => navigate('TagScreen')}
        buttonStyle={{ minWidth: '100%' }}
        containerStyle={{ marginHorizontal: 20, marginVertical: 10, borderRadius: 25 }}
      />
    );
  };

  if (!tags || !tags.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Text style={{ fontSize: 22, textAlign: 'center' }}>{t('tags.noAssignedTags')}</Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
            marginVertical: 10,
            maxWidth: '90%',
            letterSpacing: 0.5,
          }}>
          {t('tags.description')}
        </Text>
        {addButton()}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 20 }}>
      {addButton()}
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>{t('tags.title')}</Text>
      {tags.map((tag, index) => {
        return (
          <TagCard
            key={index}
            name={tag.name}
            color={tag.color}
            id={tag.id}
            onPress={() =>
              navigate('TagScreen', {
                key: tag.id,
              })
            }
          />
        );
      })}
    </View>
  );
};

export default AccountTags;
