import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featurette',
  templateUrl: './featurette.component.html',
  styleUrls: ['./featurette.component.css']
})
export class FeaturetteComponent implements OnInit {

  public BASE_URL = environment.URL_IMG
  @Input('link') public link: any[] | null = null;
  @Input('store') public store: Store | null = null;
  @Input('order') public odd: boolean = false;
  public class: any
  constructor() { }

  ngOnInit(): void {
  }

}
