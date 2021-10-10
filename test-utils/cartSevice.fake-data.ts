import { ItemCart } from "src/app/shared/models/item-cart.model";
import { Product } from "src/app/shared/models/product";


export const product: Product = {
    description: "fake description for testing",
    id: "565545648548",
    img:["http://www.fakePath.fr/images/test","http://www.fakePath.fr/images/test2"],
    name: "testing",
    price: 75,
    vendeur: "tester",
    characteristics: ["test1", "test2", "test3"],
    FNSKU: 'FNSKU1'
}
export const product2: Product = {
    description: "fake2 description for testing",
    id: "5655456485482",
    img:["http://www.fakePath.fr/images/test2","http://www.fakePath.fr/images/test22"],
    name: "testing2",
    price: 55,
    vendeur: "tester2",
    characteristics: ["test12", "test22", "test32"],
    FNSKU: 'FNSKU2'
}
export const fakeCart: ItemCart[] = [
    {
        product: product,
        cost: 75,
        quantity: 1,
    }
];
export const fakeItem: ItemCart = {
        product: product2,
        cost: 75,
        quantity: 4,
}