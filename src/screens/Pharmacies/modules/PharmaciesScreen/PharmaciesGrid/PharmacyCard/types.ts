export interface PharmacyItemProps {
  name: string;
  added: boolean;
  onPress?: () => void;
  onPressFavourite: () => void;
}
