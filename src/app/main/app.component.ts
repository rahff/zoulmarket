import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { PlatformDetector } from '../services/platform-detection.service';
import { Category } from '../shared/models/category.model';
import { MenuAsideService } from './home/menu-aside.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('menu', [
      state('close', style('*')),
      state(
        'open',
        style({
          transform: 'translateX(0px)',
        })
      ),
      transition('close <=> open', animate(250)),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'zoulMarket';
  public mobile: boolean = false;
  public categories: Category[] = []
  onScreen: boolean = false;
  public stateMenu = 'close';
  public subscription: Subscription = new Subscription()
  @HostListener('window:click', ['$event']) private closeMenu(ev: MouseEvent) {
    ev.stopImmediatePropagation();
    this.menuAside.toggleMenuNavBar(ev)
    this.menuAside.toggleOptionListMenu(ev, "window")
    if (this.stateMenu === 'open') {
      this.stateMenu = 'close';
    } else {
      return;
    }
  }
  constructor(private menuAside: MenuAsideService,
              private categoryService: CategoryService,
              private mobileDetect: PlatformDetector){}


  ngOnInit(): void {
    this.mobileDetect.getOS()
    this.subscription.add(this.mobileDetect.getPlatform().subscribe((obj)=>{
      this.mobile = obj.mobile;
    }))
    if(this.mobile){
      this.subscription.add(
        this.categoryService.getCategories().subscribe((data: Category[]) => {
          if (data) {
            this.categories = data;
          } else {
            throw new Error('no data');
          }
        })
      );
    }
    this.onScreen = true;
    this.menuAside.observeMenuState().subscribe((event: Event)=>{
      if(event){
        this.toggleMenu(event)
      }
    })
  }
  toggleMenu(ev: Event): void {
    ev.stopPropagation();
    if (this.stateMenu === 'close') {
      this.stateMenu = 'open';
    } else {
      this.stateMenu = 'close';
    }
  }
  ngOnDestroy(): void {
    this.onScreen = false;
  }
}
