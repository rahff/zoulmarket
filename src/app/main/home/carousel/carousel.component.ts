import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { CarouselData } from 'src/app/shared/models/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  public data$!: Observable<CarouselData[]>;
  public carousel$!: Observable<CarouselData>;
  public data: CarouselData[] = [];
  public currentIndex = 0;
  public URL_IMG = environment.URL_IMG;
  private nbrOfItemInCarousel!: number;
  private timer: Subscription = new Subscription()
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.initCarousel();
  }
  initCarousel() {
    this.data$ = this.storeService.getDataCarousel()
    this.carousel$ = this.chooseItemCarousel(this.data$, this.currentIndex)
    this.timer = timer(5000, 5000).subscribe(()=>{
      if(this.currentIndex === this.data.length - 1){
        this.currentIndex = 0;
        this.changeDataCarousel(this.currentIndex);
        return;
      }else if(this.currentIndex >= 0){
        this.currentIndex ++;
        this.changeDataCarousel(this.currentIndex);
        return;
      }
    })
  }
  chooseItemCarousel(data: Observable<CarouselData[]>,index: number): Observable<CarouselData> {
   return data.pipe(map((data)=>{
     this.data = data
     this.nbrOfItemInCarousel = data.length
      return data[index]
    }))

  }
  changeDataCarousel(index: number){
    this.carousel$ = of(this.data[index])
  }
  changeItemCarousel(event: MouseEvent, objEvent: { t: boolean }): void {
    event.stopPropagation();
    if (!objEvent.t) {
      if (this.currentIndex === 0) {
        return;
      } else {
        this.currentIndex--;
        this.changeDataCarousel(this.currentIndex);
      }
    } else if (objEvent.t) {
      if (this.currentIndex === this.nbrOfItemInCarousel -1) {    
        return;
      } else {
        this.currentIndex++;
        this.changeDataCarousel(this.currentIndex);
      }
    }
  }
  ngOnDestroy(): void {
    this.timer.unsubscribe()
  }
}
