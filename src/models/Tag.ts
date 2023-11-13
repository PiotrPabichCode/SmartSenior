import { ColorValue } from 'react-native';

export interface Tag {
  name: string;
  color: ColorValue | null;
}

export type Tags = Tag[];
