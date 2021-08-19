import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {
  @Input('imgs') public imgs!: any[];
  @Input('alt') public alt!:string;
  public URL_IMG = environment.URL_IMG
  constructor() { }

  ngOnChanges(changes: SimpleChanges):void{
    
  }
  ngOnInit(): void {
  }
  changeImg(imgs: any, index: number): void {
    console.log(imgs);
    [this.imgs[index] ,this.imgs[0]]  = [this.imgs[0], this.imgs[index]]
  }

}
