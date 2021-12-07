import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public diameter = 500
  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 200;
    }
  }

}
