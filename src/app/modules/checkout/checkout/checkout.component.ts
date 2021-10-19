import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  message: string = "Veuillez patienter ..."
  waiting: boolean = true
  onScreen: boolean = false;
  diameter: number = 400;
  orderId: string | null = null;
  userId!: string;
  isSuccessOrder: boolean = false
  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private userService: UserService,
              private cartService: CartService) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 200
    }
    this.onScreen = true;
    this.userService.user$.subscribe((user)=>{
      if(user){
        this.userId = user.id
      }
    })
    this.route.queryParamMap.subscribe((queryParm: ParamMap)=>{
      queryParm.get('purchaseResult') === "success" ? this.isSuccessOrder = true : this.isSuccessOrder = false;
      if(this.isSuccessOrder){
        this.orderId = queryParm.get('id');
        this.orderService.confirmOrder(this.orderId).subscribe((res)=>{
          if(res){
            this.cartService.reinitCart();
            this.waiting = false
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Votre achat est validé',
              showConfirmButton: false,
              timer: 1500
            }).then((res)=>{
              Swal.fire({
                icon: 'info',
                title: 'Information',
                text: 'Vous avez reçu un email avec votre QR code',
                footer: '<a routerLink=["profil", userId]>Voir le détail de mon achat</a>'
              }).then((res)=>{
                this.router.navigate(['/'])
              })
            })
          }
        })
      }
    })
  }
  ngOnDestroy(): void{
    this.onScreen = false
  }

}
