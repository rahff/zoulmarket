import { Avis } from './user.model';
import { Variation } from './variation.model';

export interface Product {
  name: string;
  description: string;
  img: any[];
  vendeur: string;
  price: number;
  id: string;
  store?: string;
  characteristics?: string[];
  stock?: boolean;
  variations?: Variation[] | null;
  FNSKU: string;
  tailles: string[] | null;
  avis: Avis[];
}
