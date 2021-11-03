import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CheckoutSession, OrderItem } from '../shared/models/order.model';
import { User } from '../shared/models/user.model';
declare const Stripe: any
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  private URL_API = environment.URL_API;
  constructor(private http: HttpClient) { }

  startCheckout( orderItem: OrderItem[], user: User): Observable<CheckoutSession>{
    return this.http.post<CheckoutSession>(this.URL_API + "initCheckout", {orderItem ,callbackUrl:this.buildCallbackUrl(), client: user})
  }
  buildCallbackUrl(): string{
    const protocol = window.location.protocol;
    const hostname = window.location.hostname
    const port = window.location.port;
    let callbackUrl = `${protocol}//${hostname}`;
    if(port){
      callbackUrl += ":" + port
    }
    return callbackUrl
  }
  redirectToCheckout(session: CheckoutSession): void {
   window.localStorage.setItem('stripeIdSession', `${session.stripeSessionId}`);
    const stripe = Stripe(session.stripePk);
    stripe.redirectToCheckout({
      sessionId: session.stripeSessionId
    })
  }
  confirmOrder(id: string | null): Observable<any>{
    const stripeIdSession = window.localStorage.getItem('stripeIdSession');
    return this.http.put(this.URL_API + "orders/" + id , {status: true, stripeIdSession: stripeIdSession}).pipe(
      map((res: any)=>{
        if(res._id){
          return res
        }else{
          return false
        }
      })
    )
  }
  addOrderOnUser(orderId: string[], userId: string): Observable<boolean>{
    return this.http.put(this.URL_API + "users/"+ userId, {orders:[...orderId] }).pipe(
      map((res: any)=>{
        if(res._id){
          return true
        }else{
          return false
        }
      })
    )
  }
}
// {
//     "_id": "61700f1fd83d743503393f62",
//     "status": true,
//     "livraison": false,
//     "idClient": "6109e68da9933461e5654491",
//     "published_at": "2021-10-20T12:44:15.098Z",
//     "subject": [
//         {
//             "_id": "61700f1fd83d743503393f63",
//             "idSeller": "Micromania",
//             "FNSKU": "XBOX_BL_500",
//             "quantity": 1,
//             "__v": 0,
//             "id": "61700f1fd83d743503393f63"
//         }
//     ],
//     "dataUser": {
//         "_id": "61700f1fd83d743503393f65",
//         "rue": "Place Pierre Renet",
//         "city": "Vesoul",
//         "numero": "27bis",
//         "postal": 70000,
//         "name": "Pierre",
//         "firstname": "Cedric",
//         "__v": 0,
//         "id": "61700f1fd83d743503393f65"
//     },
//     "createdAt": "2021-10-20T12:44:15.102Z",
//     "updatedAt": "2021-10-20T12:44:47.459Z",
//     "__v": 2,
//     "id": "61700f1fd83d743503393f62"
// }