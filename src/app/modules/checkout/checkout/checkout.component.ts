import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Purchase } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {
  message: string = 'Veuillez patienter ...';
  waiting: boolean = true;
  onScreen: boolean = false;
  diameter: number = 400;
  orderId: string | null = null;
  userId!: string;
  userEmail!: string;
  orderOfUser: string[] = [];
  Subscription = new Subscription()
  isSuccessOrder: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private cartService: CartService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.diameter = 200;
    }
    this.onScreen = true;
    this.Subscription.add(this.userService.user$().subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.orderOfUser = this.extractId(user.orders)
        this.userEmail = user.email
      }
    }));
    this.route.queryParamMap.subscribe((queryParm: ParamMap) => {
      queryParm.get('purchaseResult') === 'success'
        ? (this.isSuccessOrder = true)
        : (this.isSuccessOrder = false);
        this.orderId = queryParm.get('id')
    });
  }
  ngAfterViewInit(): void {
    if (this.isSuccessOrder) {
  
      this.Subscription.add(this.orderService.confirmOrder(this.orderId).subscribe((res: any) => {
        if (res) {
          this.orderService
            .addOrderOnUser([...this.orderOfUser, res._id],this.userId)
            .subscribe((res: any) => {
              this.cartService.reinitCart();
              this.waiting = false;
              this.alertService.MakeAlert('Votre achat est validé', 'success')
              .then((res) => {
                this.alertService.MakeAlert(`Vous allez reçevoir votre facture par email `, "info")
                .then((res) => {
                  window.localStorage.removeItem('stripeIdSession');
                  this.waiting = true;
                  //call http post email
                  this.router.navigate(['/']);
                });
              });
            });
        }
      }));
    }
  }
  extractId(array:Purchase[] | undefined): string[]{
    const arrayIds: string[] = [];
    if(array){
      for(let i = 0; i < array.length; i++){
        const id = array[i].id;
        arrayIds.push(id)
      }
    }
    return arrayIds
  }
  ngOnDestroy(): void {
    this.onScreen = false;
    this.Subscription.unsubscribe()
  }
}
