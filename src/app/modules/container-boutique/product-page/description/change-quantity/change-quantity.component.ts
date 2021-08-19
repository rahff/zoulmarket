import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-change-quantity',
  templateUrl: './change-quantity.component.html',
  styleUrls: ['./change-quantity.component.css']
})
export class ChangeQuantityComponent implements OnInit {

  @Output() private EmmitQuantity: EventEmitter<number> = new EventEmitter<number>()
  @Input('quantity') public quantity!: number
  constructor() { }

  ngOnInit(): void {
  
    
  }
  decrement(): void {
    if(this.quantity > 1){
      this.quantity --;
      this.EmmitQuantity.emit(this.quantity);
    }else{
      return;
    }
  }
  increment(): void {
    if(this.quantity < 25){
       this.quantity ++;
       this.EmmitQuantity.emit(this.quantity);
    }else{
      return;
    }
  }
}
