import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation(); // Initialize the navigation object once

export function navigate(name: any, params?: any) {
  return navigation.navigate(name, params);
}
