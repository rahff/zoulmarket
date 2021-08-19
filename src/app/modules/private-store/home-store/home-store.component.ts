import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.css']
})
export class HomeStoreComponent implements OnInit {

  public idStore!: string | null;
  public productList!: Product[] | undefined;
  public store!: Store;
  public URL = environment.URL_IMG;
  @ViewChild('banner', {static:true}) public banner!: ElementRef<HTMLElement>
  constructor(private storeService: StoreService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.get('id')){
        this.idStore = paramMap.get('id');
        this.storeService.getStoreById(this.idStore).subscribe((data: Store)=>{
          if(data){
            this.store = data;
            this.productList = data.products;
            const bgImg = window.innerWidth > 600 ? this.URL+this.store.banner_desktop : this.URL+this.store.banner_mobile
            this.banner.nativeElement.style.background = `url(${bgImg}) no-repeat`;
            this.banner.nativeElement.style.backgroundPosition = "center";
            this.banner.nativeElement.style.backgroundSize = "100% 100%";
            console.log(this.store);
            
          }else{
            throw new Error("no data");
          }
        })
      }
    })
  }

}
