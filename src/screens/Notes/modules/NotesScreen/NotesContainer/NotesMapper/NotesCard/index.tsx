import { Divider, Text } from '@rneui/themed';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { navigate } from '@src/navigation/navigationUtils';
import { NotesCardProps } from './types';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { deleteNoteAlert } from './utils';
import { useAppDispatch } from '@src/redux/types';
import useThemeColors from '@src/config/useThemeColors';

const NotesCard = ({
  noteKey,
  title,
  description,
  updatedAt,
  createdAt,
  extended,
}: NotesCardProps) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => {
        return deleteNoteAlert(noteKey, title, dispatch);
      }}
      onPress={() =>
        navigate('NoteDetails', {
          key: noteKey,
        })
      }>
      <View style={styles.innerContainer}>
        <Text style={styles.title} numberOfLines={1} allowFontScaling>
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

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 25,
      minHeight: 150,
      maxHeight: 200,
      backgroundColor: theme.cardBackground,
      elevation: 5,
      margin: 10,
    },
    innerContainer: {
      gap: 5,
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      maxWidth: '90%',
      marginTop: 10,
      color: theme.text,
    },
    divider: {
      width: '100%',
    },
    datesContainer: {
      flexDirection: 'row',
    },
    singleDate: { alignItems: 'center', flex: 1 },
    singleDateTitle: { fontSize: 15, fontWeight: '700', color: theme.text },
    singleDateTimestamp: {
      fontWeight: '500',
      fontSize: 15,
      color: theme.text,
    },
    smallerNoteCard: {
      flexGrow: 1,
      alignItems: 'center',
    },
    description: {
      textAlign: 'center',
      textAlignVertical: 'bottom',
      maxWidth: '90%',
      fontSize: 14,
      marginBottom: 10,
      color: theme.text,
    },
  });
