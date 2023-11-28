export interface MedicineCardProps {
  name: string;
  added: boolean;
  onPress?: () => void;
  onPressFavourite: () => void;
}
