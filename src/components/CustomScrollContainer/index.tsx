import { useTheme, useThemeMode } from '@rneui/themed';
import { View, ScrollView } from 'react-native';

type CustomScrollContainerProps = {
  children?: React.ReactNode;
};

const CustomScrollContainer = ({ children }: CustomScrollContainerProps) => {
  const theme = useTheme().theme.colors;
  console.log('container mode', useThemeMode().mode);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.mainBackground,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderRadius: 25,
            margin: 10,
            padding: 10,
            gap: 15,
            elevation: 5,
          }}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomScrollContainer;
