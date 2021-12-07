import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { UserService } from 'src/app/services/user.service';
import { MakeAlert } from 'src/app/shared/functions';
import { Category } from 'src/app/shared/models/category.model';
import { User } from 'src/app/shared/models/user.model';
import { MenuAsideService } from '../home/menu-aside.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('collapse') public collapse!: ElementRef<HTMLDivElement>
  public categories!: Observable<Category[]>;
  public cartLength: number = 0;
  public username: string | null = null;
  public userId: string | null = null;
  public userConfirmed: boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private platformService: PlatformDetector,
    private menuService: MenuAsideService
  ) {}

  ngOnInit(): void {
    this.categories =  this.categoryService.getCategories().pipe()
    this.subscription.add(
      this.userService.user$().subscribe((user: User | null) => {
        if (user) {
          this.userId = user.id;
          this.username = user.firstname;
          this.userConfirmed = user.confirmed
        }else{
          this.userId = null;
          this.username = null;
          this.userConfirmed = false;
        }
      })
    );
    this.subscription.add(
      this.cartService.getCartLength().subscribe((length: number) => {
        this.cartLength = length;
      })
    );
  }
  navigateOnProfil(): void {
    if(this.userConfirmed){
      this.router.navigate(['/profil', this.userId])
    }else{
      MakeAlert("Vous devez confirmer votre compte", "error")
    }
  }
  deconnection(): void {
    this.auth.logOut();
    this.username = null;
    this.auth.jwtToken = null;
    this.router.navigateByUrl('/');
  
  }
  closeMenu(): void{
    if(this.collapse){
      this.collapse.nativeElement.classList.remove('show');
    }
  }
  connectionAlert(): void {
    MakeAlert("Veuillez vous connecter pour acceder a votre panier", "info", 3000).then(()=>{
      this.router.navigate(['/connection'])
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
