import { Product } from "./product";
import { SubCategory } from "./sub-category.model";

export interface Category {
    name: string;
    id: string;
    icon: string;
    products?: Product[];
    subCategory?: SubCategory[]
}