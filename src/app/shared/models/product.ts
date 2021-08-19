import { Variation } from "./variation.model";

export interface Product {
    name: string;
    description: string;
    img: any[];
    vendeur: string;
    price: number;
    id: string;
    store?: string;
    characteristics?: any
    pointures?: any | null,
    sizes_XXS_TO_XXXL?: string[] | null;
    sizes?: number[] | null,
    stock?: number;
    variations?: Variation[] | null
}
