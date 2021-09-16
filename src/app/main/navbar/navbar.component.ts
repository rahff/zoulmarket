
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/shared/models/category.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public toggleOption: boolean = true;
  public categories: Category[] = [];
  public cartLength: number = 0;
  public username!:string | null;
  public userId!: string | null;
  private subscription: Subscription = new Subscription()
  @ViewChild('ulOption') public ulOption!: ElementRef<HTMLUListElement>;
  @ViewChild('onProfil') public onProfil!: ElementRef<HTMLUListElement>;
  @HostListener('window:click',['$event']) private toggleListCategory(ev: MouseEvent): void {
    ev.stopPropagation();
    if(!this.toggleOption){
      this.showListCategory(ev)
    }
    this.showOptions(ev)
  }
  constructor(private categoryService: CategoryService,
              private cartService: CartService,
              private userService: UserService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(this.userService.user$.subscribe((user: User | null)=>{
      if(user){
        this.userId = user.id
        this.username = user.firstname
      }
    }))
    this.subscription.add(this.categoryService.getCategories().subscribe((data: Category[])=>{
      if(data){
        this.categories = data;
      }else{
        throw new Error("no data");
      }
    }))
    this.subscription.add(this.cartService.cartLength$.subscribe((length: number)=>{
      this.cartLength = length
    }))
  }
  showListCategory(ev: Event): void {
    ev.stopPropagation();
    if(this.toggleOption){
      this.toggleOption = !this.toggleOption;
      this.ulOption.nativeElement.style.display = "flex"
    }else{
      this.toggleOption = !this.toggleOption;
      this.ulOption.nativeElement.style.display = "none"
    }
  }
  showOptions(event: MouseEvent): void {
    if(event.type === "mouseenter"){
      console.log('enter in li');
      
      this.onProfil.nativeElement.style.display = "flex";
    }else if(event.type === "click"){
      if(this.onProfil){
        this.onProfil.nativeElement.style.display = "none";
      }
    }
  }
  keepShowingElement(event: MouseEvent): void {
    if(event.type === "mouseenter"){
      console.log('enter in span');
      this.onProfil.nativeElement.style.display = "flex";
    }else if(event.type === "click"){
      this.onProfil.nativeElement.style.display = "none";
    }else if(event.type === "mouseleave"){
      console.log('leave in span');
      this.onProfil.nativeElement.style.display = "none";
    }
  }
  deconnection(): void {
    this.auth.logOut()
    this.username = null;
    this.auth.jwtToken = null;
    document.cookie = `authzm=;expires=${new Date(0)}`;
    this.router.navigateByUrl('/')
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
