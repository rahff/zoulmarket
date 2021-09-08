import { Product } from "./product";
import { SubCategory } from "./sub-category.model";

export interface Store {
    name: string;
    id: string;
    img: string;
    products?: Product[];
    subCategory?: SubCategory[],
    banner_desktop: string,
    banner_mobile: string
}
export interface CarouselData{
    title: string,
    banner: string
}
