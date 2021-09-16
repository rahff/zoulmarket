import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../../models/sub-category.model';

@Component({
  selector: 'app-circle-container',
  templateUrl: './circle-container.component.html',
  styleUrls: ['./circle-container.component.css']
})
export class CircleContainerComponent implements OnInit {
  @Input('data') public data!: SubCategory;
  @Input('cardMenu') public cardMenu!: any;
  public URL_API_IMG = environment.URL_IMG;
  constructor() { }

  ngOnInit(): void {
  }

}
