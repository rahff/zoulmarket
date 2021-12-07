import { Component, OnInit } from '@angular/core';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit{
 
  public height: number = 300
  constructor(private plateformService: PlatformDetector) {}

  ngOnInit(): void {
    this.plateformService.getPlatform().subscribe((obj)=>{
      if(obj.mobile){
        this.height = 200;
      }
    })
  }
  
  
}
