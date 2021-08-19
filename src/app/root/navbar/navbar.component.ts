import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public toggleOption: boolean = true;
  public categories: Category[] = [];
  private subscription: Subscription = new Subscription()
  @ViewChild('ulOption') public ulOption!: ElementRef<HTMLUListElement>;
  @HostListener('window:click',['$event']) private toggleListCategory(ev: Event): void {
    ev.stopPropagation();
    if(!this.toggleOption){
      this.showListCategory(ev)
    }
  }
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.subscription.add(this.categoryService.getCategories().subscribe((data: Category[])=>{
      if(data){
        this.categories = data;
      }else{
        throw new Error("no data");
      }
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
