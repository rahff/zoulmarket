import { NumberSymbol } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public toggleOption: boolean = true;
  public categories: Category[] = [];
  public cartLength: number = 0;
  private subscription: Subscription = new Subscription()
  @ViewChild('ulOption') public ulOption!: ElementRef<HTMLUListElement>;
  @HostListener('window:click',['$event']) private toggleListCategory(ev: Event): void {
    ev.stopPropagation();
    if(!this.toggleOption){
      this.showListCategory(ev)
    }
  }
  constructor(private categoryService: CategoryService,
              private cartService: CartService) { }

  ngOnInit(): void {
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
