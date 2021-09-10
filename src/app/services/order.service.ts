import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL_API = environment.URL_API
  constructor(private http: HttpClient) { }
  
  postNewOrder(order: Order): Observable<boolean>{
    const newOrder = {
      store: order.storeId,
      FNSKU: order.FNSKU,
      emailVendeur: order.emailStore,
      amount: order.Total,
      adress_livraison: order.AdressClient,
      quantity: order.Qty
    }
    return this.http.post(this.URL_API + "orders", newOrder).pipe(
      first(),
      map((res)=>{
        console.log(res);
        return true
      })
    )
  }
}
