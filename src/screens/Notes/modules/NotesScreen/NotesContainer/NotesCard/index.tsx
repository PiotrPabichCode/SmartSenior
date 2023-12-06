import { Divider, Text } from '@rneui/themed';
import { useStyles } from './styles';
import { TouchableOpacity, View } from 'react-native';
import { navigate } from '@src/navigation/navigationUtils';
import { NotesCardProps } from './types';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';

const NotesCard = ({
  noteKey,
  title,
  description,
  updatedAt,
  createdAt,
  extended,
}: NotesCardProps) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate('NoteDetails', {
          key: noteKey,
        })
      }>
      <View style={styles.innerContainer}>
        <Text h4 numberOfLines={2} h4Style={styles.title}>
          {title}
        </Text>

        <Divider width={1} style={styles.divider} />
        {extended && (
          <View style={styles.datesContainer}>
            <View style={styles.singleDate}>
              <Text style={styles.singleDateTitle}>{t('createdAt')}</Text>
              <Text style={styles.singleDateTimestamp}>
                {convertTimestampToDate(createdAt, 'DD-MM-YYYY HH:mm')}
              </Text>
            </View>

            <View style={styles.singleDate}>
              <Text style={styles.singleDateTitle}>{t('updatedAt')}</Text>
              <Text style={styles.singleDateTimestamp}>
                {convertTimestampToDate(updatedAt, 'DD-MM-YYYY HH:mm')}
              </Text>
            </View>
          </View>
        )}
        {!extended && (
          <View style={styles.smallerNoteCard}>
            <Text style={styles.singleDateTitle}>{t('updatedAt')}</Text>
            <Text style={styles.singleDateTimestamp}>
              {convertTimestampToDate(updatedAt, 'DD-MM-YYYY HH:mm')}
            </Text>
          </View>
        )}
        <Divider width={1} style={styles.divider} />
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotesCard;