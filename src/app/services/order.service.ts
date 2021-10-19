import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CheckoutSession, Order, OrderItem } from '../shared/models/order.model';
import { User } from '../shared/models/user.model';
declare const Stripe: any
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  private URL_API = environment.URL_API
  constructor(private http: HttpClient) { }
  startCheckout( orderItem: OrderItem[], user: User): Observable<CheckoutSession>{
    return this.http.post<CheckoutSession>(this.URL_API + "initCheckout", {orderItem ,callbackUrl:this.buildCallbackUrl(), client: user})
  }
  postNewOrder(orders:Order[]): Observable<{order: Order | null, result: string, status: number}>{
     console.log(orders);
      return this.http.post(this.URL_API + "orders", orders).pipe(
        first(),
        map((res: any)=>{
          console.log(res);
          return {order: res.order, result: res.result, status: res.status}
        })
      )
  
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
    console.log(session.stripePk);
    
    const stripe = Stripe(session.stripePk);
    stripe.redirectToCheckout({
      sessionId: session.stripeSessionId
    })
  }
  confirmOrder(id: string | null): Observable<boolean>{
    return this.http.put(this.URL_API + "orders/" + id , {status: true}).pipe(
      map((res)=>{
        return true
      })
    )
  }
}
