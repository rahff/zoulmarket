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
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { UserService } from 'src/app/services/user.service';
import { MakeAlert } from 'src/app/shared/functions';
import { Category } from 'src/app/shared/models/category.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('ulMobile', [
      state('close', style('*')),
      state(
        'open',
        style({
          height: '170px',
        })
      ),
      transition('close <=> open', animate(500)),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public toggleOption: boolean = true;
  public onMobile: boolean = false;
  public categories: Category[] = [];
  public cartLength: number = 0;
  public username!: string | null;
  public userId!: string | null;
  public userConfirmed: boolean = false;
  public stateUlMobile: string = 'close';
  private subscription: Subscription = new Subscription();
  @ViewChild('ulOption') public ulOption!: ElementRef<HTMLUListElement>;
  @ViewChild('onProfil') public onProfil!: ElementRef<HTMLUListElement>;
  @HostListener('window:click', ['$event']) private toggleListCategory(
    ev: MouseEvent
  ): void {
    ev.stopPropagation();
    if (!this.toggleOption) {
      this.showListCategory(ev);
    }
    this.showOptions(ev);
  }
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private platformService: PlatformDetector
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.user$.subscribe((user: User | null) => {
        if (user) {
          this.userId = user.id;
          this.username = user.firstname;
          this.userConfirmed = user.confirmed
        }
      })
    );
    this.subscription.add(this.platformService.UserPlatform.subscribe((obj)=>{
      this.onMobile = obj.mobile
    }))
    this.subscription.add(
      this.categoryService.getCategories().subscribe((data: Category[]) => {
        if (data) {
          this.categories = data;
        } else {
          throw new Error('no data');
        }
      })
    );
    this.subscription.add(
      this.cartService.getCartLength().subscribe((length: number) => {
        this.cartLength = length;
      })
    );
  }
  openMenu(): void {
    if (this.stateUlMobile === 'close') {
      this.stateUlMobile = 'open';
    } else {
      this.stateUlMobile = 'close';
    }
  }
  showListCategory(ev: Event): void {
    ev.stopPropagation();
    if (this.toggleOption) {
      this.toggleOption = !this.toggleOption;
      this.ulOption.nativeElement.style.display = 'flex';
    } else {
      this.toggleOption = !this.toggleOption;
      this.ulOption.nativeElement.style.display = 'none';
    }
  }
  showOptions(event: MouseEvent): void {
    if (event.type === 'mouseenter') {
      this.onProfil.nativeElement.style.display = 'flex';
    } else if (event.type === 'click') {
      if (this.onProfil) {
        this.onProfil.nativeElement.style.display = 'none';
      }
    }
  }
  keepShowingElement(event: MouseEvent): void {
    if (event.type === 'mouseenter') {
      console.log('enter in span');
      this.onProfil.nativeElement.style.display = 'flex';
    } else if (event.type === 'click') {
      this.onProfil.nativeElement.style.display = 'none';
    } else if (event.type === 'mouseleave') {
      console.log('leave in span');
      this.onProfil.nativeElement.style.display = 'none';
    }
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
    document.cookie = `authzm=;expires=${new Date(0)}`;
    this.router.navigateByUrl('/');
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
