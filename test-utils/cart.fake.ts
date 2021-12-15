import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { product, product2 } from './product';

export const fakeItemsCart: ItemCart[] = [{
    cost: 25,
    product: product,
    quantity: 1,
    size: "38"
},
{
    cost: 30,
    product: product2,
    quantity: 1,
    size: "38"
}];
