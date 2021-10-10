import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  message: string = "Veuillez patienter ..."
  waiting: boolean = true
  onScreen: boolean = false;
  diameter: number = 400;
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 200
    }
    this.onScreen = true
  }
  ngOnDestroy(): void{
    this.onScreen = false
  }

}
