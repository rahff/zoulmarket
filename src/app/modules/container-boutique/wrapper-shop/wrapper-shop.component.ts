import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-shop',
  templateUrl: './wrapper-shop.component.html',
  styleUrls: ['./wrapper-shop.component.css']
})
export class WrapperShopComponent implements OnInit, OnDestroy {

  public onScreen: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.onScreen = false
  }

}
