
import { Product } from "./product";

export interface SubCategory {
    name: string;
    products?: Product[],
    category?: any,
    img: string;
    id: string
}