import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public stateMenu = 'close';
  public promo!: Product[];
  public userId: string | null = null;
  public stores!: Store[];
  public Promocategories!: Category[];
  public subscription: Subscription = new Subscription();
  public tokenParam: string | null | undefined = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.checkIsEmailConfirmation()
    this.promo = this.activatedRoute.snapshot.data['products'];
    this.stores = this.activatedRoute.snapshot.data['stores'];
  }
  checkIsEmailConfirmation(): void {
    const isConfirmation = this.activatedRoute.snapshot.queryParamMap.get('confirmation')
    if(isConfirmation){
      this.alertService.MakeAlert("Votre compte est validé", "success", 2000).then(()=>{
        this.router.navigate(['/connexion'])
      })
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
