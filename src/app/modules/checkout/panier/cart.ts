
import { ItemCart } from "src/app/shared/models/item-cart.model";
import { Order, OrderItem } from "src/app/shared/models/order.model";
import { User } from "src/app/shared/models/user.model";

export class Cart  {

    total: number = 0;

    constructor(public user: User ,public items: ItemCart[] = []){
        this.items = items;
        this.user = user;
        this.init()
    }
    init(): void {
        this.total = this.calculTotal();
    }
    calculTotal(): number{
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].product.price * this.items[i].quantity;
        }
        return total
    }
    getItemOrder(): OrderItem[]{
        const array: OrderItem[] = []
        this.items.forEach((item)=>{
            const order = {productId: item.product.id, quantity: item.quantity, FNSKU: {product :item.product.FNSKU, store: item.product.vendeur, size: item.size}  }
            array.push(order)
        })
        return array
    }
    getProductIds(): any[]{
        const array: any[] = []
        this.items.forEach((item)=>{
            const idProduct = item.product.id
            array.push(idProduct)
        })
        return array
    }
    createOrderForItems(): Order[]{
        const arrayOrders: Order[] = [];
        this.items.forEach((item)=>{
            const order: Order = {
                FNSKU: item.product.FNSKU,
                adresse_livraison: {...this.user.adress,client:`${this.user.name + ' ' + this.user.firstname}`},
                items: this.getItemOrder(),
                quantity: item.quantity,
                paypal_auth: null
            }
            arrayOrders.push(order)
        })
        return arrayOrders
    }

    
}