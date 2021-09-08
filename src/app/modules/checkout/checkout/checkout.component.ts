import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  onScreen: boolean = false
  constructor() { }

  ngOnInit(): void {
    this.onScreen = true
  }
  ngOnDestroy(): void{
    this.onScreen = false
  }

}
