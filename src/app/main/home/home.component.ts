import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { User } from 'src/app/shared/models/user.model';
import { MakeAlert } from 'src/app/shared/functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public stateMenu = 'close';
  public mobile: boolean = false;
  public onScreen: boolean = false;
  public promo!: Product[];
  public userId: string | null = null;
  public stores!: Store[];
  public Promocategories!: Category[];
  public subscription: Subscription = new Subscription();
  public tokenParam: string | null | undefined = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.mobile = true;
      this.subscription.add(
        this.userService.user$().subscribe((user: User | null) => {
          if (user) {
            this.userId = user.id;
          } else {
            this.userId = null;
          }
        })
      );
    }
    this.authService.getTokenAndIdUserFromCookies();
    this.onScreen = true;
    this.activatedRoute.queryParamMap.subscribe((queryParam: ParamMap)=>{
      if(queryParam.get('confirmation')){
        MakeAlert("Votre compte est validé", "success", 2000).then(()=>{
          this.router.navigate(['/connexion'])
        })
      }
    })
    this.promo = this.activatedRoute.snapshot.data['products'];
    this.stores = this.activatedRoute.snapshot.data['stores'];
    this.Promocategories = this.activatedRoute.snapshot.data['categories'];
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onScreen = false;
  }
}
