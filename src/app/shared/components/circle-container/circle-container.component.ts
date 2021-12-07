import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product';


@Component({
  selector: 'app-circle-container',
  templateUrl: './circle-container.component.html',
  styleUrls: ['./circle-container.component.css']
})
export class CircleContainerComponent implements OnInit {
  @Input('product') public product: Product | null = null;
  @Input('link') public link: any[] | null = null;
  public URL_API_IMG = environment.URL_IMG;
  constructor() { }

  ngOnInit(): void {
  }

}
