import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  @Input('imgs') public imgs!: any[];
  @Input('alt') public alt: string = '';
  public URL_IMG = environment.URL_IMG;
  constructor() {}

  ngOnInit(): void {}
  changeImg(imgs: any, index: number): void {
    [this.imgs[index], this.imgs[0]] = [this.imgs[0], this.imgs[index]];
  }
}
