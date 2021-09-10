import { ItemCart } from "./item-cart.model";
import { Store } from "./store";
import { User } from "./user.model";

export class Order {
    
    
    constructor(public item:ItemCart, public emailStore: string, public client: User | null, public storeId: string){
        this.item = item;
        this.emailStore = emailStore,
        this.client = client
    }
    get Qty(){
        return this.item.quantity
    }
    get Total(): number{
    const pU = this.item.product.price;
    const qty = this.item.quantity;
    return +(pU * qty).toFixed(2)
    }
    get FNSKU(){
        return this.item.product.FNSKU
    }
    
    get AdressClient():any{
     const adress = {
        numero:this.client?.numero,
        rue: this.client?.street,
        postal: this.client?.postal,
        city: this.client?.city
       } 
       return adress
    }
}